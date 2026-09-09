"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * A 3px spark strip along the top edge of inner pages that fills as the
 * visitor reads down: the same gesture as the reel progress bar on the
 * homepage film, applied to scrolling. The gradient is revealed with a clip,
 * never scaled, so navy always sits at the left edge and magenta only arrives
 * at the end of the page. Hidden while a page is too short to scroll, and on
 * the concept pages and homepage through the shared data-site-chrome rule.
 */
export function ScrollSpark() {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const track = trackRef.current;
      const bar = barRef.current;
      if (!track || !bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max < 240) {
        track.style.opacity = "0";
        return;
      }
      track.style.opacity = "1";
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.clipPath = `inset(0 ${((1 - progress) * 100).toFixed(2)}% 0 0)`;
    };

    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    // A new route changes the page height after paint; measure once it settles.
    const settle = window.setTimeout(update, 300);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.clearTimeout(settle);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return (
    <div
      ref={trackRef}
      data-site-chrome="progress"
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] opacity-0 transition-opacity duration-500"
    >
      <div
        ref={barRef}
        className="spark-fill h-full w-full"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      />
    </div>
  );
}
