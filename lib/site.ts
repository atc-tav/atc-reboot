/**
 * Central site configuration.
 *
 * This is the single source of truth for business identity, navigation, and —
 * importantly — the primary "get in touch" action. Today that's a LinkedIn
 * link; swapping it for a contact form or scheduling embed later is a change
 * in this one file, not across every CTA on the site.
 */

export type ContactAction = {
  /** Visible label on buttons, e.g. "Get in touch". */
  label: string;
  /** Where the CTA points. For now, a LinkedIn profile/messaging URL. */
  href: string;
  /** Whether to open in a new tab (true for external links like LinkedIn). */
  external: boolean;
};

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  /** Business / brand name shown in the header, footer, and metadata. */
  name: "Add to Cart",
  /** Short tagline used in metadata and some hero fallbacks. */
  tagline: "Ecommerce consulting that moves the numbers that matter.",
  /** One-sentence description for SEO / social cards. */
  description:
    "Independent ecommerce consulting. Strategy, optimisation, and hands-on help for online stores that want to grow.",
  /** Canonical production URL. Update when the Vercel domain is set. */
  url: "https://addtocart.ca",

  /**
   * The primary call-to-action used everywhere on the site.
   * Replace `href` with a real LinkedIn URL (or later, a /contact form route).
   */
  contact: {
    label: "Get in touch",
    href: "https://www.linkedin.com/in/your-profile",
    external: true,
  } satisfies ContactAction,

  /** Header navigation. */
  nav: [
    { label: "Services", href: "/services" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
  ] satisfies NavLink[],

  /** Footer / social links. */
  social: {
    linkedin: "https://www.linkedin.com/in/your-profile",
    email: "tav@addtocart.ca",
  },
} as const;

export type SiteConfig = typeof siteConfig;
