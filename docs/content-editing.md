# Editing content

This site is **git-based**: every article and page lives as a file in this
repo. [TinaCMS](https://tina.io) is layered on top purely as a friendly editing
UI — it reads and writes those same files. The public site renders straight from
the files (`lib/content.ts`), so Tina is never a dependency for the site to work,
and **the content always stays in git**. No third-party database owns your words.

## Two ways to edit

1. **Directly in the repo** — edit the `.mdx` files in `content/articles/` and
   commit. Nothing about this changed.
2. **In the Tina editor** — a web UI for non-technical editors. Same files, no
   git knowledge required.

## Local editing

```bash
pnpm tina
```

This runs the site with Tina's local content server. Open
<http://localhost:3000/admin> to edit; changes are written to the files on disk.
No account or credentials needed.

## Turning on the editor for the live site (one-time, owner)

So the content consultant can log in at `https://<your-site>/admin`:

1. Create a free project at <https://app.tina.io> and connect this GitHub repo.
2. Add the **Client ID** and a **read/write Token** as environment variables in
   Vercel (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
3. Redeploy.

That's all — **no build-command change needed.** The build (`scripts/build.mjs`)
detects those env vars and automatically builds the `/admin` editor; without
them it builds the site only. The deploy branch is auto-detected, so you don't
need to set `NEXT_PUBLIC_TINA_BRANCH`.

When an editor saves in `/admin`, Tina commits the change to git on your branch,
which triggers a normal redeploy. Content in, content out — all through your
repository.

## What editors can insert

The article body is rich text. Beyond headings, lists, bold/italic and links,
editors can drop in the same visual blocks the articles already use:

- **Callout** (note / tip / warning / quote)
- **Steps** (numbered) with individual **Step**s
- **Key takeaways** with **Takeaway** items
- **Stat grid** with **Stat** cards
- **Figure** (image with caption)

Each maps 1:1 to a React component in `components/mdx/`, so what the editor
inserts is exactly what renders.

## Scope & next steps

- ✅ **Articles** are editable in Tina today.
- ⏭️ **Marketing page copy** (home / services / about) currently lives in
  `content/pages/*.ts`. To make it editable in Tina too, those become JSON
  collections that the page components import — a planned follow-up.
- ⏭️ When Tina Cloud is connected, open each existing article once in `/admin`
  to confirm the rich blocks round-trip cleanly, and add live visual editing if
  desired.
