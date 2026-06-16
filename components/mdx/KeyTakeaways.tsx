// Import `ListItem` flat (not `List.Item`): compound sub-components resolve to
// `undefined` when accessed inside a Server Component across the RSC boundary.
import { List, ListItem, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import type { ReactNode } from "react";

/**
 * A highlighted summary box of the article's main points. Readers skim — give
 * them the gist up front or as a recap.
 *
 * Takes `<Takeaway>` children rather than an array prop, because next-mdx-remote
 * v6 disables arbitrary JS expression evaluation in MDX for security (so
 * `points={[...]}` would not pass). String props and children are always safe.
 *
 * Usage in MDX:
 *   <KeyTakeaways>
 *     <Takeaway>Fix mobile checkout first — that's where revenue leaks.</Takeaway>
 *     <Takeaway>Measure before and after every change.</Takeaway>
 *   </KeyTakeaways>
 */
export function KeyTakeaways({
  title = "Key takeaways",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <Paper
      withBorder
      radius="md"
      p="lg"
      my="xl"
      style={{ backgroundColor: "var(--mantine-color-gray-0)" }}
    >
      <Text
        fw={700}
        fz="sm"
        tt="uppercase"
        c="brand.7"
        mb="sm"
        style={{ letterSpacing: "0.06em" }}
      >
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
        {children}
      </List>
    </Paper>
  );
}

export function Takeaway({ children }: { children: ReactNode }) {
  return <ListItem>{children}</ListItem>;
}
