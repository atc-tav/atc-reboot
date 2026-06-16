# Add to Cart — site reboot

A lead-generation website for ecommerce consulting. Built to be edited quickly,
content-first, and to drop into a larger monorepo later.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Mantine v8** for components and theming
- **MDX** for articles (`gray-matter` + `next-mdx-remote`)
- Deployed on **Vercel** (zero config — it's a standard Next.js app)

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
pnpm typecheck  # tsc --noEmit
```

## Where things live

```
app/                      Routes (App Router)
  page.tsx                Home
  services/ about/        Supporting pages
  articles/               Article index + [slug] renderer
lib/
  site.ts                 ⭐ Single source of truth: brand, nav, contact CTA
  theme.ts                Mantine theme (brand color, fonts, radius)
  content.ts              Reads MDX files + frontmatter
components/
  cta/                    ContactButton, CtaSection (the "get in touch" CTAs)
  layout/                 Header, Footer
  sections/               Hero, SectionHeading, FeatureGrid
  mdx/                    Visual components for articles (see below)
  articles/               ArticleCard
content/
  articles/*.mdx          Your articles. Add a file = add an article.
```

## Changing the important stuff

- **The "get in touch" destination** lives in `lib/site.ts` under `contact`.
  It's a LinkedIn URL today; point it at a `/contact` form or scheduling embed
  later and every CTA on the site follows — no other files change.
- **Brand name, tagline, nav, social links**: also `lib/site.ts`.
- **Brand color / fonts / corner radius**: `lib/theme.ts`.

## Writing an article

Create `content/articles/my-article.mdx`:

```mdx
---
title: "Your title"
description: "One-line summary shown on cards and in search."
date: "2026-06-16"
category: "Conversion"
readingMinutes: 5
draft: false          # true = hidden in production, visible in dev
---

Write in Markdown. To keep it visually interesting, drop in components:

<KeyTakeaways>
  <Takeaway>First point</Takeaway>
  <Takeaway>Second point</Takeaway>
</KeyTakeaways>

<StatGrid>
  <Stat value="3.1x" label="Return on ad spend" />
  <Stat value="−42%" label="Cart abandonment" />
</StatGrid>

<Callout type="tip" title="Quick win">
  Pull a key insight out of the body text.
</Callout>

<Steps>
  <Step title="Do this first">Explanation.</Step>
  <Step title="Then this">Explanation.</Step>
</Steps>

<Figure src="/articles/chart.png" alt="A chart" caption="What it shows." />
```

Plain Markdown (headings, lists, tables, blockquotes, links) is styled
automatically via Mantine's `TypographyStylesProvider`. The custom components
above are registered in `components/mdx/MdxComponents.tsx`.

> **Mantine + RSC gotcha:** compound sub-components (`List.Item`, `Table.Thead`)
> are `undefined` inside Server Components. Import them flat
> (`import { ListItem } from "@mantine/core"`) or mark the file `"use client"`.

## Deploy

Push to GitHub and import the repo in Vercel. No special configuration needed.
Set the production domain in `lib/site.ts` (`url`) for correct metadata.
