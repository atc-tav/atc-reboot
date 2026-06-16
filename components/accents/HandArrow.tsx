/**
 * A short, hand-drawn arrow. Zero dependencies — a slightly wobbly line with a
 * sketchy head. Inherits its color via `currentColor`, so the parent controls it
 * (and it adapts to dark mode). Decorative, so it's aria-hidden.
 */
export function HandArrow({ size = 40 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size * 0.5}
      viewBox="0 0 48 24"
      fill="none"
      style={{ display: "block" }}
    >
      <path
        d="M3,13 C16,8 27,17 38,11.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M31,6 L41,12 L31,18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
