import { Box, Group, Text } from "@mantine/core";
import {
  IconBulb,
  IconInfoCircle,
  IconAlertTriangle,
  IconQuote,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

/**
 * A colored callout box for articles — pull a key point out of the body text.
 *
 * Usage in MDX:
 *   <Callout type="tip" title="Quick win">
 *     Free shipping thresholds lift average order value almost every time.
 *   </Callout>
 */
type CalloutType = "note" | "tip" | "warning" | "quote";

const STYLES: Record<
  CalloutType,
  { color: string; icon: typeof IconInfoCircle; defaultTitle: string }
> = {
  note: { color: "blue", icon: IconInfoCircle, defaultTitle: "Note" },
  tip: { color: "teal", icon: IconBulb, defaultTitle: "Tip" },
  warning: { color: "orange", icon: IconAlertTriangle, defaultTitle: "Watch out" },
  quote: { color: "grape", icon: IconQuote, defaultTitle: "" },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const { color, icon: Icon, defaultTitle } = STYLES[type];
  const heading = title ?? defaultTitle;

  return (
    <Box
      my="lg"
      p="lg"
      style={{
        borderRadius: "var(--mantine-radius-md)",
        borderLeft: `4px solid var(--mantine-color-${color}-6)`,
        backgroundColor: `var(--mantine-color-${color}-0)`,
      }}
    >
      {heading && (
        <Group gap="xs" mb={6}>
          <Icon size={20} color={`var(--mantine-color-${color}-7)`} />
          <Text fw={700} c={`${color}.8`}>
            {heading}
          </Text>
        </Group>
      )}
      <Box c="dark.6" style={{ lineHeight: 1.6 }}>
        {children}
      </Box>
    </Box>
  );
}
