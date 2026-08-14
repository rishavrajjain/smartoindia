"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { enquiry, whatsappUrl } from "@/lib/whatsapp";

export interface RouteStop {
  /** DOM id of the section this stop scrolls to. */
  id: string;
  /** Short section name shown under the dot. */
  label: string;
}

type RouteProperties = CSSProperties & { "--trip": number };

/**
 * Fixed bottom route bar for the homepage, adapted from the /b concept.
 *
 * The Smarto cab rides a hairline road from the far left as the visitor
 * scrolls, the road fills behind it, and each destination dot is a real
 * section link with its name written underneath. The cab is decorative;
 * progress is announced by an aria-live region and the dots' aria-current.
 * Reduced motion still updates position — it just does not tween.
 */
export function RouteNav({ stops }: { stops: RouteStop[] }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [activeStop, setActiveStop] = useState(0);
  const activeRef = useRef(0);
  const last = stops.length - 1;

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      const anchors = stops
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (anchors.length < 2) return;

      // A section counts as "reached" once its top nears the top of the
      // viewport. Trip is interpolated piecewise between the anchors, so the
      // cab arrives at each dot exactly when its section does — and sits on
      // the first dot while the hero fills the screen.
      const readingLine = window.scrollY + window.innerHeight * 0.12;
      const tops = anchors.map(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );
      const lastTop = tops.length - 1;

      let trip: number;
      if (readingLine <= tops[0]) {
        trip = 0;
      } else if (readingLine >= tops[lastTop]) {
        trip = 1;
      } else {
        let i = 0;
        while (i < lastTop - 1 && readingLine >= tops[i + 1]) i += 1;
        const span = tops[i + 1] - tops[i] || 1;
        const t = Math.min(Math.max((readingLine - tops[i]) / span, 0), 1);
        trip = (i + t) / lastTop;
      }

      // Snap to the end when the page bottoms out, so short final sections
      // still land the cab on the last dot.
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY >= scrollable - 2) trip = 1;

      bar.style.setProperty("--trip", String(trip));

      const nearest = Math.round(trip * lastTop);
      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActiveStop(nearest);
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stops]);

  const scrollToStop = (id: string, index: number) => {
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const initial: RouteProperties = { "--trip": 0 };

  return (
    <div
      ref={barRef}
      style={initial}
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[26.5rem]"
    >
      <div
        className="border-t border-line bg-bone/95 px-4 pt-3 backdrop-blur-lg"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        {/* Section announced for screen readers in place of a visible label. */}
        <p className="sr-only" aria-live="polite">
          Section: {stops[activeStop]?.label}
        </p>

        <div className="flex items-center gap-3">
          <nav aria-label="Jump to a section" className="min-w-0 flex-1">
            {/* mx-8 keeps the cab fully visible when parked at either end. */}
            <div className="relative mx-8 h-[2.75rem]">
              {/* Road bed and the fill that trails the cab. */}
              <div className="absolute inset-x-0 top-[1.4rem] h-px bg-line-strong" />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[1.4rem] h-px origin-left bg-clay transition-transform duration-150"
                style={{ transform: "scaleX(var(--trip, 0))" }}
              />

              {/* Stops: the dot and its section name, one tappable target. */}
              {stops.map((stop, index) => {
                const reached = index <= activeStop;
                return (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => scrollToStop(stop.id, index)}
                    aria-label={`Go to ${stop.label}`}
                    aria-current={index === activeStop ? "true" : undefined}
                    className="group absolute top-0 flex h-full -translate-x-1/2 flex-col items-center"
                    style={{ left: `${(index / last) * 100}%` }}
                  >
                    <span
                      className={cn(
                        "mt-[1.15rem] size-[7px] rounded-full border transition-colors duration-300",
                        reached
                          ? "border-clay bg-clay"
                          : "border-line-strong bg-bone group-hover:border-taupe",
                      )}
                    />
                    <span
                      className={cn(
                        "mt-[0.4rem] text-[0.5625rem] font-medium tracking-[0.1em] whitespace-nowrap uppercase transition-colors duration-300",
                        index === activeStop
                          ? "text-ink"
                          : reached
                            ? "text-clay"
                            : "text-taupe/70 group-hover:text-taupe",
                      )}
                    >
                      {stop.label}
                    </span>
                  </button>
                );
              })}

              {/* The Smarto cab, riding the road on --trip. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[1.4rem]"
                style={{
                  left: "calc(var(--trip, 0) * 100%)",
                  transform: "translate(-50%, calc(-100% + 2px))",
                }}
              >
                <Image
                  src="/brand/smarto-cab.webp"
                  alt=""
                  width={360}
                  height={136}
                  priority
                  className="h-[1.5rem] w-auto"
                />
              </div>
            </div>
          </nav>

          {/* The conversion action, always in reach. */}
          <a
            href={whatsappUrl(
              enquiry("I would like to plan a trip in the Northeast."),
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick({ location: "sticky" })}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm bg-ink px-4 text-sm font-medium text-bone transition-colors duration-300 hover:bg-clay-deep"
          >
            <WhatsAppIcon />
            <span>Plan</span>
            <span className="sr-only"> a trip (opens WhatsApp in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
