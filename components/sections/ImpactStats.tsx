import { Paper, SimpleGrid, Text } from "@mantine/core";
import type { Impact } from "@/content/pages/types";

/**
 * Sourced impact stats. Pure presentation — the figures are passed in. Sources
 * render in monospace (a small "citation" cue that fits the blueprint look).
 */
export function ImpactStats({ impacts }: { impacts: Impact[] }) {
  return (
    <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
      {impacts.map((s) => (
        <Paper key={s.label} withBorder radius="md" p="lg">
          <Text fw={800} fz={{ base: 30, sm: 38 }} c="brand.6" lh={1}>
            {s.value}
          </Text>
          <Text c="dimmed" fz="sm" mt="sm" lh={1.45}>
            {s.label}
          </Text>
          <Text
            ff="monospace"
            fz={10}
            tt="uppercase"
            c="dimmed"
            mt="md"
            style={{ letterSpacing: "0.06em" }}
          >
            {s.source}
          </Text>
        </Paper>
      ))}
    </SimpleGrid>
  );
}
