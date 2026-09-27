import Image from "next/image";
import Link from "next/link";

import { type IntlTrip, tripNights } from "@/data/international-trips";

/* A destination card: photo, country, the route as a chain, and length. */
export function IntlTripCard({ trip }: { trip: IntlTrip }) {
  const nights = tripNights(trip);
  return (
    <Link
      href={`/packages/international/${trip.slug}`}
      className="group relative isolate flex h-full min-h-[21rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-clay-deep text-bone"
    >
      <Image
        src={trip.image.src}
        alt={trip.image.alt}
        fill
        sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(28,26,69,0.15)] via-[rgba(28,26,69,0.3)] via-40% to-[rgba(28,26,69,0.95)]"
      />
      <span className="absolute top-4 left-4 rounded-full bg-bone/92 px-3 py-1 text-[0.6875rem] font-extrabold text-ink backdrop-blur-sm">
        {nights}N · {nights + 1}D
      </span>
      <div className="p-5">
        <p className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-green uppercase">
          {trip.country}
        </p>
        <h3 className="mt-1 text-[1.375rem] leading-tight font-extrabold">{trip.title}</h3>
        <p className="mt-2 text-[0.8125rem] leading-snug text-bone/75">
          {trip.stops.map((s) => s.place).join(" → ")}
        </p>
        <span className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-[0.8125rem] font-extrabold">
          See the itinerary
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-bone text-ink transition-transform duration-200 group-hover:translate-x-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      </div>
    </Link>
  );
}
