import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/deco";
import type { SiteImage } from "@/types";

interface PageHeroProps {
  image: SiteImage;
  eyebrow: string;
  /** Plain text, or JSX when a phrase should take the italic accent. */
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
  /** Small labels shown beneath the photograph. */
  stickers?: ReactNode;
  /** Set on the LCP image of the landing route only. */
  priority?: boolean;
}

/**
 * Inner-route hero.
 *
 * Text sits on paper above the photograph rather than over it, which keeps
 * contrast guaranteed at every viewport instead of depending on how bright a
 * given image happens to be.
 */
export function PageHero({
  image,
  eyebrow,
  title,
  lead,
  children,
  stickers,
  priority = false,
}: PageHeroProps) {
  return (
    <section className="pt-12 lg:pt-20">
      <Container width="wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[2.5rem] leading-[1.04] sm:text-[3.25rem] lg:text-[4rem]">
              {title}
            </h1>
          </div>

          {(lead || children) && (
            <div className="lg:col-span-5 lg:pb-2">
              {lead && (
                <p className="max-w-md text-[1.0625rem] leading-relaxed text-taupe">
                  {lead}
                </p>
              )}
              {children && <div className="mt-7">{children}</div>}
            </div>
          )}
        </div>

        <figure className="mt-12 lg:mt-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-sand sm:aspect-[2/1]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              fetchPriority={priority ? "high" : "auto"}
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
            />
          </div>
          {stickers && (
            <figcaption className="mt-4 flex flex-wrap gap-2">
              {stickers}
            </figcaption>
          )}
        </figure>
      </Container>
    </section>
  );
}
