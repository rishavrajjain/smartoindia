"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Autoplaying hero video, tuned for instant paint and Safari.
 *
 * The poster renders as a priority next/image underneath, so the hero paints
 * immediately (it is the page's LCP) and there is never a black flash or a
 * play button. The video sits on top at opacity 0 and only fades in once it
 * is genuinely playing.
 *
 * Safari/Chrome autoplay rules: `muted` must be set on the element before
 * play is attempted, and React does not reliably render the muted attribute
 * into SSR markup — so it is set imperatively in a ref callback, with
 * `playsInline` for iOS. If autoplay is still blocked (Low Power Mode), the
 * first touch resumes it; failing that, the poster simply stays. Reduced
 * motion never starts the video at all.
 */
export function HeroVideo({
  src,
  poster,
  alt,
  sizes = "(min-width: 424px) 424px, 100vw",
}: {
  src: string;
  poster: string;
  alt: string;
  /** Poster image sizes hint — pass "100vw" for full-width heroes. */
  sizes?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const setVideo = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      node.playsInline = true;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);

    if (video.paused) {
      video.play().catch(() => {});
    }

    // If autoplay was blocked, the first interaction starts it.
    const resume = () => {
      if (video.paused) video.play().catch(() => {});
    };
    document.addEventListener("touchstart", resume, { once: true });
    document.addEventListener("click", resume, { once: true });

    // Browsers pause hidden-tab video; resume when the visitor comes back.
    const onVisible = () => {
      if (document.visibilityState === "visible" && video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("playing", onPlaying);
      document.removeEventListener("touchstart", resume);
      document.removeEventListener("click", resume);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        sizes={sizes}
        className="object-cover"
      />
      <video
        ref={setVideo}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          playing ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}
