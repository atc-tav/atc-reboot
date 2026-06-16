import type { ReactNode } from "react";
import { Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { ContactButton } from "@/components/cta/ContactButton";

/**
 * The primary hero — "blueprint" styled: a fine grid ground, a monospace
 * technical eyebrow, a big Proxima headline, and an optional handwritten note
 * for the human, approachable touch.
 *
 * `title` accepts a ReactNode so a word can be highlighted (e.g. the brand-blue
 * "more"). `handwrittenNote` renders in the Caveat accent font.
 */
type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  handwrittenNote?: string;
  subtitle: string;
  ctaLabel?: string;
  secondaryAction?: { label: string; href: string };
};

export function Hero({
  eyebrow,
  title,
  handwrittenNote,
  subtitle,
  ctaLabel,
  secondaryAction,
}: HeroProps) {
  return (
    <Box
      component="section"
      pos="relative"
      py={{ base: 64, sm: 112 }}
      style={{ backgroundColor: "#fbfcff", overflow: "hidden" }}
    >
      {/* Blueprint grid, fading toward the content */}
      <Box
        aria-hidden
        className="blueprintGrid blueprintFade"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      />

      <Container size="md" pos="relative" style={{ zIndex: 1 }}>
        <Stack align="center" gap="lg" ta="center">
          {eyebrow && (
            <Text
              ff="monospace"
              fz="xs"
              tt="uppercase"
              c="brand.7"
              style={{ letterSpacing: "0.18em" }}
            >
              {eyebrow}
            </Text>
          )}

          <Title order={1} fz={{ base: 36, sm: 58 }} lh={1.04} maw={820} fw={800}>
            {title}
          </Title>

          {handwrittenNote && (
            <Text
              className="fontHand"
              c="brand.6"
              fz={{ base: 26, sm: 34 }}
              lh={1}
              mt={-4}
            >
              {handwrittenNote}
            </Text>
          )}

          <Text fz={{ base: "lg", sm: "xl" }} c="dimmed" maw={620} mt="xs">
            {subtitle}
          </Text>

          <Group gap="md" mt="md">
            <ContactButton label={ctaLabel} size="lg" />
            {secondaryAction && (
              <Text
                component="a"
                href={secondaryAction.href}
                fw={600}
                c="brand.7"
                style={{ textDecoration: "none" }}
              >
                {secondaryAction.label} →
              </Text>
            )}
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
