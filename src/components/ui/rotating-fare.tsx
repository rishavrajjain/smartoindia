"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

/*
 * A fare that cycles through the services every few seconds. It stops after
 * two rounds, pauses while hovered, and stays still for reduced motion.
 * Screen readers get the whole list once instead of a changing line.
 */

const STEP_MS = 3200;

export function RotatingFare({
  items,
  titleClassName,
  lineClassName,
  className,
}: {
  items: { title: string; line: string }[];
  titleClassName?: string;
  lineClassName?: string;
  className?: string;
}) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const last = items.length * 2 - 1;

  useEffect(() => {
    if (paused || step >= last) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setStep((n) => n + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [paused, step, last]);

  const item = items[step % items.length];

  return (
    <span
      className={cn("block", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="sr-only">{items.map((i) => `${i.line}: ${i.title}`).join(". ")}.</span>
      <span key={step % items.length} aria-hidden="true" className="block motion-safe:animate-fade-in">
        <span className={cn("block", titleClassName)}>{item.title}</span>
        <span className={cn("block", lineClassName)}>{item.line}</span>
      </span>
    </span>
  );
}
