import { spawn, spawnSync } from "node:child_process";
import net from "node:net";
import path from "node:path";

/** Absolute path to a locally-installed CLI (avoids a shell wrapper so child
 *  processes can be killed directly with no lingering grandchild). */
function bin(name) {
  return path.join(process.cwd(), "node_modules", ".bin", name);
}

/**
 * Production / preview build orchestrator.
 *
 * Since the pages now import Tina's generated client (tina/__generated__), that
 * client MUST exist before `next build` compiles, and a GraphQL endpoint must be
 * reachable while `next build` runs static generation. There are two ways to
 * satisfy that:
 *
 *   1. CLOUD (production + Tina Cloud creds): `tinacms build` generates a client
 *      pointed at Tina Cloud and builds the /admin editor. `next build` then
 *      fetches page data from Tina Cloud. This is the only path that ships the
 *      live editor.
 *
 *   2. LOCAL (previews, the no-creds case, and the production fallback when the
 *      cloud build fails): we run a local Tina datalayer over the filesystem,
 *      which generates the client and serves content on localhost while
 *      `next build` runs, then we tear it down. No /admin editor, but the public
 *      site builds and ships from the committed content files.
 *
 * On a cloud failure we print an accurate, actionable diagnosis (an earlier
 * version always blamed "branch not indexed", which was usually wrong) and, by
 * default, fall back to a local build so the site still deploys. Set
 * TINA_BUILD_REQUIRED=true to instead fail the deploy when the editor can't be
 * built.
 */

const hasTina =
  Boolean(process.env.TINA_TOKEN) &&
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID);

// Vercel sets VERCEL_ENV to "production" only for the production branch deploy.
const isProduction = process.env.VERCEL_ENV === "production";

// Treat a failed /admin build as fatal (fail the deploy) when explicitly asked.
const tinaRequired = process.env.TINA_BUILD_REQUIRED === "true";

const DATALAYER_PORT = 4001;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Run a command to completion, streaming output. Returns true on success. */
function runSync(command) {
  console.log(`\n▶ ${command}\n`);
  const result = spawnSync(command, { stdio: "inherit", shell: true });
  return result.status === 0;
}

/** Run a command, capturing output so we can both echo AND inspect it. */
function runCaptured(command) {
  console.log(`\n▶ ${command}\n`);
  const result = spawnSync(command, { shell: true, encoding: "utf8" });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  process.stdout.write(output);
  return { ok: result.status === 0, output };
}

/** Resolve true once a TCP port accepts connections, or false on timeout. */
async function waitForPort(port, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const open = await new Promise((resolve) => {
      const socket = net.connect({ port, host: "127.0.0.1" });
      socket.on("connect", () => {
        socket.destroy();
        resolve(true);
      });
      socket.on("error", () => resolve(false));
    });
    if (open) return true;
    await delay(1000);
  }
  return false;
}

/** Map a Tina build failure to a precise, actionable explanation. */
function diagnoseTinaFailure(output) {
  const text = output.toLowerCase();

  if (text.includes("project not found")) {
    return [
      "Tina Cloud returned 404 PROJECT NOT FOUND.",
      "",
      "This is NOT a branch-indexing problem. The NEXT_PUBLIC_TINA_CLIENT_ID",
      "set on this deploy does not resolve to a live Tina Cloud project.",
      "",
      "Fix (Vercel + https://app.tina.io):",
      "  1. Open your project on app.tina.io → Overview, copy the Client ID.",
      "  2. In Vercel → Settings → Environment Variables (Production scope),",
      "     set NEXT_PUBLIC_TINA_CLIENT_ID to EXACTLY that value — no quotes,",
      "     no spaces, no trailing newline.",
      "  3. Generate a token in the SAME project and set TINA_TOKEN to it.",
      "  4. Redeploy.",
    ];
  }

  // Match on specific phrases only. Don't key off the bare word "branch" (it
  // appears in Tina's credential table as "branch: main") or "index" (it appears
  // in the stack trace as "index.js") — both cause false positives.
  if (
    text.includes("not on tinacloud") ||
    text.includes("branch is not") ||
    text.includes("not indexed") ||
    text.includes("refresh branches")
  ) {
    return [
      "Tina Cloud doesn't have this branch indexed yet.",
      "",
      "Fix: in app.tina.io → Configuration → Refresh Branches, wait for the",
      "production branch to finish indexing, then redeploy.",
    ];
  }

  if (
    text.includes("unauthorized") ||
    text.includes("status code 401") ||
    text.includes("status code 403") ||
    text.includes("invalid token")
  ) {
    return [
      "Tina Cloud rejected the credentials (auth error).",
      "",
      "Fix: regenerate TINA_TOKEN from the same Tina Cloud project as your",
      "Client ID and update it in Vercel (Production scope), then redeploy.",
    ];
  }

  if (
    text.includes("not valid json") ||
    text.includes("fetch failed") ||
    text.includes("econnrefused") ||
    text.includes("enotfound") ||
    text.includes("etimedout")
  ) {
    return [
      "Couldn't reach Tina Cloud (network/transport error, not a config issue).",
      "",
      "Usually transient — redeploy. If it persists, check Tina Cloud status",
      "and that the build environment can reach content.tinajs.io.",
    ];
  }

  return [
    "tinacms build failed for an unrecognized reason — read the Tina output",
    "above for details, or see https://tina.io/docs/r/FAQ/.",
  ];
}

