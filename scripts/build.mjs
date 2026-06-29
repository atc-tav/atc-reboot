import { spawnSync } from "node:child_process";

/**
 * Conditional production build.
 *
 * The public site always builds with `next build`. The TinaCMS editor at
 * /admin is only built when Tina Cloud credentials are present in the
 * environment — so the deploy stays green before Tina is set up, and the editor
 * "turns on" automatically the moment you add the env vars in Vercel. No
 * build-command change required.
 */

const hasTina =
  Boolean(process.env.TINA_TOKEN) &&
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID);

function run(command) {
  console.log(`\n▶ ${command}\n`);
  const result = spawnSync(command, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (hasTina) {
  console.log("Tina Cloud env detected → building the editor at /admin");
  run("tinacms build");
} else {
  console.log(
    "No Tina Cloud env (NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN) → site-only build; /admin skipped",
  );
}

run("next build");
