import { Box, Container, Stack, Text } from "@mantine/core";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { CtaSection } from "@/components/cta/CtaSection";

const services: Feature[] = [
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
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="eCommerce analytics consulting"
        title={
          <>
            If you sell stuff online, I help you sell{" "}
            <Text span inherit c="brand.6">
              more
            </Text>{" "}
            of it.
          </>
        }
        handwrittenNote="(aka: eCommerce analytics)"
        subtitle="I'm an independent consultant who connects your store's data to the goals that actually move revenue — then helps you act on it. No fluff, no jargon, no junior team."
        secondaryAction={{ label: "See what I do", href: "/services" }}
      />

      <Box component="section" py={{ base: 48, sm: 80 }}>
        <Container size="lg">
          <Stack gap={48}>
            <SectionHeading
              eyebrow="How I help"
              title="From numbers to next steps"
              description="Most stores are drowning in dashboards but short on decisions. I turn your data into a clear, prioritised plan — and help you execute it."
            />
            <FeatureGrid features={services} />
          </Stack>
        </Container>
      </Box>

      <CtaSection
        title="Let's find what's holding your store back"
        description="A short, direct conversation is usually enough to know whether I can help. No pitch, no obligation."
      />
    </>
  );
}
