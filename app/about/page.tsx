import type { Metadata } from "next";
import { Avatar, Box, Container, Stack, Text, Title } from "@mantine/core";
import { siteConfig } from "@/lib/site";
import { CtaSection } from "@/components/cta/CtaSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tav McGregor — independent eCommerce analytics consultant and the person behind Add to Cart. 14 years turning store data into decisions that grow revenue.",
};

function AboutBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="xs">
      <Title order={2} fz={{ base: 22, sm: 26 }}>
        {title}
      </Title>
      <Text fz="lg" c="dark.6" lh={1.7}>
        {children}
      </Text>
    </Stack>
  );
}

export default function AboutPage() {
  const { author } = siteConfig;

  return (
    <>
      {/* Header with circular headshot on a blueprint ground */}
      <Box
        component="section"
        pos="relative"
        py={{ base: 56, sm: 88 }}
        style={{ backgroundColor: "#fbfcff", overflow: "hidden" }}
      >
        <Box
          aria-hidden
          className="blueprintGrid blueprintFade"
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        />
        <Container size="md" pos="relative" style={{ zIndex: 1 }}>
          <Stack align="center" ta="center" gap="lg">
            <Avatar
              src={author.headshot}
              alt={author.name}
              size={150}
              radius={999}
              color="brand"
              style={{
                border: "4px solid white",
                boxShadow: "0 10px 30px rgba(11,34,56,0.14)",
              }}
            >
              TM
            </Avatar>
            <Text
              ff="monospace"
              fz="xs"
              tt="uppercase"
              c="brand.7"
              style={{ letterSpacing: "0.18em" }}
            >
              About
            </Text>
            <Title order={1} fz={{ base: 34, sm: 50 }} lh={1.05}>
              Hi, I&apos;m Tav.
            </Title>
            <Text fz={{ base: "lg", sm: "xl" }} c="dimmed" maw={640}>
              I&apos;m an independent eCommerce analytics consultant — and the
              person behind Add to Cart. For 14 years I&apos;ve helped online
              retailers, from scrappy startups to household names, turn their
              data into decisions that grow revenue.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Story */}
      <Box component="section" py={{ base: 48, sm: 72 }}>
        <Container size="sm">
          <Stack gap={40}>
            <AboutBlock title="Platform-agnostic by design">
              Whether you&apos;re on Google Analytics or Adobe, testing with
              Optimizely or Statsig, reporting in Power BI or Tableau — I meet
              your stack where it is. The tool was never the point. Connecting it
              to the decisions that move your business is.
            </AboutBlock>

            <AboutBlock title="How I got here">
              I spent over a decade inside analytics teams before going
              independent — building MEC&apos;s eCommerce analytics platform,
              leading the analytics program for Best Buy&apos;s Marketplace, and
              helping brands become &ldquo;analytics ready&rdquo; as Analytics
              Lead at Apply Digital. Since 2020 I&apos;ve run Add to Cart,
              working with teams at Moderna, Disney, the NFL, Aritzia, and
              Lululemon — alongside many fast-growing startups.
            </AboutBlock>

            <AboutBlock title="I teach it, too">
              I&apos;ve lectured on analytics at Simon Fraser University, UBC&apos;s
              Sauder School of Business, Northeastern University, and Langara
              College. Explaining this work to people learning it keeps me honest
              about what actually matters.
            </AboutBlock>

            <AboutBlock title="A note on the last couple of years">
              Recently I stepped back from full-time client work to recover,
              research, and write. I&apos;m back now — and genuinely sharper for
              the time away. It&apos;s a good reminder of what this work is really
              about: helping people make clear decisions when things are noisy.
            </AboutBlock>

            <AboutBlock title="What I believe">
              Most stores don&apos;t need more data. They need fewer, better
              metrics — the handful that genuinely map to their goals. My job is
              to find those, make them impossible to ignore, and help you act on
              them. Data, to information, to insight — and then a decision.
            </AboutBlock>
          </Stack>
        </Container>
      </Box>

      <CtaSection
        title="Think we might be a fit?"
        description="The easiest next step is a quick message. I'll tell you honestly whether I can help."
      />
    </>
  );
}
