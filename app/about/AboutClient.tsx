"use client";

import { Avatar, Box, Container, Stack, Text, Title } from "@mantine/core";
import { useTina, tinaField } from "tinacms/dist/react";
import type {
  AboutPageQuery,
  AboutPageQueryVariables,
} from "@/tina/__generated__/types";
import { siteConfig } from "@/lib/site";
import { CtaSection } from "@/components/cta/CtaSection";

type Props = {
  data: AboutPageQuery;
  variables: AboutPageQueryVariables;
  query: string;
};

/**
 * Client view for the About page. `useTina` binds the server-fetched query so
 * Tina's visual editor can drive live updates; `tinaField` marks each element as
 * click-to-edit. Outside the editor it just renders the static `data`.
 */
export function AboutClient(props: Props) {
  const { data } = useTina(props);
  const page = data.aboutPage;
  const { author } = siteConfig;

  return (
    <>
      {/* Header with circular headshot on a blueprint ground */}
      <Box
        component="section"
        pos="relative"
        py={{ base: 56, sm: 88 }}
        style={{
          backgroundColor: "light-dark(#fbfcff, var(--mantine-color-dark-7))",
          overflow: "hidden",
        }}
      >
        <Box
          aria-hidden
          className="blueprintGrid blueprintFade"
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        />
        <Container size="md" pos="relative" style={{ zIndex: 1 }}>
          <Stack align="center" ta="center" gap="lg">
            <Avatar
              src={author.headshot}
              alt={author.name}
              size={150}
              radius={999}
              color="brand"
              style={{
                border: "4px solid white",
                boxShadow: "0 10px 30px rgba(11,34,56,0.14)",
              }}
            >
              TM
            </Avatar>
            <Text
              ff="monospace"
              fz="xs"
              tt="uppercase"
              c="brand.7"
              style={{ letterSpacing: "0.18em" }}
              data-tina-field={tinaField(page.header, "eyebrow")}
            >
              {page.header?.eyebrow}
            </Text>
            <Title
              order={1}
              fz={{ base: 34, sm: 50 }}
              lh={1.05}
              data-tina-field={tinaField(page.header, "title")}
            >
              {page.header?.title}
            </Title>
            <Text
              fz={{ base: "lg", sm: "xl" }}
              c="dimmed"
              maw={640}
              data-tina-field={tinaField(page.header, "intro")}
            >
              {page.header?.intro}
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Story */}
      <Box component="section" py={{ base: 48, sm: 72 }}>
        <Container size="sm">
          <Stack gap={40}>
            {(page.blocks ?? []).map((block, i) =>
              block ? (
                <Stack key={i} gap="xs">
                  <Title
                    order={2}
                    fz={{ base: 22, sm: 26 }}
                    data-tina-field={tinaField(block, "title")}
                  >
                    {block.title}
                  </Title>
                  <Text
                    fz="lg"
                    c="dimmed"
                    lh={1.7}
                    data-tina-field={tinaField(block, "body")}
                  >
                    {block.body}
                  </Text>
                </Stack>
              ) : null,
            )}
          </Stack>
        </Container>
      </Box>

      <CtaSection
        title={page.cta?.title ?? ""}
        description={page.cta?.description ?? ""}
      />
    </>
  );
}
