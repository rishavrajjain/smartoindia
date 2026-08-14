"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { TravelPackage } from "@/types";

/**
 * Horizontally swipeable trip cards with a cover-flow feel: the card nearest
 * the centre stands square and bright, neighbours tilt away in perspective and
 * dim. Transforms are driven from the rail's own scroll position on a rAF, so
 * the depth follows the user's thumb; with reduced motion the rail is a flat,
 * ordinary scroller. Cards snap to centre and are plain links throughout.
 */
export function TripCoverflow({ trips }: { trips: TravelPackage[] }) {
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      const railRect = rail.getBoundingClientRect();
      const centre = railRect.left + railRect.width / 2;
      for (const item of rail.children) {
        const card = item.firstElementChild;
        if (!(card instanceof HTMLElement)) continue;
        const rect = item.getBoundingClientRect();
        const offset = (rect.left + rect.width / 2 - centre) / rect.width;
        const d = Math.max(-1.6, Math.min(1.6, offset));
        card.style.transform = `rotateY(${(-d * 14).toFixed(2)}deg) scale(${(1 - Math.min(Math.abs(d), 1) * 0.1).toFixed(3)}) translateZ(${(-Math.abs(d) * 46).toFixed(1)}px)`;
        card.style.filter = `brightness(${(1 - Math.min(Math.abs(d), 1) * 0.28).toFixed(3)})`;
      }
    };

    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    rail.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <ul
      ref={railRef}
      aria-label="Our go-to trips"
      className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pt-4 pb-2"
      style={{
        perspective: "1100px",
        // Lets the first and last card rest at the centre of the rail.
        paddingInline: "calc(50% - 6.5rem)",
      }}
    >
      {trips.map((trip, index) => (
        <li key={trip.slug} className="shrink-0 snap-center">
          <Link
            href={`/packages/${trip.slug}`}
            className="relative block h-[17.5rem] w-[13rem] overflow-hidden rounded-[1.25rem] bg-sand shadow-[0_20px_44px_-14px_rgba(10,34,38,0.6)] ring-1 ring-bone/25 will-change-transform"
          >
            <Image
              src={trip.hero.src}
              alt=""
              fill
              loading={index < 2 ? "eager" : "lazy"}
              sizes="13rem"
              className="object-cover"
            />
            <span aria-hidden="true" className="photo-scrim absolute inset-0" />
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="block font-display text-[1.1875rem] leading-snug text-bone">
                {trip.title}
              </span>
              <span className="mt-1.5 block text-[0.6875rem] font-medium tracking-[0.16em] text-bone/75 uppercase">
                {trip.durationLabel}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
