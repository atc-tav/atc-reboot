import { Button, type ButtonProps } from "@mantine/core";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { siteConfig } from "@/lib/site";

/**
 * The primary call-to-action, used everywhere on the site.
 *
 * It pulls its label and destination from `siteConfig.contact`, so the entire
 * site's "get in touch" behaviour is controlled from one place. Today it points
 * to LinkedIn; point it at a `/contact` route later and nothing else changes.
 */
type ContactButtonProps = ButtonProps & {
  /** Override the default "Get in touch" label for specific placements. */
  label?: string;
  /** Show the LinkedIn glyph (matches the current LinkedIn destination). */
  withIcon?: boolean;
};

export function ContactButton({
  label,
  withIcon = false,
  ...buttonProps
}: ContactButtonProps) {
  const { contact } = siteConfig;

  return (
    <Button
      component="a"
      href={contact.href}
      target={contact.external ? "_blank" : undefined}
      rel={contact.external ? "noopener noreferrer" : undefined}
      leftSection={withIcon ? <IconBrandLinkedin size={20} /> : undefined}
      size="md"
      {...buttonProps}
    >
      {label ?? contact.label}
    </Button>
  );
}
