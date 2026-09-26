"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/*
 * A swipeable, snapping card rail with previous/next buttons. The list bleeds
 * to the viewport edges on phones but its first card lines up with the page
 * container on wide screens. The buttons disable at either end and vanish
 * entirely when everything already fits.
 */

const EDGE_PAD =
  "px-[max(1.25rem,calc((100%-80rem)/2+1.25rem))] sm:px-[max(2rem,calc((100%-80rem)/2+2rem))]";
const EDGE_SCROLL_PAD =
  "scroll-px-[max(1.25rem,calc((100%-80rem)/2+1.25rem))] sm:scroll-px-[max(2rem,calc((100%-80rem)/2+2rem))]";

export function Rail({
  label,
  header,
  tone = "light",
  resetKey,
  className,
  listClassName,
  children,
}: {
  /** Names the rail for the buttons' accessible labels, e.g. "journeys". */
  label: string;
  header?: ReactNode;
  tone?: "light" | "dark";
  /** Change it to scroll the rail back to its first card. */
  resetKey?: string;
  className?: string;
  listClassName?: string;
  children: ReactNode;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({
    atStart: true,
    atEnd: false,
    scrollable: false,
  });

  const measure = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
      scrollable: max > 4,
    });
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // The observer fires once on observe, which takes the first measurement.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  useEffect(() => {
    listRef.current?.scrollTo({ left: 0 });
  }, [resetKey]);

  const step = (direction: 1 | -1) => {
    const el = listRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const buttonClass = cn(
    "grid size-11 place-items-center rounded-full transition-[background-color,opacity] duration-200 disabled:cursor-default disabled:opacity-35",
    tone === "dark"
      ? "bg-white/10 text-bone ring-1 ring-white/15 enabled:hover:bg-white/20"
      : "bg-bone text-ink ring-1 ring-line-strong enabled:hover:bg-sand",
  );

  return (
    <div className={className}>
      <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-5 sm:px-8">
        <div className="min-w-0 flex-1">{header}</div>
        <div
          className={cn(
            "hidden shrink-0 gap-2 sm:flex",
            !state.scrollable && "sm:hidden",
          )}
        >
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={state.atStart}
            aria-label={`Scroll ${label} back`}
            className={buttonClass}
          >
            <Chevron className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={state.atEnd}
            aria-label={`Scroll ${label} forward`}
            className={buttonClass}
          >
            <Chevron className="size-4" />
          </button>
        </div>
      </div>
      <ul
        ref={listRef}
        aria-label={label}
        className={cn(
          "no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:gap-5",
          EDGE_PAD,
          EDGE_SCROLL_PAD,
          listClassName,
        )}
      >
        {children}
      </ul>
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}
