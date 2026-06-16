import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Anchor,
  Badge,
  Box,
  Container,
  Group,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { IconArrowLeft, IconClock } from "@tabler/icons-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  formatDate,
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { CtaSection } from "@/components/cta/CtaSection";

type Params = { slug: string };

/** Pre-render every article at build time. */
export function generateStaticParams(): Params[] {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, content } = article;

  return (
    <>
      <Box component="article" py={{ base: 40, sm: 64 }}>
        <Container size={680}>
          <Stack gap="lg">
            <Anchor
              component={Link}
              href="/articles"
              c="dimmed"
              fz="sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <IconArrowLeft size={16} /> All articles
            </Anchor>

            <Stack gap="sm">
              {frontmatter.category && (
                <Badge variant="light" color="brand" radius="sm" w="fit-content">
                  {frontmatter.category}
                </Badge>
              )}
              <Title order={1} fz={{ base: 32, sm: 44 }} lh={1.1}>
                {frontmatter.title}
              </Title>
              <Text c="dimmed" fz="lg">
                {frontmatter.description}
              </Text>
              <Group gap="md">
                <Text fz="sm" c="dimmed">
                  {formatDate(frontmatter.date)}
                </Text>
                {frontmatter.readingMinutes && (
                  <Group gap={4}>
                    <IconClock size={15} color="var(--mantine-color-gray-5)" />
                    <Text fz="sm" c="dimmed">
                      {frontmatter.readingMinutes} min read
                    </Text>
                  </Group>
                )}
              </Group>
            </Stack>

            <TypographyStylesProvider p={0} fz="md">
              <MDXRemote source={content} components={mdxComponents} />
            </TypographyStylesProvider>
          </Stack>
        </Container>
      </Box>

      <CtaSection
        title="Want help applying this to your store?"
        description="This is the kind of work I do day to day. If you'd like a hand, get in touch."
      />
    </>
  );
}
