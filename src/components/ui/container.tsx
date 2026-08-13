import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** `wide` for full-bleed editorial rows, `narrow` for reading columns. */
  width?: "default" | "wide" | "narrow";
}

const WIDTHS = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  narrow: "max-w-3xl",
} as const;

export function Container({
  children,
  className,
  width = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", WIDTHS[width], className)}>
      {children}
    </div>
  );
}
