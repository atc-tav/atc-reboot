import { spawnSync } from "node:child_process";

/**
 * Conditional production build.
 *
 * The public site always builds with `next build`. The TinaCMS editor at
 * /admin is built only on the PRODUCTION deploy (the branch Tina Cloud tracks,
 * i.e. main) when Tina Cloud credentials are present. Preview deploys of feature
 * branches build the site only — Tina Cloud doesn't track ad-hoc branches, so
 * attempting `tinacms build` there would fail. This keeps every preview green
 * while the editor turns on automatically in production.
 *
 * When the Tina editor build fails it is, by default, NON-FATAL: the public
 * site still ships, just without /admin. But — crucially — we read Tina's actual
 * error and print an accurate, actionable diagnosis. (An earlier version assumed
 * every failure was "branch not indexed", which sent debugging down the wrong
 * path for the far more common "project not found" / bad-credentials case.)
 *
 * Set TINA_BUILD_REQUIRED=true to make a failed editor build fail the whole
 * deploy instead — useful once Tina is stable and a missing /admin should be
 * treated as a broken release rather than a silent degradation.
 */

const hasTina =
  Boolean(process.env.TINA_TOKEN) &&
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID);

// Vercel sets VERCEL_ENV to "production" only for the production branch deploy.
const isProduction = process.env.VERCEL_ENV === "production";

// Treat a failed /admin build as fatal (fail the deploy) when explicitly asked.
const tinaRequired = process.env.TINA_BUILD_REQUIRED === "true";

/** Run a command, streaming output. Exits the process on failure when fatal. */
function run(command, { fatal = true } = {}) {
  console.log(`\n▶ ${command}\n`);
  const result = spawnSync(command, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    if (fatal) process.exit(result.status ?? 1);
    return false;
  }
  return true;
}

/**
 * Run a command, but capture its output so we can both echo it AND inspect it
 * for known failure signatures. Returns { ok, output }.
 */
function runCaptured(command) {
  console.log(`\n▶ ${command}\n`);
  const result = spawnSync(command, { shell: true, encoding: "utf8" });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  process.stdout.write(output);
  return { ok: result.status === 0, output };
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

  // Note: match on specific phrases only. Don't key off the bare word "branch"
  // (it appears in Tina's credential table as "branch: main") or "index" (it
  // appears in the stack trace as "index.js") — both cause false positives.
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
  const width = 76;
  const bar = "─".repeat(width);
  console.log(`\n${emoji} ${bar}`);
  for (const line of lines) console.log(`   ${line}`);
  console.log(`${bar}\n`);
}

if (hasTina && isProduction) {
  console.log("Production + Tina Cloud env → building the editor at /admin");
  const { ok, output } = runCaptured("tinacms build");

  if (!ok) {
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
    ]);
  } else {
    console.log("\n✅ Tina editor built → /admin will be available.\n");
  }
} else if (hasTina) {
  console.log(
    "Tina env present but this isn't a production deploy → site-only build " +
      "(Tina Cloud tracks the production branch; /admin builds in production).",
  );
} else {
  console.log(
    "No Tina Cloud env (NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN) → site-only build; /admin skipped",
  );
}

run("next build");
