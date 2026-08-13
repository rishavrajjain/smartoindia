"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/types";

export interface UseCaseSlide {
  /** Completes the sentence "Cabs for …". */
  phrase: string;
  copy: string;
  image: SiteImage;
  ctaLabel: string;
  ctaMessage: string;
}

/**
 * The hero device from Manav's wireframe: "our cabs for ___" with previous/next
 * arrows and dots. No autoplay — the visitor drives it, which also means no
 * pause control is needed.
 */
export function UseCaseCarousel({ slides }: { slides: UseCaseSlide[] }) {
  const [index, setIndex] = useState(0);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const go = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  return (
    <section
      role="group"
      aria-roledescription="carousel"
      aria-label="What our cabs are for"
      className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8"
    >
      {/* Words. */}
      <div className="lg:col-span-7">
        <h1 className="text-[2.75rem] leading-[1.02] sm:text-[3.75rem] lg:text-[4.75rem]">
          Our cabs,
          <br />
          for{" "}
          <span aria-live="polite" ref={liveRef} className="text-clay italic">
            {slides[index].phrase}.
          </span>
        </h1>
        <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-taupe">
          {slides[index].copy}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <WhatsAppLink
            message={slides[index].ctaMessage}
            location="home-b-hero"
            subject={slides[index].phrase}
            size="lg"
          >
            {slides[index].ctaLabel}
          </WhatsAppLink>
        </div>

        {/* Controls. */}
        <div className="mt-10 flex items-center gap-5">
          <div className="flex gap-2">
            <CarouselArrow
              direction="previous"
              onClick={() => go(index - 1)}
            />
            <CarouselArrow direction="next" onClick={() => go(index + 1)} />
          </div>
          <div className="flex items-center gap-2.5" role="group" aria-label="Slides">
            {slides.map((slide, i) => (
              <button
                key={slide.phrase}
                type="button"
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}: for ${slide.phrase}`}
                aria-current={i === index ? "true" : undefined}
                className="flex size-11 items-center justify-center sm:size-8"
              >
                <span
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === index
                      ? "h-[7px] w-5 bg-clay"
                      : "size-[7px] bg-line-strong hover:bg-taupe",
                  )}
                />
              </button>
            ))}
          </div>
          <p className="text-label font-medium text-taupe uppercase tabular-nums">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Picture. All slides stay mounted so switching is instant; inactive
          ones are inert and hidden from assistive tech. */}
      <div className="relative aspect-[4/3] overflow-hidden lg:col-span-5 lg:aspect-[5/6]">
        {slides.map((slide, i) => (
          <div
            key={slide.phrase}
            aria-hidden={i !== index}
            inert={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="object-cover"
            />
          </div>
        ))}
        <p className="absolute bottom-3 left-3 bg-bone/92 px-3 py-1.5 text-label font-medium text-ink uppercase backdrop-blur-sm">
          {slides[index].phrase}
        </p>
      </div>
    </section>
  );
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} slide`}
      className="inline-flex size-11 items-center justify-center border border-line-strong text-ink transition-colors duration-300 hover:border-ink/40 hover:bg-sand"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
        className={cn("size-4", direction === "previous" && "rotate-180")}
      >
        <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
