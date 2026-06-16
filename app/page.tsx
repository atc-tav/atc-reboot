import { Box, Container, Stack, Text } from "@mantine/core";
import { Hero } from "@/components/sections/Hero";
import { BlueprintBand } from "@/components/sections/BlueprintBand";
import { DataFlow } from "@/components/sections/DataFlow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { PullQuote } from "@/components/sections/PullQuote";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { CtaSection } from "@/components/cta/CtaSection";
import { HandUnderline } from "@/components/accents/HandUnderline";

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
              <HandUnderline>more</HandUnderline>
            </Text>{" "}
            of it.
          </>
        }
        handwrittenNote="(aka: eCommerce analytics)"
        subtitle="I'm an independent consultant who connects your store's data to the goals that actually move revenue — then helps you act on it. No fluff, no jargon, no junior team."
        secondaryAction={{ label: "See what I do", href: "/services" }}
      />

      {/* The big idea — what analytics actually is, on a blueprint band */}
      <BlueprintBand
        eyebrow="The big idea"
        title="Analytics turns raw data into revenue."
        subtitle="Every store is buried in data — sessions, carts, campaigns, a dozen dashboards no one reads. The value was never in collecting it. It's in turning it into the few decisions that actually grow the business."
      >
        <DataFlow />
        <Text className="fontHand" c="brand.1" fz={{ base: 22, sm: 28 }} mt="xs">
          the last step is where the money is
        </Text>
      </BlueprintBand>

      {/* The problem + why it matters, grounded in real numbers */}
      <Box component="section" py={{ base: 48, sm: 80 }}>
        <Container size="lg">
          <Stack gap={40}>
            <SectionHeading
              eyebrow="Why it matters"
              title="You're not short on data. You're short on answers."
              description="Most stores have GA4, a pile of dashboards, and more reports than anyone reads — and still make the big calls on gut feel. That gap between data and decisions is expensive."
            />
            <ImpactStats />
          </Stack>
        </Container>
      </Box>

      {/* Bridge: from the problem (stats) to the solution (how I help) */}
      <PullQuote
        label="Where I come in"
        quote={
          <>
            Every one of those numbers is a decision waiting to be made. I turn
            your data into{" "}
            <Text span inherit c="brand.6">
              the short list that matters
            </Text>{" "}
            — what to fix first, what to test next, what to watch — and I stay
            until it&apos;s working.
          </>
        }
        handwritten="not more dashboards — better decisions"
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

      <TrustedBy />

      <CtaSection
        title="Let's find what's holding your store back"
        description="A short, direct conversation is usually enough to know whether I can help. No pitch, no obligation."
      />
    </>
  );
}
