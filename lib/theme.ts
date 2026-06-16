"use client";

import { createTheme, type MantineColorsTuple } from "@mantine/core";

/**
 * Mantine theme — the design tokens for the whole site.
 *
 * Tweak the brand color, fonts, and radius here and every component follows.
 * The palette below is a placeholder "brand" tuple (indigo-ish); swap the ten
 * shades for your real brand color when you have it.
 */

/**
 * Mantine theme — the design tokens for the whole site.
 *
 * Brand palette is built around #186AF4 ("blueprint blue"), sampled from the
 * client's deck. Index 6 is the exact brand blue; darker shades drive the deep
 * "section slide" backgrounds, lighter ones the paper-grid accents.
 */

const brand: MantineColorsTuple = [
  "#EBF2FF",
  "#D7E4FE",
  "#AECBFC",
  "#80ACFA",
  "#5A90F7",
  "#3479F5",
  "#186AF4",
  "#1159D8",
  "#0E4CB8",
  "#0A3D96",
];

export const theme = createTheme({
  primaryColor: "brand",
  primaryShade: { light: 6, dark: 7 },
  colors: { brand },
  // Navy "ink" rather than pure black — matches the blueprint drawing aesthetic.
  black: "#0B2238",
  defaultRadius: "md",
  // Font roles are defined as CSS variables in app/globals.css.
  fontFamily: "var(--font-sans)",
  fontFamilyMonospace: "var(--font-mono)",
  headings: {
    fontFamily: "var(--font-display)",
    fontWeight: "700",
  },
});
