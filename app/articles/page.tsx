import type { Metadata } from "next";
import { Box, Container, SimpleGrid, Stack, Text } from "@mantine/core";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { CtaSection } from "@/components/cta/CtaSection";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "How-to guides and knowledge-sharing on ecommerce growth.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <Box component="section" py={{ base: 56, sm: 80 }}>
        <Container size="lg">
          <Stack gap={48}>
            <SectionHeading
              eyebrow="Articles"
              title="How-tos and field notes on ecommerce growth"
              description="Practical guides drawn from real client work. No fluff, no gated PDFs."
            />

            {articles.length === 0 ? (
              <Text c="dimmed" ta="center">
                No articles yet — check back soon.
              </Text>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </SimpleGrid>
            )}
          </Stack>
        </Container>
      </Box>

      <CtaSection
        title="Have a question I haven't written about?"
        description="Ask me directly. If it's a good question, it might become the next article."
      />
    </>
  );
}
