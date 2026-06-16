import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Tiny file-based content layer.
 *
 * Articles live as `.mdx` files in `/content/articles`. Frontmatter at the top
 * of each file (title, description, date, etc.) is parsed here; the body is
 * handed to MDXRemote for rendering with our custom Mantine components.
 *
 * No database, no CMS — just files you edit in your editor and commit.
 */

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleFrontmatter = {
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-06-16". */
  date: string;
  /** Short label shown on cards, e.g. "Conversion", "Analytics". */
  category?: string;
  /** Rough read time in minutes; optional, shown on cards. */
  readingMinutes?: number;
  /** Set true to hide from listings without deleting the file. */
  draft?: boolean;
};

export type Article = {
  slug: string;
  frontmatter: ArticleFrontmatter;
  /** Raw MDX body (frontmatter stripped). */
  content: string;
};

export type ArticleMeta = {
  slug: string;
  frontmatter: ArticleFrontmatter;
};

function ensureDir(): boolean {
  return fs.existsSync(ARTICLES_DIR);
}

/** All article slugs (filenames without `.mdx`). */
export function getArticleSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Load a single article by slug, or null if it doesn't exist. */
export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}

/**
 * All published articles, newest first. Drafts are excluded in production but
 * kept visible during local development so you can preview work in progress.
 */
export function getAllArticles(): ArticleMeta[] {
  const isProd = process.env.NODE_ENV === "production";

  return getArticleSlugs()
    .map((slug) => {
      const article = getArticleBySlug(slug);
      return article
        ? { slug, frontmatter: article.frontmatter }
        : null;
    })
    .filter((a): a is ArticleMeta => a !== null)
    .filter((a) => !(isProd && a.frontmatter.draft))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

/** Human-friendly date, e.g. "16 June 2026". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
