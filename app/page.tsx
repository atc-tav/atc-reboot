import { Box, Container, Stack } from "@mantine/core";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { CtaSection } from "@/components/cta/CtaSection";

// Placeholder copy — we'll replace this together in the content session.
const services: Feature[] = [
  {
    icon: "IconChartBar",
    title: "Conversion optimisation",
    description:
      "Find where revenue leaks out of your funnel and fix the highest-impact gaps first.",
  },
  {
    icon: "IconRocket",
    title: "Growth strategy",
    description:
      "A clear, prioritised plan for acquisition, retention, and average order value.",
  },
  {
    icon: "IconShoppingCart",
    title: "Platform & tooling",
    description:
      "Make the right calls on Shopify, analytics, and the stack that runs your store.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Ecommerce consulting"
        title="Turn more of your traffic into revenue."
        subtitle="I help online stores find what's holding back growth — and fix it. Practical, measurable, no jargon."
        secondaryAction={{ label: "See what I do", href: "/services" }}
      />

      <Box component="section" py={{ base: 48, sm: 80 }}>
        <Container size="lg">
          <Stack gap={48}>
            <SectionHeading
              eyebrow="How I help"
              title="Hands-on help where it counts"
              description="Most stores don't need a 60-page strategy deck. They need to know what to fix next — and have someone help them fix it."
            />
            <FeatureGrid features={services} />
          </Stack>
        </Container>
      </Box>

      <CtaSection />
    </>
  );
}
