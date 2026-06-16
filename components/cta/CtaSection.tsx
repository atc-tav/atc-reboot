import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { ContactButton } from "./ContactButton";

/**
 * A full-width call-to-action band. Drop this at the bottom of any page to give
 * visitors a clear next step. Copy is overridable so each page can frame the
 * ask in its own words.
 */
type CtaSectionProps = {
  title?: string;
  description?: string;
  /** Label for the button; defaults to the site-wide contact label. */
  buttonLabel?: string;
};

export function CtaSection({
  title = "Let's talk about your store",
  description = "A short conversation is usually enough to know whether I can help. No pitch, no obligation.",
  buttonLabel,
}: CtaSectionProps) {
  return (
    <Box
      component="section"
      py={{ base: 48, sm: 72 }}
      style={{
        background:
          "linear-gradient(135deg, var(--mantine-color-brand-8), var(--mantine-color-brand-6))",
      }}
    >
      <Container size="md">
        <Stack align="center" gap="lg" ta="center">
          <Title order={2} c="white" fz={{ base: 28, sm: 34 }}>
            {title}
          </Title>
          <Text c="white" opacity={0.9} maw={560} fz="lg">
            {description}
          </Text>
          <ContactButton
            label={buttonLabel}
            withIcon
            size="lg"
            variant="white"
            color="dark"
          />
        </Stack>
      </Container>
    </Box>
  );
}
