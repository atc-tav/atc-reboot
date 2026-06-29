import type { Impact, Client, Stage, LinkAction } from "./types";

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
    eyebrow: "How I work",
    title: "A repeatable cycle, not a one-off report",
    description:
      "Analytics isn't a project you finish. It's a loop: set the goals, measure what matters, learn from it, improve — then find the next thing worth chasing.",
    stages: [
      {
        title: "Understand your objectives",
        description:
          "It starts with one question: why do you have a website? We pin down your business objectives and turn them into OKRs — so everything we measure maps to something that matters.",
      },
      {
        title: "Implement analytics",
        description:
          "Then we track it — your KPIs, plus the signals of user intent that explain them. Platform-agnostic: bring your own tools, or I'll recommend a stack that fits.",
      },
      {
        title: "Build reports & dashboards",
        description:
          "This is where it starts to feel like analytics. Clear reports and dashboards — in the tools your team already uses — that show what's working at a glance.",
      },
      {
        title: "Test & optimise",
        description:
          "Your dashboards reveal where the journey breaks. We test improvements, measure the lift, and keep what works.",
      },
      {
        title: "Deep-dive analyses",
        description:
          "With data flowing, we dig in to find where to move the needle next. Those findings usually surface new goals — and the cycle begins again.",
      },
    ] satisfies Stage[],
    cycleNote: "Then back to step one. Each loop compounds on the last.",
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
