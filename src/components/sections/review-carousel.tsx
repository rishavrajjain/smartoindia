"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import type { Review } from "@/types";

/**
 * Traveller feedback rail.
 *
 * Scroll-snap driven rather than transform driven, so it stays usable with a
 * trackpad, a touch swipe, or the arrow buttons, and degrades to a plain
 * scrollable list if JavaScript never runs. There is no auto-advance: nothing
 * moves unless the visitor moves it.
 */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const labelId = useId();

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const { scrollLeft, clientWidth, scrollWidth } = rail;
    setAtStart(scrollLeft <= 4);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 4);

    const card = rail.firstElementChild as HTMLElement | null;
    if (card) {
      const step = card.offsetWidth + 16;
      setIndex(Math.round(scrollLeft / step));
    }
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : rail.clientWidth;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      className="relative"
    >
      <span id={labelId} className="sr-only">
        Traveller feedback
      </span>

      <ul
        ref={railRef}
        // Keyboard users can scroll the rail directly; the buttons below do the
        // same job with a larger target.
        tabIndex={0}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8"
      >
        {reviews.map((review, position) => (
          <li
            key={review.id}
            aria-label={`${position + 1} of ${reviews.length}`}
            className="w-[86%] shrink-0 snap-start sm:w-[58%] lg:w-[calc(33.333%-0.75rem)]"
          >
            <figure className="flex h-full flex-col border-t border-bone/20 pt-6">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 shrink-0 fill-bone/30"
              >
                <path d="M9.6 5.4c-3.2 1.5-5.1 4.3-5.1 7.9 0 3.1 1.8 5.3 4.4 5.3 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.7 1.9-3.3 3.8-4.2l-2.6-2Zm9.3 0c-3.2 1.5-5.1 4.3-5.1 7.9 0 3.1 1.8 5.3 4.4 5.3 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.7 1.9-3.3 3.8-4.2l-2.6-2Z" />
              </svg>
              <blockquote className="mt-5 flex-1 font-display text-[1.25rem] leading-[1.45] text-bone">
                {review.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium text-bone">{review.author}</span>
                <span className="mt-1 block text-bone/55">
                  {review.context}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex gap-2">
          <CarouselButton
            label="Previous review"
            disabled={atStart}
            onClick={() => scrollBy(-1)}
            direction="prev"
          />
          <CarouselButton
            label="Next review"
            disabled={atEnd}
            onClick={() => scrollBy(1)}
            direction="next"
          />
        </div>
        <p aria-live="polite" className="text-sm font-semibold text-bone/70">
          {Math.min(index + 1, reviews.length)} of {reviews.length}
        </p>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  direction,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex size-11 items-center justify-center border transition-colors",
        disabled
          ? "cursor-not-allowed border-bone/12 text-bone/25"
          : "border-bone/30 text-bone hover:bg-bone/12",
      )}
    >
      <span className="sr-only">{label}</span>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-4"
      >
        {direction === "prev" ? (
          <path d="M13 8H3M7 4L3 8l4 4" />
        ) : (
          <path d="M3 8h10M9 4l4 4-4 4" />
        )}
      </svg>
    </button>
  );
}
