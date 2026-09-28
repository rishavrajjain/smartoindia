"use client";

import { useEffect, useState } from "react";

import { HeaderBar } from "@/components/site-header";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/cn";
import { enquiry } from "@/lib/whatsapp";

/*
 * The homepage's chrome: the same header bar as every other page, see-through
 * over the hero and the standard white bar once the hero scrolls away. A
 * floating WhatsApp pill appears bottom right at the same moment.
 */

const PLAN = enquiry("I would like to plan a trip in the Northeast.");

export function TrailChrome({
  sentinelId,
}: {
  /** Element at the hero's foot; once it leaves the viewport the bar goes solid. */
  sentinelId: string;
}) {
  const [solid, setSolid] = useState(false);

  // Measured on scroll and resize rather than observed: an observer can miss
  // the change when the viewport resizes mid-scroll (rotation, window drag).
  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setSolid(sentinel.getBoundingClientRect().top < 72);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sentinelId]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
          solid
            ? "border-b border-line bg-bone/90 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-[rgba(28,26,69,0.55)] to-transparent",
        )}
      >
        <HeaderBar tone={solid ? "light" : "overlay"} location="b-header" />
      </header>

      {/* Mounted only once the hero is gone, so it never sits in the tab
          order while invisible. */}
      {solid && (
        <WaCta
          message={PLAN}
          location="b-float"
          className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-full bg-green-deep pr-5 pl-4 text-[0.875rem] font-extrabold text-white shadow-[0_14px_36px_rgba(28,26,69,0.35)] ring-4 ring-white/70 motion-safe:animate-rise sm:right-6 sm:bottom-6"
        >
          <WhatsAppIcon className="size-5" />
          Plan on WhatsApp
        </WaCta>
      )}
    </>
  );
}
