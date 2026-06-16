import type { ReactNode } from "react";

/**
 * A loose, hand-drawn underline drawn beneath inline text. Zero dependencies —
 * just a wobbly SVG path that stretches to the width of its content and inherits
 * its color (so it recolors and adapts to dark mode automatically).
 *
 * Best on a single word or short, non-wrapping phrase.
 */
export function HandUnderline({
  children,
  color = "currentColor",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span style={{ position: "relative", display: "inline-block", color }}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 14"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          bottom: "-0.16em",
          width: "100%",
          height: "0.42em",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <path
          d="M3,8 C55,2 95,12 150,7 C205,2 250,12 297,6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
