import { Paper, SimpleGrid, Text } from "@mantine/core";
import type { ReactNode } from "react";

/**
 * Big-number stat cards — great for grabbing attention in an article or on a
 * landing page ("3.1x ROAS", "−42% cart abandonment").
 *
 * Usage in MDX:
 *   <StatGrid>
 *     <Stat value="3.1x" label="Return on ad spend" />
 *     <Stat value="−42%" label="Cart abandonment" />
 *   </StatGrid>
 */
export function StatGrid({ children }: { children: ReactNode }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <SimpleGrid cols={{ base: 1, xs: items.length >= 2 ? 2 : 1, sm: Math.min(items.length, 4) }} spacing="md" my="xl">
      {children}
    </SimpleGrid>
  );
}

export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <Paper
      withBorder
      radius="md"
      p="lg"
      ta="center"
      style={{ backgroundColor: "var(--mantine-color-brand-0)" }}
    >
      <Text fw={800} fz={36} c="brand.8" lh={1.1}>
        {value}
      </Text>
      <Text c="dimmed" fz="sm" mt={4}>
        {label}
      </Text>
    </Paper>
  );
}
