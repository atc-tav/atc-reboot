import Link from "next/link";
import { ActionIcon, Container, Group, Stack, Text } from "@mantine/core";
import { IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--mantine-color-default-border)",
        marginTop: 0,
      }}
    >
      <Container size="lg" py="xl">
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="xl">
          <Stack gap={4}>
            <Text fw={700} c="brand.8">
              {siteConfig.name}
            </Text>
            <Text size="sm" c="dimmed" maw={320}>
              {siteConfig.tagline}
            </Text>
          </Stack>

          <Group gap="xl" align="flex-start">
            <Stack gap={6}>
              {siteConfig.nav.map((link) => (
                <Text
                  key={link.href}
                  component={Link}
                  href={link.href}
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: "none" }}
                >
                  {link.label}
                </Text>
              ))}
            </Stack>

            <Group gap="sm">
              <ActionIcon
                component="a"
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                color="brand"
                size="lg"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={20} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href={`mailto:${siteConfig.social.email}`}
                variant="subtle"
                color="brand"
                size="lg"
                aria-label="Email"
              >
                <IconMail size={20} />
              </ActionIcon>
            </Group>
          </Group>
        </Group>

        <Text size="xs" c="dimmed" mt="xl">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
