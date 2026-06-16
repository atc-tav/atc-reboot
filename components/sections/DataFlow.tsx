import { Box, Group, Text } from "@mantine/core";

/**
 * A compact "Data → Information → Insight" flow — a teaser of the analytics
 * framework from the deck. Pure presentation; the steps are passed in. Styled
 * white-on-blue for use inside BlueprintBand.
 */
export function DataFlow({
  steps = ["Data", "Information", "Insight"],
}: {
  steps?: string[];
}) {
  return (
    <Group gap="xs" justify="center" wrap="wrap" mt="sm">
      {steps.map((label, i) => (
        <Group gap="xs" key={label} wrap="nowrap">
          <Box
            style={{
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: 8,
              padding: "8px 18px",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <Text
              ff="monospace"
              fz="sm"
              c="white"
              tt="uppercase"
              style={{ letterSpacing: "0.1em" }}
            >
              {label}
            </Text>
          </Box>
          {i < steps.length - 1 && (
            <Text c="brand.1" fz="xl" fw={700} aria-hidden>
              →
            </Text>
          )}
        </Group>
      ))}
    </Group>
  );
}
