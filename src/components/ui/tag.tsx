import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Small non-interactive label. Interactive filters use a real button instead. */
export function Tag({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "sand";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 text-label font-extrabold uppercase",
        tone === "light" && "border-line-strong text-taupe",
        tone === "sand" && "border-line-strong bg-sand text-ink",
        tone === "dark" && "border-bone/25 text-bone/85",
        className,
      )}
    >
      {children}
    </span>
  );
}
