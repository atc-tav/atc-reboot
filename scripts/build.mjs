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

function run(command, { fatal = true } = {}) {
  console.log(`\n▶ ${command}\n`);
  const result = spawnSync(command, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    if (fatal) process.exit(result.status ?? 1);
    return false;
  }
  return true;
}

if (hasTina && isProduction) {
  console.log("Production + Tina Cloud env → building the editor at /admin");
  // Best-effort: a Tina Cloud hiccup (e.g. the branch isn't indexed yet) must
  // never block the site from deploying. If it fails, we warn loudly and ship
  // the site without /admin; the editor appears on the next deploy once Tina
  // is happy.
  const built = run("tinacms build", { fatal: false });
  if (!built) {
    console.warn(
      "\n⚠️  tinacms build failed — shipping a site-only build. " +
        "Common cause: Tina Cloud hasn't finished indexing this branch yet. " +
        "Once it has, redeploy and /admin will be included.\n",
    );
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
