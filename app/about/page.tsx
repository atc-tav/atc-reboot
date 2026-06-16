import type { Metadata } from "next";
import { Avatar, Box, Container, Stack, Text, Title } from "@mantine/core";
import { siteConfig } from "@/lib/site";
import { CtaSection } from "@/components/cta/CtaSection";
import { aboutContent as c } from "@/content/pages/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tav McGregor — independent eCommerce analytics consultant and the person behind Add to Cart. 14 years turning store data into decisions that grow revenue.",
};

function AboutBlock({ title, body }: { title: string; body: string }) {
  return (
    <Stack gap="xs">
      <Title order={2} fz={{ base: 22, sm: 26 }}>
        {title}
      </Title>
      <Text fz="lg" c="dimmed" lh={1.7}>
        {body}
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
        style={{
          backgroundColor: "light-dark(#fbfcff, var(--mantine-color-dark-7))",
          overflow: "hidden",
        }}
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
              {c.header.eyebrow}
            </Text>
            <Title order={1} fz={{ base: 34, sm: 50 }} lh={1.05}>
              {c.header.title}
            </Title>
            <Text fz={{ base: "lg", sm: "xl" }} c="dimmed" maw={640}>
              {c.header.intro}
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Story */}
      <Box component="section" py={{ base: 48, sm: 72 }}>
        <Container size="sm">
          <Stack gap={40}>
            {c.blocks.map((block) => (
              <AboutBlock key={block.title} title={block.title} body={block.body} />
            ))}
          </Stack>
        </Container>
      </Box>

      <CtaSection title={c.cta.title} description={c.cta.description} />
    </>
  );
}
