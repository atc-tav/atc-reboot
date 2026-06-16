"use client";

import Link from "next/link";
import {
  ActionIcon,
  Box,
  Burger,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { siteConfig } from "@/lib/site";
import { ContactButton } from "@/components/cta/ContactButton";
import classes from "./Header.module.css";

/**
 * Very subtle light/dark toggle. Faint by default, brightens on hover (see
 * .themeToggle in globals.css). Shows a sun in dark mode, a moon in light mode.
 */
function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      size="lg"
      radius="xl"
      className={classes.themeToggle}
      aria-label="Toggle color scheme"
      onClick={() => setColorScheme(computed === "dark" ? "light" : "dark")}
    >
      {computed === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const links = siteConfig.nav.map((link) => (
    <Link key={link.href} href={link.href} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <Box
      component="header"
      className={classes.header}
      style={{
        borderBottom: "1px solid var(--mantine-color-default-border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Container size="lg" h={64}>
        <Group justify="space-between" h="100%">
          <Text
            component={Link}
            href="/"
            fw={800}
            fz={24}
            c="brand.6"
            style={{ textDecoration: "none", letterSpacing: "-0.01em" }}
          >
            {siteConfig.wordmark}
          </Text>

          <Group gap="xl" visibleFrom="sm">
            {links}
          </Group>

          <Group gap="xs" visibleFrom="sm">
            <ContactButton size="sm" />
            <ThemeToggle />
          </Group>

          <Group gap="xs" hiddenFrom="sm">
            <ThemeToggle />
            <Burger opened={opened} onClick={toggle} size="sm" />
          </Group>
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="80%"
        padding="lg"
        title={siteConfig.wordmark}
        hiddenFrom="sm"
        position="right"
      >
        <Stack gap="lg">
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classes.drawerLink}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
          <ContactButton fullWidth />
        </Stack>
      </Drawer>
    </Box>
  );
}
