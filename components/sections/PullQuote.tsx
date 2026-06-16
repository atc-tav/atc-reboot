import type { ReactNode } from "react";
import { Box, Container, Stack, Text } from "@mantine/core";

/**
 * An editorial pull-quote band on a light "paper-blue" ground — deliberately
 * not white and not boxy, so it breaks the rhythm between card sections. Used as
 * the bridge from "why it matters" (the problem) to "how I help" (the solution).
 */
type PullQuoteProps = {
  label?: string;
  quote: ReactNode;
  handwritten?: string;
};

export function PullQuote({ label, quote, handwritten }: PullQuoteProps) {
  return (
    <Box
      component="section"
      py={{ base: 56, sm: 88 }}
      style={{
        // Light: paper-blue. Dark: a deep blue-tinted navy so it keeps the same
        // "tinted band" character rather than going flat grey.
        backgroundColor: "light-dark(var(--mantine-color-brand-0), #0e2034)",
      }}
    >
      <Container size="sm">
        <Stack align="center" ta="center" gap="lg">
          {label && (
            <Text
              ff="monospace"
              fz="xs"
              tt="uppercase"
              c="brand.7"
              style={{ letterSpacing: "0.18em" }}
            >
              {label}
            </Text>
          )}

          {/* thin drafting rule */}
          <Box
            style={{
              width: 44,
              height: 3,
              borderRadius: 2,
              backgroundColor: "var(--mantine-color-brand-6)",
            }}
          />

          <Text
            component="blockquote"
            m={0}
            fz={{ base: 24, sm: 32 }}
            fw={700}
            lh={1.32}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {quote}
          </Text>

          {handwritten && (
            <Text className="fontHand" c="brand.6" fz={{ base: 24, sm: 30 }}>
              {handwritten}
            </Text>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
