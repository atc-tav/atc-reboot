import type { ReactNode } from "react";
import { Box, Container, Stack, Text, Title } from "@mantine/core";

/**
 * A full-width "section slide" band — deep blueprint-blue gradient with a fine
 * white grid overlay and white type. Mirrors the section dividers in the deck,
 * and acts as a strong visual breather between the light content sections.
 */
type BlueprintBandProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
};

export function BlueprintBand({
  eyebrow,
  title,
  subtitle,
  children,
}: BlueprintBandProps) {
  return (
    <Box
      component="section"
      pos="relative"
      py={{ base: 56, sm: 96 }}
      style={{
        overflow: "hidden",
        background:
          "linear-gradient(160deg, var(--mantine-color-brand-6), var(--mantine-color-brand-8))",
      }}
    >
      <Box
        aria-hidden
        className="blueprintGridInverse"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      />
      <Container size="md" pos="relative" style={{ zIndex: 1 }}>
        <Stack align="center" gap="lg" ta="center">
          {eyebrow && (
            <Text
              ff="monospace"
              fz="xs"
              tt="uppercase"
              c="brand.1"
              style={{ letterSpacing: "0.18em" }}
            >
              {eyebrow}
            </Text>
          )}
          <Title order={2} c="white" fz={{ base: 30, sm: 46 }} lh={1.08} maw={780} fw={800}>
            {title}
          </Title>
          {subtitle && (
            <Text c="white" fz={{ base: "md", sm: "lg" }} maw={640} style={{ opacity: 0.88 }}>
              {subtitle}
            </Text>
          )}
          {children}
        </Stack>
      </Container>
    </Box>
  );
}
