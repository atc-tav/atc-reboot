import type { Metadata } from "next";
import { Box, Container, Stack } from "@mantine/core";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { CtaSection } from "@/components/cta/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description: "Ecommerce consulting services: strategy, conversion, and tooling.",
};

// Placeholder copy — we'll refine this in the content session.
const services: Feature[] = [
  {
    icon: "IconSearch",
    title: "Store audit",
    description:
      "A structured review of your funnel, analytics, and merchandising, with a prioritised list of what to fix.",
  },
  {
    icon: "IconChartBar",
    title: "Conversion optimisation",
    description:
      "Ongoing testing and improvement of the pages and steps that decide whether visitors buy.",
  },
  {
    icon: "IconRocket",
    title: "Growth strategy",
    description:
      "A practical plan across acquisition, retention, and average order value — sized to your team.",
  },
  {
    icon: "IconShoppingCart",
    title: "Platform & migration",
    description:
      "Choosing or moving to the right platform (often Shopify) without breaking what already works.",
  },
  {
    icon: "IconChartDots",
    title: "Analytics & tracking",
    description:
      "Trustworthy numbers — clean GA4, server-side tracking, and dashboards you'll actually use.",
  },
  {
    icon: "IconUsers",
    title: "Fractional support",
    description:
      "An experienced ecommerce hand on call for your team, without a full-time hire.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Services"
        title="Pick a starting point, or let's find one together."
        subtitle="Engagements range from a one-off audit to ongoing, hands-on support. Most clients start small."
      />

      <Box component="section" py={{ base: 48, sm: 80 }}>
        <Container size="lg">
          <Stack gap={48}>
            <SectionHeading
              eyebrow="What I offer"
              title="Ways we can work together"
            />
            <FeatureGrid features={services} columns={3} />
          </Stack>
        </Container>
      </Box>

      <CtaSection
        title="Not sure which you need?"
        description="That's normal. Tell me a bit about your store and I'll point you at the highest-impact next step."
      />
    </>
  );
}
