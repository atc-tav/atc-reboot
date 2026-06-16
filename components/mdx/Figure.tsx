import { Box, Image, Text } from "@mantine/core";

/**
 * An image with an optional caption, nicely framed for articles.
 *
 * Usage in MDX:
 *   <Figure src="/articles/funnel.png" alt="A conversion funnel" caption="Where visitors drop off." />
 *
 * Put image files in `/public` (e.g. `/public/articles/...`).
 */
export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <Box component="figure" my="xl" mx={0}>
      <Image
        src={src}
        alt={alt}
        radius="md"
        style={{ border: "1px solid var(--mantine-color-gray-2)" }}
      />
      {caption && (
        <Text
          component="figcaption"
          ta="center"
          c="dimmed"
          fz="sm"
          mt="xs"
          fs="italic"
        >
          {caption}
        </Text>
      )}
    </Box>
  );
}
