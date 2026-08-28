import Image from "next/image";
import Link from "next/link";

import type { Journey } from "@/types";

const CARD_SIZES =
  "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2.5rem)";

/**
 * One journey in the catalog grid: photograph on top, facts below, in the
 * destination-card grammar of the brand system — navy scrim on the image,
 * name in ExtraBold, and the price line ("all-in", on request) sitting
 * below the photo, never on it.
 */
export function JourneyCard({
  journey,
  eager = false,
}: {
  journey: Journey;
  eager?: boolean;
}) {
  return (
    <Link
      href={`/packages/${journey.slug}`}
      className="group block"
      aria-label={`${journey.title}, ${journey.nights} nights ${journey.days} days`}
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-sand">
        <Image
          src={journey.hero.src}
          alt={journey.hero.alt}
          fill
          sizes={CARD_SIZES}
          loading={eager ? "eager" : "lazy"}
          className="zoom-slow object-cover"
        />
        <span aria-hidden="true" className="photo-scrim absolute inset-0" />
        <span className="absolute bottom-3.5 left-4 text-[0.8125rem] font-extrabold tracking-[0.12em] text-bone uppercase">
          {journey.nights} nights · {journey.days} days
        </span>
        <span
          aria-hidden="true"
          className="absolute top-3.5 right-4 text-[0.75rem] font-extrabold text-bone/70 tabular-nums"
        >
          {journey.num}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-taupe uppercase">
          {journey.states.join(" & ")} · {journey.pace} pace
        </p>
        <h3 className="mt-1.5 text-[1.1875rem] leading-snug font-extrabold text-ink">
          {journey.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.875rem] leading-relaxed text-taupe">
          {journey.route.join(" · ")}
        </p>
        <p className="mt-2.5 text-[0.6875rem] font-extrabold tracking-[0.14em] text-green-deep uppercase">
          All-in price on request
        </p>
      </div>
    </Link>
  );
}
