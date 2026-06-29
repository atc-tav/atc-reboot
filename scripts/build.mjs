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
 */

const hasTina =
  Boolean(process.env.TINA_TOKEN) &&
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID);

// Vercel sets VERCEL_ENV to "production" only for the production branch deploy.
const isProduction = process.env.VERCEL_ENV === "production";

function run(command) {
  console.log(`\n▶ ${command}\n`);
  const result = spawnSync(command, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (hasTina && isProduction) {
  console.log("Production + Tina Cloud env → building the editor at /admin");
  run("tinacms build");
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
