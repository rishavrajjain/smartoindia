"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export interface HeroCaption {
  /** Video second at which this caption takes over. */
  at: number;
  small: string;
  /** Small lead-in word inside the big line, e.g. "starting". */
  pre?: string;
  big: string;
  sub?: string;
}

/** Splits a leading rupee sign off a fare so it can sit small and high. */
function fareParts(big: string): { symbol: string | null; rest: string } {
  const m = big.match(/^₹\s?(.*)$/);
  return m ? { symbol: "₹", rest: m[1] } : { symbol: null, rest: big };
}

/**
 * Captions choreographed to the hero film, driven by the video's own clock
 * rather than wall-time — so they stay on the right scene however long the
 * download takes, and they loop with the film. Typeset per the brand system:
 * Light setup line over an ExtraBold payoff, with fares as proper lockups
 * (small raised ₹, tabular figures). The spark-gradient strip along the top
 * is the reel progress bar — the system's own translation of the signature
 * edge band for video.
 *
 * Media events do not bubble, so the listener rides the capture phase on
 * document; that also sidesteps mount order (the video mounts lazily on
 * phones). Where there is no video at all — desktop, reduced motion — the
 * first caption simply stands and the progress bar stays hidden.
 */
export function HeroCaptions({
  captions,
  videoSelector,
}: {
  captions: HeroCaption[];
  videoSelector: string;
}) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onTimeUpdate = (event: Event) => {
      const video = event.target;
      if (!(video instanceof HTMLVideoElement) || !video.matches(videoSelector))
        return;
      const t = video.currentTime;

      if (trackRef.current) trackRef.current.style.opacity = "1";
      // Slide, don't scale — scaling would squash the spark gradient.
      if (barRef.current && video.duration > 0)
        barRef.current.style.transform = `translateX(${(-100 * (1 - t / video.duration)).toFixed(2)}%)`;

      let index = 0;
      for (let i = 0; i < captions.length; i++) {
        if (t >= captions[i].at) index = i;
      }
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };
    document.addEventListener("timeupdate", onTimeUpdate, true);
    return () => document.removeEventListener("timeupdate", onTimeUpdate, true);
  }, [captions, videoSelector]);

  return (
    <>
      {/* The reel progress bar — spark gradient riding the film's clock. */}
      <div
        ref={trackRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-[3px] overflow-hidden bg-white/15 opacity-0 transition-opacity duration-500"
      >
        <div
          ref={barRef}
          className="h-full w-full bg-[linear-gradient(90deg,#282560_0%,#7b3f7e_50%,#c44868_100%)]"
          style={{ transform: "translateX(-100%)" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[12%] grid px-6 text-center text-bone [text-shadow:0_1px_28px_rgba(14,11,42,0.6)] [&>*]:col-start-1 [&>*]:row-start-1">
        {captions.map((caption, index) => {
          const fare = fareParts(caption.big);
          return (
            <p
              key={caption.at}
              aria-hidden="true"
              className={cn(
                // Cinematic hand-off: the leaving line lifts away and blurs out
                // quickly; a beat of clean film; the arriving line rises slowly
                // from below. Lines waiting their turn sit below, transition-free,
                // so the motion always flows upward — even after the loop resets.
                index === active &&
                  "translate-y-0 scale-100 opacity-100 blur-0 transition-[opacity,transform,filter] delay-[450ms] duration-[1200ms] ease-out",
                index < active &&
                  "-translate-y-4 scale-[1.02] opacity-0 blur-[6px] transition-[opacity,transform,filter] delay-0 duration-[550ms] ease-in",
                index > active &&
                  "translate-y-5 scale-[0.985] opacity-0 blur-[6px] transition-none",
              )}
            >
              <span className="block text-[1.4375rem] leading-none font-light tracking-[0.01em] text-bone/90">
                {caption.small}
              </span>
              <span className="mt-2 block leading-[0.95] font-extrabold tracking-[-0.02em]">
                {caption.pre && (
                  <span className="mr-2 text-[1.125rem] font-light tracking-normal text-bone/80">
                    {caption.pre}
                  </span>
                )}
                {fare.symbol && (
                  <span className="align-top text-[1.375rem] leading-none opacity-80">
                    {fare.symbol}
                  </span>
                )}
                <span className="text-[2.875rem] tabular-nums">
                  {fare.rest}
                </span>
              </span>
              {caption.sub && (
                <span className="mt-2.5 block text-[0.9375rem] font-light tracking-[0.04em] text-bone/85">
                  {caption.sub}
                </span>
              )}
            </p>
          );
        })}
        <p className="sr-only">
          {captions
            .map(
              (c) =>
                `${c.small}${c.pre ? ` ${c.pre}` : ""} ${c.big}${c.sub ? ` ${c.sub}` : ""}`,
            )
            .join(". ")}
          . With Smarto, across Northeast India.
        </p>
      </div>
    </>
  );
}
