import type { Feature } from "./types";

/** Services page content. */
export const servicesContent = {
  hero: {
    eyebrow: "Services",
    title: "Pick a starting point, or let's find one together.",
    subtitle:
      "Engagements range from a one-off audit to ongoing, hands-on support. Most clients start small and expand once the data starts paying off.",
  },

  offerings: {
    eyebrow: "What I offer",
    title: "Ways we can work together",
  },

  services: [
    {
      icon: "IconChartBar",
      title: "Reporting & dashboards",
      description:
        "The work I'm known for: dashboards that link your website stats to the OKRs that move the needle. You stop staring at vanity metrics and start seeing what drives revenue.",
    },
    {
      icon: "IconChartDots",
      title: "Analytics & tracking",
      description:
        "Trustworthy numbers to build on — clean GA4, reliable server-side tracking, and a data layer you can actually make decisions from.",
    },
    {
      icon: "IconTargetArrow",
      title: "Conversion optimisation",
      description:
        "Structured testing on the pages and steps that decide whether visitors buy. Fix the biggest leaks first, prove the lift.",
    },
    {
      icon: "IconRocket",
      title: "Growth & acquisition",
      description:
        "A practical plan across acquisition, retention, and average order value — prioritised by impact and sized to your team.",
    },
    {
      icon: "IconSearch",
      title: "Store & funnel audit",
      description:
        "A focused review of your analytics, funnel, and merchandising, ending in a ranked list of what to fix and why. A common first step.",
    },
    {
      icon: "IconUsers",
      title: "Fractional support",
      description:
        "An experienced, senior ecommerce hand on call for your team — direct access to me, without a full-time hire.",
    },
  ] satisfies Feature[],

  cta: {
    title: "Not sure which you need?",
    description:
      "That's normal. Tell me a bit about your store and I'll point you at the highest-impact next step — even if it's not me.",
  },
};
