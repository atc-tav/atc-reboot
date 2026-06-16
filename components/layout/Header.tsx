"use client";

import Link from "next/link";
import {
  Box,
  Burger,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { siteConfig } from "@/lib/site";
import { ContactButton } from "@/components/cta/ContactButton";
import classes from "./Header.module.css";

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
        borderBottom:
          "1px solid var(--mantine-color-gray-2)",
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
            fw={700}
            fz="lg"
            c="brand.8"
            style={{ textDecoration: "none" }}
          >
            {siteConfig.name}
          </Text>

          <Group gap="xl" visibleFrom="sm">
            {links}
          </Group>

          <Group visibleFrom="sm">
            <ContactButton size="sm" />
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="80%"
        padding="lg"
        title={siteConfig.name}
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
