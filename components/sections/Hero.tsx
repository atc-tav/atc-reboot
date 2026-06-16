import { Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { ContactButton } from "@/components/cta/ContactButton";

/**
 * The primary hero for the home page (and reusable on others).
 *
 * Big claim, supporting line, and a clear CTA. `eyebrow` is the small label
 * above the headline; `secondaryAction` lets a page add a softer second link
 * (e.g. "See how I work") alongside the main contact CTA.
 */
type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  secondaryAction?: { label: string; href: string };
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  secondaryAction,
}: HeroProps) {
  return (
    <Box
      component="section"
      py={{ base: 64, sm: 112 }}
      style={{
        background:
          "radial-gradient(1200px 500px at 50% -10%, var(--mantine-color-brand-0), transparent), var(--mantine-color-body)",
      }}
    >
      <Container size="md">
        <Stack align="center" gap="xl" ta="center">
          {eyebrow && (
            <Text
              fw={600}
              fz="sm"
              tt="uppercase"
              c="brand.7"
              style={{ letterSpacing: "0.08em" }}
            >
              {eyebrow}
            </Text>
          )}

          <Title
            order={1}
            fz={{ base: 36, sm: 56 }}
            lh={1.05}
            maw={760}
            fw={800}
          >
            {title}
          </Title>

          <Text fz={{ base: "lg", sm: "xl" }} c="dimmed" maw={600}>
            {subtitle}
          </Text>

          <Group gap="md" mt="sm">
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
