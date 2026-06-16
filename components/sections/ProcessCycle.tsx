import { Box, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import type { Stage } from "@/content/pages/types";

/**
 * A numbered, vertical "process" timeline that visually closes the loop — used
 * for the analytics cycle on the home page. Pure presentation; stages passed in.
 * The connecting line + a final refresh node convey that it's a repeating cycle.
 */
export function ProcessCycle({
  stages,
  cycleNote,
}: {
  stages: Stage[];
  cycleNote?: string;
}) {
  return (
    <Box maw={720} mx="auto" w="100%">
      {stages.map((stage, i) => (
        <Group
          key={stage.title}
          align="flex-start"
          gap="md"
          wrap="nowrap"
          style={{
            borderLeft: "2px solid var(--mantine-color-brand-2)",
            marginLeft: 18,
            paddingLeft: 28,
            paddingBottom: "var(--mantine-spacing-xl)",
            position: "relative",
          }}
        >
          <ThemeIcon
            radius="xl"
            size={38}
            color="brand"
            style={{ position: "absolute", left: -20, top: -2 }}
          >
            <Text ff="monospace" fw={700} fz="sm" c="white">
              {String(i + 1).padStart(2, "0")}
            </Text>
          </ThemeIcon>
          <Box pt={4}>
            <Title order={3} fz="lg" mb={4}>
              {stage.title}
            </Title>
            <Text c="dimmed" lh={1.6}>
              {stage.description}
            </Text>
          </Box>
        </Group>
      ))}

      {/* Loop-back node — the cycle repeats */}
      {cycleNote && (
        <Group
          align="center"
          gap="md"
          wrap="nowrap"
          style={{ marginLeft: 18, paddingLeft: 28, position: "relative" }}
        >
          <ThemeIcon
            radius="xl"
            size={38}
            variant="light"
            color="brand"
            style={{ position: "absolute", left: -20, top: -2 }}
          >
            <IconRefresh size={18} />
          </ThemeIcon>
          <Text fw={600} c="brand.7" fz="sm">
            {cycleNote}
          </Text>
        </Group>
      )}
    </Box>
  );
}
