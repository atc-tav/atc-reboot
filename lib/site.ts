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
  /** Business / brand name used in metadata and the footer. */
  name: "Add to Cart",
  /** Wordmark shown in the header (the domain reads as the brand). */
  wordmark: "addtocart.ca",
  /** Short tagline used in metadata and some hero fallbacks. */
  tagline: "If you sell stuff online, I help you sell more of it.",
  /** One-sentence description for SEO / social cards. */
  description:
    "Independent ecommerce consultant for scaling DTC brands. I connect your store's data to the goals that move revenue — reporting and dashboards, conversion, and growth, done with senior, hands-on rigor.",
  /** Canonical production URL. Update when the Vercel domain is set. */
  url: "https://addtocart.ca",

  /** The person behind the business (used on the About page + metadata). */
  author: {
    name: "Tav McGregor",
    role: "Principal Analytics Consultant",
    /** Drop a square photo at public/tav-mcgregor.jpg; shown as a circle. */
    headshot: "/tav-mcgregor.jpg",
  },

  /**
   * The primary call-to-action used everywhere on the site.
   * Replace `href` with a real LinkedIn URL (or later, a /contact form route).
   */
  contact: {
    label: "Get in touch",
    // Visitors land on the profile, where LinkedIn's native Connect / Message
    // buttons live. (LinkedIn has no reliable public deep-link that forces a
    // "message" or "connect" action for someone who isn't already a connection.)
    href: "https://www.linkedin.com/in/tavmcgregor/",
    external: true,
  } satisfies ContactAction,

  /** Header navigation. */
  nav: [
    { label: "Services", href: "/services" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
  ] satisfies NavLink[],

  /** Typography. */
  fonts: {
    /**
     * Adobe Fonts (Typekit) kit CSS URL, e.g. "https://use.typekit.net/abc1def.css".
     * Leave empty until the web project exists — the <link> only renders when set.
     * The actual family names live in the font-role variables in app/globals.css.
     */
    adobeKitUrl: "https://use.typekit.net/cir3rlg.css",
  },

  /** Footer / social links. */
  social: {
    linkedin: "https://www.linkedin.com/in/tavmcgregor/",
    email: "tav@addtocart.ca",
  },
} as const;

export type SiteConfig = typeof siteConfig;
