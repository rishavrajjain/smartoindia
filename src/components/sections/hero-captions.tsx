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

/**
 * Captions choreographed to the hero film, driven by the video's own clock
 * rather than wall-time — so they stay on the right scene however long the
 * download takes, and they loop with the film.
 *
 * Media events do not bubble, so the listener rides the capture phase on
 * document; that also sidesteps mount order (the video mounts lazily on
 * phones). Where there is no video at all — desktop, reduced motion — the
 * first caption simply stands.
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

  useEffect(() => {
    const onTimeUpdate = (event: Event) => {
      const video = event.target;
      if (!(video instanceof HTMLVideoElement) || !video.matches(videoSelector))
        return;
      const t = video.currentTime;
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
    <div className="pointer-events-none absolute inset-x-0 top-[12%] grid px-6 text-center text-bone [text-shadow:0_1px_28px_rgba(12,8,5,0.55)] [&>*]:col-start-1 [&>*]:row-start-1">
      {captions.map((caption, index) => (
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
          <span className="block font-[family-name:var(--font-hero-title)] text-[1.625rem] leading-none tracking-[0.02em] text-bone/85">
            {caption.small}
          </span>
          <span className="mt-1.5 block font-[family-name:var(--font-hero-funky)] leading-[0.95] font-semibold italic">
            {caption.pre && (
              <span className="mr-2 text-[1.5rem] text-bone/85">
                {caption.pre}
              </span>
            )}
            <span className="text-[3rem]">{caption.big}</span>
          </span>
          {caption.sub && (
            <span className="mt-2.5 block text-[0.9375rem] font-medium tracking-[0.04em] text-bone/85">
              {caption.sub}
            </span>
          )}
        </p>
      ))}
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
  );
}
