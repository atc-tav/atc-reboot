import Link from "next/link";
import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { formatDate, type ArticleMeta } from "@/lib/content";

/**
 * A card for the article index. Links through to the full piece.
 */
export function ArticleCard({ article }: { article: ArticleMeta }) {
  const { slug, frontmatter } = article;

  return (
    <Card
      component={Link}
      href={`/articles/${slug}`}
      padding="lg"
      radius="md"
      withBorder
      style={{ height: "100%", textDecoration: "none" }}
    >
      <Stack gap="sm" h="100%" justify="space-between">
        <Stack gap="sm">
          <Group gap="xs">
            {frontmatter.category && (
              <Badge variant="light" color="brand" radius="sm">
                {frontmatter.category}
              </Badge>
            )}
            {frontmatter.draft && (
              <Badge variant="light" color="gray" radius="sm">
                Draft
              </Badge>
            )}
          </Group>
          <Title order={3} fz="xl" lh={1.25} c="dark.8">
            {frontmatter.title}
          </Title>
          <Text c="dimmed" fz="sm" lh={1.6} lineClamp={3}>
            {frontmatter.description}
          </Text>
        </Stack>

        <Group gap="md" mt="xs">
          <Text fz="xs" c="dimmed">
            {formatDate(frontmatter.date)}
          </Text>
          {frontmatter.readingMinutes && (
            <Group gap={4}>
              <IconClock size={14} color="var(--mantine-color-gray-5)" />
              <Text fz="xs" c="dimmed">
                {frontmatter.readingMinutes} min read
              </Text>
            </Group>
          )}
        </Group>
      </Stack>
    </Card>
  );
}
