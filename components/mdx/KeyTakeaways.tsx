// Import `ListItem` flat (not `List.Item`): compound sub-components resolve to
// `undefined` when accessed inside a Server Component across the RSC boundary.
import { List, ListItem, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

/**
 * A highlighted summary box of the article's main points. Readers skim — give
 * them the gist up front or as a recap.
 *
 * Usage in MDX:
 *   <KeyTakeaways points={[
 *     "Fix mobile checkout first — that's where most revenue leaks.",
 *     "Measure before and after every change.",
 *   ]} />
 */
export function KeyTakeaways({
  title = "Key takeaways",
  points,
}: {
  title?: string;
  points: string[];
}) {
  return (
    <Paper
      withBorder
      radius="md"
      p="lg"
      my="xl"
      style={{ backgroundColor: "var(--mantine-color-gray-0)" }}
    >
      <Text fw={700} fz="sm" tt="uppercase" c="brand.7" mb="sm" style={{ letterSpacing: "0.06em" }}>
        {title}
      </Text>
      <List
        spacing="sm"
        icon={
          <ThemeIcon color="teal" size={22} radius="xl" variant="light">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        {points.map((point) => (
          <ListItem key={point}>{point}</ListItem>
        ))}
      </List>
    </Paper>
  );
}
