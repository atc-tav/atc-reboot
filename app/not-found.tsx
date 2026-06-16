import Link from "next/link";
import { Button, Container, Stack, Text, Title } from "@mantine/core";

export default function NotFound() {
  return (
    <Container size="sm" py={120}>
      <Stack align="center" gap="md" ta="center">
        <Text fw={700} c="brand.6" fz={48}>
          404
        </Text>
        <Title order={1}>Page not found</Title>
        <Text c="dimmed" maw={420}>
          The page you're looking for doesn't exist or may have moved.
        </Text>
        <Button component={Link} href="/" mt="sm">
          Back home
        </Button>
      </Stack>
    </Container>
  );
}
