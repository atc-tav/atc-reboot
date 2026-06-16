import type { Metadata } from "next";
import { Box, Container, Stack } from "@mantine/core";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaSection } from "@/components/cta/CtaSection";
import { servicesContent as c } from "@/content/pages/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data-driven ecommerce consulting: reporting tied to OKRs, analytics, conversion optimisation, and growth strategy for scaling DTC brands.",
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      <Box component="section" py={{ base: 48, sm: 80 }}>
        <Container size="lg">
          <Stack gap={48}>
            <SectionHeading eyebrow={c.offerings.eyebrow} title={c.offerings.title} />
            <FeatureGrid features={c.services} columns={3} />
          </Stack>
        </Container>
      </Box>

      <CtaSection title={c.cta.title} description={c.cta.description} />
    </>
  );
}
