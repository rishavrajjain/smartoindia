"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { HeroCaption } from "@/components/sections/hero-captions";
import { cn } from "@/lib/cn";

/*
 * The desktop hero's film: Manav's journey reel playing inside a rounded
 * rectangular cutout, ringed by a thin spark gradient with a dashed route
 * frame behind it (the same route grammar as the cab turntable). The fare
 * captions ride the film's own clock at the bottom, like the phone hero.
 *
 * The video element only mounts at desktop widths with motion allowed, so
 * phones never download a second copy (they have the full-bleed film) and
 * reduced-motion visitors get the poster. Same Safari-proof autoplay
 * pattern as HeroVideo: muted/playsInline set imperatively in the ref
 * callback, play() kicked from an effect, resume on first click and on the
 * tab becoming visible again.
 */

function useDesktopFilm() {
  return useSyncExternalStore(
    (onChange) => {
      const desktop = window.matchMedia("(min-width: 1024px)");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      desktop.addEventListener("change", onChange);
      reduced.addEventListener("change", onChange);
      return () => {
        desktop.removeEventListener("change", onChange);
        reduced.removeEventListener("change", onChange);
      };
    },
    () =>
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function FilmCard({
  src,
  poster,
  alt,
  captions,
}: {
  src: string;
  poster: string;
  alt: string;
  captions: HeroCaption[];
}) {
  const enabled = useDesktopFilm();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;
    const kick = () => video.play().catch(() => {});
    kick();
    const resume = () => kick();
    const onVisible = () => {
      if (!document.hidden) kick();
    };
    window.addEventListener("click", resume, { once: true });
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("click", resume);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [enabled]);

  // Media events don't bubble; ride the capture phase like HeroCaptions.
  useEffect(() => {
    const onTimeUpdate = (event: Event) => {
      const video = event.target;
      if (
        !(video instanceof HTMLVideoElement) ||
        !video.matches("#desktop-film video")
      )
        return;
      let index = 0;
      for (let i = 0; i < captions.length; i++) {
        if (video.currentTime >= captions[i].at) index = i;
      }
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };
    document.addEventListener("timeupdate", onTimeUpdate, true);
    return () => document.removeEventListener("timeupdate", onTimeUpdate, true);
  }, [captions]);

  return (
    <div id="desktop-film" className="relative">
      {/* The dashed route frame, offset behind the card. */}
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2.75rem] border-2 border-dashed border-white/15"
      />
      {/* The spark, as a thin frame. */}
      <div className="relative rounded-[2.1875rem] bg-[linear-gradient(135deg,#282560_0%,#7b3f7e_45%,#c44868_100%)] p-[3px]">
        <div className="relative aspect-[3/4] w-[21rem] overflow-hidden rounded-[2rem] bg-clay-deep xl:w-[23rem]">
          <Image
            src={poster}
            alt={alt}
            fill
            loading="lazy"
            sizes="368px"
            className="object-cover"
          />
          {enabled && (
            <video
              ref={(node) => {
                videoRef.current = node;
                if (node) {
                  // React doesn't reliably serialize `muted`; without it,
                  // Safari and Chrome refuse to autoplay.
                  node.muted = true;
                  node.defaultMuted = true;
                  node.playsInline = true;
                }
              }}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src={src}
              onPlaying={() => setPlaying(true)}
              className={cn(
                "absolute inset-0 size-full object-cover transition-opacity duration-700",
                playing ? "opacity-100" : "opacity-0",
              )}
            />
          )}
          {/* Scrim so the fare lines stay legible over motion. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[rgba(28,26,69,0.8)] via-[rgba(28,26,69,0.38)] to-transparent"
          />
          <div className="absolute inset-x-0 bottom-[10%] grid px-10 text-center text-bone [&>*]:col-start-1 [&>*]:row-start-1">
            {captions.map((caption, index) => (
              <p
                key={caption.at}
                aria-hidden="true"
                className={cn(
                  "transition-[opacity,transform] duration-700",
                  index === active
                    ? "translate-y-0 opacity-100 delay-150"
                    : "translate-y-1.5 opacity-0",
                )}
              >
                <span className="block text-[0.8125rem] leading-snug font-light text-bone/85">
                  {caption.small}
                </span>
                <span className="mt-0.5 block text-[1.375rem] leading-tight font-extrabold tracking-[-0.01em]">
                  {caption.pre && (
                    <span className="mr-1.5 text-[0.8125rem] font-light text-bone/80">
                      {caption.pre}
                    </span>
                  )}
                  {caption.big}
                </span>
              </p>
            ))}
          </div>
          <p className="sr-only">
            {captions
              .map(
                (c) =>
                  `${c.small}${c.pre ? ` ${c.pre}` : ""} ${c.big}${c.sub ? ` ${c.sub}` : ""}`,
              )
              .join(". ")}
          </p>
        </div>
      </div>
    </div>
  );
}