/** Print a hard-to-miss banner. */
function banner(emoji, lines) {
  const bar = "─".repeat(76);
  console.log(`\n${emoji} ${bar}`);
  for (const line of lines) console.log(`   ${line}`);
  console.log(`${bar}\n`);
}

/**
 * Build the public site backed by a LOCAL Tina datalayer: it generates the
 * client and serves filesystem content on localhost while `next build` runs,
 * then we tear it down. Exits the process with next build's status.
 */
async function buildWithLocalTina() {
  console.log(
    "\n▶ starting local Tina datalayer (tinacms dev --noWatch) for the build\n",
  );
  // Spawn the binary directly (no shell) so dev.kill() ends this exact process.
  const dev = spawn(bin("tinacms"), ["dev", "--noWatch", "--noTelemetry"]);
  dev.stdout?.on("data", (d) => process.stdout.write(d));
  dev.stderr?.on("data", (d) => process.stdout.write(d));

  // Best-effort teardown. We always finish with process.exit(), which terminates
  // this build command regardless of the datalayer, so a surviving child can
  // never hang the deploy (the build container is torn down afterward anyway).
  const killDatalayer = () => {
    try {
      dev.kill("SIGTERM");
    } catch {
      /* already gone */
    }
  };

  const ready = await waitForPort(DATALAYER_PORT, 180_000);
  if (!ready) {
    killDatalayer();
    banner("❌", [
      `Local Tina datalayer never came up on port ${DATALAYER_PORT}.`,
      "Cannot generate the Tina client → cannot build. See output above.",
    ]);
    process.exit(1);
  }

  console.log(`\n✅ datalayer up on :${DATALAYER_PORT} → running next build\n`);
  const built = spawnSync(bin("next"), ["build"], { stdio: "inherit" });

  killDatalayer();
  // Force exit so a lingering datalayer handle can never hang the deploy.
  process.exit(built.status ?? 1);
}

async function main() {
  if (hasTina && isProduction) {
    console.log("Production + Tina Cloud env → building the editor at /admin");
    const { ok, output } = runCaptured("tinacms build");

    if (ok) {
      console.log("\n✅ Tina editor built → /admin will be available.\n");
      process.exit(runSync("next build") ? 0 : 1);
    }

    const diagnosis = diagnoseTinaFailure(output);

    if (tinaRequired) {
      banner("❌", [
        "TINA EDITOR BUILD FAILED and TINA_BUILD_REQUIRED=true → failing deploy.",
        "",
        ...diagnosis,
      ]);
      process.exit(1);
    }

    banner("⚠️", [
      "TINA EDITOR NOT DEPLOYED — shipping a site-only build (no /admin).",
      "",
      ...diagnosis,
      "",
      "Building the public site from committed content so it still ships.",
    ]);
    await buildWithLocalTina();
    return;
  }

  if (hasTina) {
    console.log(
      "Tina env present but not a production deploy → preview build " +
        "(site only; Tina Cloud tracks production, /admin builds there).",
    );
  } else {
    console.log(
      "No Tina Cloud env (NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN) → " +
        "site-only build; /admin skipped.",
    );
  }
  await buildWithLocalTina();
}

main();
