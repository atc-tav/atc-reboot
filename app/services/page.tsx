import type { Metadata } from "next";
import { Box, Container, Stack } from "@mantine/core";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { CtaSection } from "@/components/cta/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data-driven ecommerce consulting: reporting tied to OKRs, analytics, conversion optimisation, and growth strategy for scaling DTC brands.",
};

const services: Feature[] = [
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
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Services"
        title="Pick a starting point, or let's find one together."
        subtitle="Engagements range from a one-off audit to ongoing, hands-on support. Most clients start small and expand once the data starts paying off."
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
        description="That's normal. Tell me a bit about your store and I'll point you at the highest-impact next step — even if it's not me."
      />
    </>
  );
}
