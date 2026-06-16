import { Box, Group, Text, ThemeIcon } from "@mantine/core";
import type { ReactNode } from "react";

/**
 * A vertical, numbered step-by-step list for how-to articles.
 *
 * Usage in MDX:
 *   <Steps>
 *     <Step title="Audit your funnel">Pull the last 90 days...</Step>
 *     <Step title="Find the biggest drop">Compare each stage...</Step>
 *   </Steps>
 *
 * Numbers are derived from order, so authors never hand-number anything.
 */
export function Steps({ children }: { children: ReactNode }) {
  const steps = Array.isArray(children) ? children : [children];

  return (
    <Box my="xl">
      {steps.map((step, index) => (
        <Group
          key={index}
          align="flex-start"
          gap="md"
          wrap="nowrap"
          style={{
            paddingBottom: index === steps.length - 1 ? 0 : "var(--mantine-spacing-lg)",
            borderLeft:
              index === steps.length - 1
                ? "2px solid transparent"
                : "2px solid var(--mantine-color-brand-1)",
            marginLeft: 17,
            paddingLeft: 22,
            position: "relative",
          }}
        >
          <ThemeIcon
            radius="xl"
            size={36}
            color="brand"
            style={{ position: "absolute", left: -19, top: -4 }}
          >
            <Text fw={700} fz="sm" c="white">
              {index + 1}
            </Text>
          </ThemeIcon>
          <Box pt={2}>{step}</Box>
        </Group>
      ))}
    </Box>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Box pb="xs">
      <Text fw={700} fz="md" mb={4}>
        {title}
      </Text>
      <Box c="dimmed" style={{ lineHeight: 1.6 }}>
        {children}
      </Box>
    </Box>
  );
}
