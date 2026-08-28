import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Small typographic furniture.
 *
 * The identity is carried by type, rules, and whitespace rather than by colour,
 * so these are deliberately plain: a hairline-bordered label and a thin rule.
 */

/** Letterspaced caps label. Used for counts, categories, and small facts. */
export function Label({
  children,
  variant = "outline",
  className,
}: {
  children: ReactNode;
  /** `outline` on paper, `solid` over photography, `plain` inside dark bands. */
  variant?: "outline" | "solid" | "plain";
  className?: string;
}) {
  const variants = {
    outline: "border border-line-strong text-taupe",
    solid: "border border-transparent bg-bone/92 text-ink backdrop-blur-sm",
    plain: "border border-bone/25 text-bone/85",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 text-label font-extrabold uppercase",
        variants,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Eyebrow above a heading. A rule plus letterspaced caps, no colour block. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-label font-extrabold uppercase",
        tone === "dark" ? "text-bone/60" : "text-clay",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "dark" ? "bg-bone/35" : "bg-line-strong",
        )}
      />
      {children}
    </p>
  );
}
