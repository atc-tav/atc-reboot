import { Card, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import type { Feature } from "@/content/pages/types";

/**
 * A responsive grid of "value prop" / service cards. Pure presentation — the
 * feature data is passed in. Icons are referenced by their Tabler name (a
 * string) so the content can stay plain data without importing components.
 */

type FeatureGridProps = {
  features: Feature[];
  columns?: number;
};

function resolveIcon(name?: string): Icon {
  if (name && name in TablerIcons) {
    return (TablerIcons as unknown as Record<string, Icon>)[name];
  }
  return TablerIcons.IconPointFilled;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: columns }} spacing="lg">
      {features.map((feature) => {
        const IconCmp = resolveIcon(feature.icon);
        return (
          <Card
            key={feature.title}
            padding="xl"
            radius="md"
            withBorder
            style={{ height: "100%" }}
          >
            <ThemeIcon
              size={48}
              radius="md"
              variant="light"
              color="brand"
              mb="md"
            >
              <IconCmp size={26} />
            </ThemeIcon>
            <Title order={3} fz="lg" mb={6}>
              {feature.title}
            </Title>
            <Text c="dimmed" fz="sm" lh={1.6}>
              {feature.description}
            </Text>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
