import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { Callout } from "./Callout";
import { Steps, Step } from "./Steps";
import { Stat, StatGrid } from "./Stat";
import { Figure } from "./Figure";
import { KeyTakeaways } from "./KeyTakeaways";

/**
 * Components made available to every article via MDXRemote.
 *
 * We intentionally do NOT remap base Markdown elements (p, h2, ul, blockquote,
 * table…). Those are styled automatically by Mantine's TypographyStylesProvider,
 * which wraps the rendered article in `ArticlePage`. That keeps prose styling in
 * one place and avoids fragile element-by-element overrides.
 *
 * This registry is just the custom, visually-rich components an author can drop
 * into the Markdown to keep how-to / knowledge pieces interesting.
 */
export const mdxComponents: MDXRemoteProps["components"] = {
  Callout,
  Steps,
  Step,
  Stat,
  StatGrid,
  Figure,
  KeyTakeaways,
};
