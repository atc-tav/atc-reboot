import type { Feature, Impact, Client, LinkAction } from "./types";

/**
 * Home page content. Pure data — the home page component composes these strings
 * into sections. Edit copy here without touching layout.
 */
export const homeContent = {
  hero: {
    eyebrow: "eCommerce analytics consulting",
    // The headline is split so one word can be highlighted in brand blue.
    titleLead: "If you sell stuff online, I help you sell",
    titleAccent: "more",
    titleTrail: "of it.",
    handwrittenNote: "(aka: eCommerce analytics)",
    subtitle:
      "I'm an independent consultant who connects your store's data to the goals that actually move revenue — then helps you act on it. No fluff, no jargon, no junior team.",
    secondaryAction: { label: "See what I do", href: "/services" } satisfies LinkAction,
  },

  bigIdea: {
    eyebrow: "The big idea",
    title: "Analytics turns raw data into revenue.",
    subtitle:
      "Every store is buried in data — sessions, carts, campaigns, a dozen dashboards no one reads. The value was never in collecting it. It's in turning it into the few decisions that actually grow the business.",
    flowSteps: ["Data", "Information", "Insight"],
    handwritten: "the last step is where the money is",
  },

  whyItMatters: {
    eyebrow: "Why it matters",
    title: "You're not short on data. You're short on answers.",
    description:
      "Most stores have GA4, a pile of dashboards, and more reports than anyone reads — and still make the big calls on gut feel. That gap between data and decisions is expensive.",
    impacts: [
      {
        value: "~70%",
        label: "of online shopping carts are abandoned before purchase.",
        source: "Baymard Institute",
      },
      {
        value: "+35%",
        label: "average conversion lift available from better checkout UX alone.",
        source: "Baymard Institute",
      },
      {
        value: "5–6%",
        label: "higher productivity at firms that genuinely run on their data.",
        source: "MIT · Brynjolfsson et al.",
      },
      {
        value: "25%+",
        label: "more profit from just a 5% increase in customer retention.",
        source: "Reichheld · HBR",
      },
    ] satisfies Impact[],
  },

  pullQuote: {
    label: "Where I come in",
    quoteLead:
      "Every one of those numbers is a decision waiting to be made. I turn your data into",
    quoteAccent: "the short list that matters",
    quoteTrail:
      "— what to fix first, what to test next, what to watch — and I stay until it's working.",
    handwritten: "not more dashboards — better decisions",
  },

  howIHelp: {
    eyebrow: "How I help",
    title: "From numbers to next steps",
    description:
      "Most stores are drowning in dashboards but short on decisions. I turn your data into a clear, prioritised plan — and help you execute it.",
    features: [
      {
        icon: "IconChartBar",
        title: "Reporting tied to your goals",
        description:
          "Dashboards that link your website stats to the OKRs that actually move revenue — so you always know what's working and what to do next.",
      },
      {
        icon: "IconTargetArrow",
        title: "Conversion optimisation",
        description:
          "Find where revenue leaks out of your funnel and fix the highest-impact gaps first. Measured, not guessed.",
      },
      {
        icon: "IconRocket",
        title: "Growth & acquisition",
        description:
          "A prioritised plan across acquisition, retention, and average order value — sized to your team, not a 60-page deck.",
      },
    ] satisfies Feature[],
  },

  trustedBy: {
    label: "Worked with teams at",
    clients: [
      { name: "Moderna" },
      { name: "Disney" },
      { name: "NFL" },
      { name: "Aritzia" },
      { name: "Lululemon" },
    ] satisfies Client[],
  },

  cta: {
    title: "Let's find what's holding your store back",
    description:
      "A short, direct conversation is usually enough to know whether I can help. No pitch, no obligation.",
  },
};
