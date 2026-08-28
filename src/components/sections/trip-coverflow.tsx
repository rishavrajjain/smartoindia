"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { SiteImage } from "@/types";

/** The card's slice of a trip — packages and journeys both satisfy it. */
export interface CoverflowTrip {
  slug: string;
  title: string;
  hero: SiteImage;
  durationLabel: string;
}

/**
 * Horizontally swipeable trip cards with a cover-flow feel: the card nearest
 * the centre stands square and bright, neighbours tilt away in perspective and
 * dim. Transforms are driven from the rail's own scroll position on a rAF, so
 * the depth follows the user's thumb; with reduced motion the rail is a flat,
 * ordinary scroller. Cards snap to centre and are plain links throughout.
 */
export function TripCoverflow({ trips }: { trips: CoverflowTrip[] }) {
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

    // Gentle autoplay: advance one card at a time, wrapping back to the
    // start. Any touch, drag, wheel, or hover pauses it; it resumes a few
    // seconds after the visitor lets go. Reduced motion opts out entirely.
    let pausedUntil = 0;
    let hovering = false;
    const pauseFor = (ms: number) => {
      pausedUntil = Date.now() + ms;
    };
    const onInteract = () => pauseFor(7000);
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      pauseFor(2500);
    };

    const centreOf = (el: HTMLElement) => el.offsetLeft + el.clientWidth / 2;
    const currentIndex = () => {
      const mid = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0;
      let bestDelta = Infinity;
      Array.from(rail.children).forEach((li, i) => {
        const delta = Math.abs(centreOf(li as HTMLElement) - mid);
        if (delta < bestDelta) {
          bestDelta = delta;
          best = i;
        }
      });
      return best;
    };
    const goTo = (index: number) => {
      const li = rail.children[index] as HTMLElement | undefined;
      if (!li) return;
      rail.scrollTo({
        left: centreOf(li) - rail.clientWidth / 2,
        behavior: "smooth",
      });
    };

    const tick = () => {
      if (hovering || Date.now() < pausedUntil || document.hidden) return;
      goTo((currentIndex() + 1) % rail.children.length);
    };
    const timer = window.setInterval(tick, 3600);

    rail.addEventListener("pointerdown", onInteract, { passive: true });
    rail.addEventListener("touchstart", onInteract, { passive: true });
    rail.addEventListener("wheel", onInteract, { passive: true });
    rail.addEventListener("mouseenter", onEnter);
    rail.addEventListener("mouseleave", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
      rail.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      rail.removeEventListener("pointerdown", onInteract);
      rail.removeEventListener("touchstart", onInteract);
      rail.removeEventListener("wheel", onInteract);
      rail.removeEventListener("mouseenter", onEnter);
      rail.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <ul
      ref={railRef}
      aria-label="Our go-to trips"
      className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pt-6 pb-7"
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
            className="relative block h-[17.5rem] w-[13rem] overflow-hidden rounded-2xl bg-sand shadow-[0_18px_38px_-14px_rgba(28,26,69,0.45)] will-change-transform"
          >
            <Image
              src={trip.hero.src}
              alt=""
              fill
              loading={index < 2 ? "eager" : "lazy"}
              // The card is 208px wide but 280px tall; a 3:2 photo covered by
              // height renders ~420px wide, so the fetched file must match that
              // covered width (times DPR) or it upscales and looks pixelated.
              sizes="420px"
              className="object-cover"
            />
            <span aria-hidden="true" className="photo-scrim absolute inset-0" />
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="block font-display text-[1.1875rem] leading-snug text-bone">
                {trip.title}
              </span>
              <span className="mt-1.5 block text-[0.6875rem] font-extrabold tracking-[0.16em] text-bone/75 uppercase">
                {trip.durationLabel}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
