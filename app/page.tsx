import { Box, Container, Stack, Text } from "@mantine/core";
import { Hero } from "@/components/sections/Hero";
import { BlueprintBand } from "@/components/sections/BlueprintBand";
import { DataFlow } from "@/components/sections/DataFlow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { PullQuote } from "@/components/sections/PullQuote";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { CtaSection } from "@/components/cta/CtaSection";
import { homeContent as c } from "@/content/pages/home";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        title={
          <>
            {c.hero.titleLead}{" "}
            <Text span inherit c="brand.6">
              {c.hero.titleAccent}
            </Text>{" "}
            {c.hero.titleTrail}
          </>
        }
        handwrittenNote={c.hero.handwrittenNote}
        subtitle={c.hero.subtitle}
        secondaryAction={c.hero.secondaryAction}
      />

      <BlueprintBand
        eyebrow={c.bigIdea.eyebrow}
        title={c.bigIdea.title}
        subtitle={c.bigIdea.subtitle}
      >
        <DataFlow steps={c.bigIdea.flowSteps} />
        <Text className="fontHand" c="brand.1" fz={{ base: 22, sm: 28 }} mt="xs">
          {c.bigIdea.handwritten}
        </Text>
      </BlueprintBand>

      <Box component="section" py={{ base: 48, sm: 80 }}>
        <Container size="lg">
          <Stack gap={40}>
            <SectionHeading
              eyebrow={c.whyItMatters.eyebrow}
              title={c.whyItMatters.title}
              description={c.whyItMatters.description}
            />
            <ImpactStats impacts={c.whyItMatters.impacts} />
          </Stack>
        </Container>
      </Box>

      <PullQuote
        label={c.pullQuote.label}
        quote={
          <>
            {c.pullQuote.quoteLead}{" "}
            <Text span inherit c="brand.6">
              {c.pullQuote.quoteAccent}
            </Text>{" "}
            {c.pullQuote.quoteTrail}
          </>
        }
        handwritten={c.pullQuote.handwritten}
      />

      <Box component="section" py={{ base: 48, sm: 80 }}>
        <Container size="lg">
          <Stack gap={48}>
            <SectionHeading
              eyebrow={c.howIHelp.eyebrow}
              title={c.howIHelp.title}
              description={c.howIHelp.description}
            />
            <FeatureGrid features={c.howIHelp.features} />
          </Stack>
        </Container>
      </Box>

      <TrustedBy label={c.trustedBy.label} clients={c.trustedBy.clients} />

      <CtaSection title={c.cta.title} description={c.cta.description} />
    </>
  );
}
