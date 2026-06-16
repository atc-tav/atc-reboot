import { Paper, SimpleGrid, Text } from "@mantine/core";

/**
 * Researched, sourced stats on the tangible business impact of analytics &
 * optimisation. Sources are shown in monospace (a small "citation" cue that
 * fits the blueprint aesthetic and signals these are real figures, not fluff).
 */
type Impact = { value: string; label: string; source: string };

const impacts: Impact[] = [
  {
    value: "~70%",
    label: "of online shopping carts are abandoned before purchase.",
    source: "Baymard Institute",
  },
  {
    value: "+35%",
    label: "average conversion lift available from better checkout UX alone.",
    source: "Baymard Institute",
  },
  {
    value: "5–6%",
    label: "higher productivity at firms that genuinely run on their data.",
    source: "MIT · Brynjolfsson et al.",
  },
  {
    value: "25%+",
    label: "more profit from just a 5% increase in customer retention.",
    source: "Reichheld · HBR",
  },
];

export function ImpactStats() {
  return (
    <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
      {impacts.map((s) => (
        <Paper key={s.label} withBorder radius="md" p="lg">
          <Text fw={800} fz={{ base: 30, sm: 38 }} c="brand.6" lh={1}>
            {s.value}
          </Text>
          <Text c="dark.6" fz="sm" mt="sm" lh={1.45}>
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
