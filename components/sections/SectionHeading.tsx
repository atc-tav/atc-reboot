import { Stack, Text, Title } from "@mantine/core";

/**
 * Consistent heading block for content sections — an optional eyebrow label,
 * a title, and an optional supporting line. Keeps vertical rhythm uniform
 * across the site.
 */
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <Stack gap="xs" align={align === "center" ? "center" : "flex-start"}>
      {eyebrow && (
        <Text
          fw={600}
          fz="sm"
          tt="uppercase"
          c="brand.7"
          style={{ letterSpacing: "0.08em" }}
        >
          {eyebrow}
        </Text>
      )}
      <Title
        order={2}
        fz={{ base: 28, sm: 36 }}
        ta={align}
        maw={align === "center" ? 640 : undefined}
      >
        {title}
      </Title>
      {description && (
        <Text c="dimmed" fz="lg" ta={align} maw={align === "center" ? 600 : 640}>
          {description}
        </Text>
      )}
    </Stack>
  );
}
