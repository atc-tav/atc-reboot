import type { Metadata } from "next";
import { Box, Container, Stack, Text } from "@mantine/core";
import { Hero } from "@/components/sections/Hero";
import { CtaSection } from "@/components/cta/CtaSection";

export const metadata: Metadata = {
  title: "About",
  description: "About the consultant behind Add to Cart.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About"
        title="Hi, I'm [Your Name]."
        subtitle="I've spent [X] years helping ecommerce brands grow. This page is a placeholder — we'll write your real story in the content session."
      />

      <Box component="section" py={{ base: 48, sm: 80 }}>
        <Container size="sm">
          <Stack gap="lg">
            <Text fz="lg" c="dark.6" lh={1.7}>
              This is placeholder body copy for the about page. It's here so you
              can see the typography and spacing. We'll replace it with your
              background, the kinds of clients you work with, and why someone
              should trust you with their store.
            </Text>
            <Text fz="lg" c="dark.6" lh={1.7}>
              A good about page on a consulting site is really a credibility
              page: who you've helped, the results, and what it's like to work
              with you.
            </Text>
          </Stack>
        </Container>
      </Box>

      <CtaSection
        title="Think we might be a fit?"
        description="The easiest next step is a quick message. I'll tell you honestly whether I can help."
      />
    </>
  );
}
