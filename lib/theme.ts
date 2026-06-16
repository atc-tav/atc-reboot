"use client";

import { createTheme, type MantineColorsTuple } from "@mantine/core";

/**
 * Mantine theme — the design tokens for the whole site.
 *
 * Tweak the brand color, fonts, and radius here and every component follows.
 * The palette below is a placeholder "brand" tuple (indigo-ish); swap the ten
 * shades for your real brand color when you have it.
 */

const brand: MantineColorsTuple = [
  "#eef3ff",
  "#dce4f5",
  "#b9c7e2",
  "#94a8d0",
  "#748dc0",
  "#5f7cb7",
  "#5474b4",
  "#44639f",
  "#3a5890",
  "#2c4b80",
];

export const theme = createTheme({
  primaryColor: "brand",
  colors: { brand },
  defaultRadius: "md",
  fontFamily:
    "var(--font-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  headings: {
    fontFamily:
      "var(--font-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
    fontWeight: "700",
  },
});
