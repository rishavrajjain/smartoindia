import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** `dark` for use on grape or gradient surfaces. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-label font-extrabold uppercase",
            dark ? "text-bone/60" : "text-clay",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          eyebrow && "mt-5",
          Tag === "h1"
            ? "text-[2.5rem] leading-[1.04] sm:text-[3.25rem] lg:text-[4rem]"
            : "text-[2rem] leading-[1.08] sm:text-[2.5rem]",
          dark ? "text-bone" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <div
          className={cn(
            "mt-5 max-w-xl text-[1.0625rem] leading-relaxed",
            dark ? "text-bone/70" : "text-taupe",
          )}
        >
          {lead}
        </div>
      )}
    </div>
  );
}
