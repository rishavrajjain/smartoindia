import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

/*
 * The service pages' hero: light ground, the promise on the left, and a
 * photograph in a spark-framed rounded card on the right with a floating
 * fact badge riding gently over its corner. Warmer and more approachable
 * than the dark typographic heroes it replaces; each page keeps its dark
 * interactive band further down for contrast.
 */

export interface HeroChip {
  icon: React.ComponentType<{ className?: string }>;
  label: ReactNode;
}

export function PhotoHero({
  eyebrow,
  title,
  sub,
  image,
  imagePriority = true,
  float,
  chips,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: ReactNode;
  image: { src: string; alt: string };
  imagePriority?: boolean;
  /** Small fact card floating over the photo's lower-left corner. */
  float?: { icon: React.ComponentType<{ className?: string }>; title: string; line: string };
  chips?: HeroChip[];
  /** CTA row (or the booking card) under the sub line. */
  children?: ReactNode;
}) {
  return (
    <section className="overflow-hidden bg-bone">
      <Container width="wide" className="pt-12 pb-14 lg:pt-20 lg:pb-20">
        {/* grid-cols-1 keeps the implicit column at minmax(0,1fr); an
            auto-sized column would take the photo's max-content width and
            push the whole hero past a phone viewport. */}
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]">
          <div>
            <p className="text-label font-extrabold text-clay uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl text-[2.25rem] leading-[1.05] tracking-[-0.015em] sm:text-[2.875rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-taupe">
              {sub}
            </p>
            {children && <div className="mt-7">{children}</div>}
            {chips && (
              <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
                {chips.map((chip, index) => (
                  <span
                    key={index}
                    className="flex shrink-0 items-center gap-2 rounded-full bg-sand px-4 py-2.5 text-[0.78125rem] whitespace-nowrap"
                  >
                    <chip.icon className="size-[15px] shrink-0 text-green-deep" />
                    <span>{chip.label}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
            {/* The spark, as a thin frame around the photograph. */}
            <div className="rounded-[2.1875rem] bg-[linear-gradient(135deg,#282560_0%,#7b3f7e_45%,#c44868_100%)] p-[3px]">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={imagePriority}
                  sizes="(min-width: 1280px) 544px, (min-width: 1024px) 480px, calc(100vw - 2.5rem)"
                  className="zoom-slow object-cover"
                />
              </div>
            </div>
            {float && (
              <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 ring-1 ring-line motion-safe:animate-cab-float sm:left-7">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-green-deep/10">
                  <float.icon className="size-5 text-green-deep" />
                </span>
                <span>
                  <span className="block text-[0.9375rem] leading-snug font-extrabold text-ink">
                    {float.title}
                  </span>
                  <span className="block text-[0.75rem] text-taupe">
                    {float.line}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
