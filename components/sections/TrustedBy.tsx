import { Box, Container, Group, Image, Stack, Text } from "@mantine/core";
import type { Client } from "@/content/pages/types";

/**
 * "Trusted by" logo cloud. Pure presentation — label and clients are passed in.
 *
 * Each client renders its real SVG logo when a `logo` path is set (drop files in
 * public/logos/), otherwise a clean monochrome wordmark placeholder.
 */
export function TrustedBy({
  label,
  clients,
}: {
  label: string;
  clients: Client[];
}) {
  return (
    <Box
      component="section"
      py={{ base: 40, sm: 56 }}
      style={{
        backgroundColor:
          "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))",
      }}
    >
      <Container size="lg">
        <Stack align="center" gap="xl">
          <Text
            ff="monospace"
            fz="xs"
            tt="uppercase"
            c="dimmed"
            style={{ letterSpacing: "0.18em" }}
          >
            {label}
          </Text>

          <Group justify="center" gap={48} wrap="wrap" style={{ rowGap: 24 }}>
            {clients.map((client) =>
              client.logo ? (
                <Image
                  key={client.name}
                  src={client.logo}
                  alt={client.name}
                  h={28}
                  w="auto"
                  fit="contain"
                  style={{ filter: "grayscale(1)", opacity: 0.7 }}
                />
              ) : (
                <Text key={client.name} component="span" className="trustLogo">
                  {client.name}
                </Text>
              ),
            )}
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
