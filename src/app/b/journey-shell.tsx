"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { enquiry, whatsappUrl } from "@/lib/whatsapp";

export interface JourneyStop {
  /** DOM id of the section this stop represents. */
  id: string;
  /** Place name shown on the route bar. */
  label: string;
}

type JourneyProperties = CSSProperties & {
  "--trip": number;
  "--drift": string;
};

/**
 * The /b concept's connective tissue: the page is presented as one road trip,
 * and this shell drives it.
 *
 * It tracks scroll and exposes two custom properties on the wrapper -
 * `--trip` (0..1 journey progress, interpolated piecewise between the section
 * anchors so the cab arrives at each stop exactly when its section does) and
 * `--drift` (a clamped pixel offset for the hero parallax). The fixed route bar
 * at the bottom rides on `--trip`: the cab drives left to right, the road fills
 * behind it, and the destination dots double as section navigation.
 */
export function JourneyShell({
  stops,
  children,
}: {
  stops: JourneyStop[];
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeStop, setActiveStop] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;

    const update = () => {
      const anchors = stops
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (anchors.length < 2) return;

      // The reading line: a point 40% down the viewport. A section counts as
      // "reached" when its top crosses it.
      const readingLine = window.scrollY + window.innerHeight * 0.4;
      const tops = anchors.map(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );

      const last = tops.length - 1;
      let trip: number;
      if (readingLine <= tops[0]) {
        trip = 0;
      } else if (readingLine >= tops[last]) {
        trip = 1;
      } else {
        let i = 0;
        while (i < last - 1 && readingLine >= tops[i + 1]) i += 1;
        const t = (readingLine - tops[i]) / (tops[i + 1] - tops[i]);
        trip = (i + Math.min(Math.max(t, 0), 1)) / last;
      }

      // The journey completes when the page does, even if the final section is
      // too short for its top to reach the reading line.
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY >= scrollable - 2) trip = 1;

      root.style.setProperty("--trip", String(trip));
      root.style.setProperty(
        "--drift",
        `${Math.min(window.scrollY, window.innerHeight) * -0.14}px`,
      );

      const nearest = Math.round(trip * last);
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

  const initial: JourneyProperties = { "--trip": 0, "--drift": "0px" };

  return (
    <div ref={rootRef} style={initial}>
      {children}
      <RouteBar stops={stops} activeStop={activeStop} />
    </div>
  );
}

/** Fixed bottom bar: the road, the stops, the cab, and a compact CTA. */
function RouteBar({
  stops,
  activeStop,
}: {
  stops: JourneyStop[];
  activeStop: number;
}) {
  const last = stops.length - 1;

  const scrollToStop = (id: string, index: number) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div
        className="border-t border-line bg-bone/93 backdrop-blur-lg"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 py-2.5 sm:gap-6 sm:px-8 lg:py-3">
          {/* Current stop, spoken and shown. On larger screens the labels sit
              under the dots instead. */}
          <p className="w-[5.5rem] shrink-0 lg:hidden" aria-live="polite">
            <span className="block text-[0.5625rem] font-medium tracking-[0.18em] text-taupe uppercase">
              En route
            </span>
            <span className="block truncate font-display text-[0.9375rem] text-ink italic">
              {stops[activeStop]?.label}
            </span>
          </p>

          {/* The road. The side margins keep the cab's nose and tail inside
              the bar at either end of the journey. */}
          <nav
            aria-label="Journey through this page"
            className="relative ml-3 mr-8 min-w-0 flex-1"
          >
            <div className="relative h-11 lg:h-12">
              {/* Bed and fill. */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 h-px origin-left bg-clay"
                style={{ transform: "scaleX(var(--trip, 0))" }}
              />

              {/* Stops. */}
              {stops.map((stop, index) => {
                const reached = index <= activeStop;
                return (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => scrollToStop(stop.id, index)}
                    aria-label={`Go to ${stop.label}`}
                    aria-current={index === activeStop ? "true" : undefined}
                    className="group absolute top-0 flex h-full w-11 -translate-x-1/2 flex-col items-center justify-center"
                    style={{ left: `${(index / last) * 100}%` }}
                  >
                    <span
                      className={cn(
                        "size-[7px] rounded-full border transition-colors duration-300",
                        reached
                          ? "border-clay bg-clay"
                          : "border-line-strong bg-bone group-hover:border-taupe",
                      )}
                    />
                    <span
                      className={cn(
                        "pointer-events-none absolute top-[calc(50%+8px)] hidden text-[0.5625rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300 lg:block",
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

              {/* The cab, Smarto's real one, generated from its airport-cab
                  livery. Purely decorative: progress is announced by the
                  aria-live stop name and the dots' aria-current. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2"
                style={{
                  left: "calc(var(--trip, 0) * 100%)",
                  // Wheels kiss the road line; centred on the progress point.
                  transform: "translate(-50%, calc(-100% + 2px))",
                }}
              >
                <Image
                  src="/brand/smarto-cab.webp"
                  alt=""
                  width={360}
                  height={136}
                  priority
                  className="h-6 w-auto lg:h-7"
                />
              </div>
            </div>
          </nav>

          {/* Compact CTA so the conversion action never scrolls away. */}
          <a
            href={whatsappUrl(
              enquiry("I would like to book a cab or plan a trip."),
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick({ location: "home-b-route-bar" })}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm bg-ink px-4 text-sm font-medium text-bone transition-colors duration-300 hover:bg-clay-deep sm:px-5"
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">Plan a trip</span>
            <span className="sm:hidden">Plan</span>
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

