"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

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
 * into SSR markup, so it is set imperatively in a ref callback, with
 * `playsInline` for iOS. If autoplay is still blocked (Low Power Mode), the
 * first touch resumes it; failing that, the poster simply stays. Reduced
 * motion never starts the video at all.
 *
 * Desktop gets the picture, not the film: on large screens (≥1024px) the
 * video element is never mounted, so not a byte of it is downloaded, the
 * industry-standard treatment for a vertical, mobile-first hero film.
 */
/**
 * The video belongs on phone-sized screens with motion allowed; everywhere
 * else the poster stands alone. Server snapshot is false, so SSR markup is
 * always poster-only and desktops never download a byte of video.
 */
function useVideoEnabled() {
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
      !window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function HeroVideo({
  src,
  poster,
  alt,
  sizes = "(min-width: 424px) 424px, 100vw",
}: {
  src: string;
  poster: string;
  alt: string;
  /** Poster image sizes hint, pass "100vw" for full-width heroes. */
  sizes?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const enabled = useVideoEnabled();

  const setVideo = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      node.playsInline = true;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;

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
  }, [enabled]);

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
      {enabled && (
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
      )}
    </>
  );
}
