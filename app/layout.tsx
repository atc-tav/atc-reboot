import "@mantine/core/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { siteConfig } from "@/lib/site";
import { theme } from "@/lib/theme";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Handwritten accent font. next/font self-hosts it and exposes it through the
// --font-hand CSS variable (consumed by .fontHand and the Mantine theme).
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        {siteConfig.fonts.adobeKitUrl ? (
          <>
            <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
            <link rel="stylesheet" href={siteConfig.fonts.adobeKitUrl} />
          </>
        ) : null}
      </head>
      <body className={caveat.variable}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Header />
          <main>{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
