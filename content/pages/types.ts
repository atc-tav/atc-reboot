/**
 * Content contract types.
 *
 * These shapes are the boundary between *content* (the data below) and
 * *presentation* (the React components). Today the content is authored as typed
 * TS objects in this folder. Later it could come from a CMS (Sanity, etc.), a
 * database, or stay exactly as-is — the components only care about these shapes,
 * not where the data originates. No CMS lock-in.
 */

export type LinkAction = { label: string; href: string };

export type Feature = {
  /** Tabler icon name, e.g. "IconChartBar". */
  icon?: string;
  title: string;
  description: string;
};

export type Impact = {
  value: string;
  label: string;
  source: string;
};

export type Client = {
  name: string;
  /** Optional path to a real logo SVG in /public/logos/. */
  logo?: string;
};

export type AboutBlock = {
  title: string;
  body: string;
};
