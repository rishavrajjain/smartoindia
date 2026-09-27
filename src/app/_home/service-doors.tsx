import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/site";

/*
 * The four Smarto services, where PickYourTrail asks "who's coming along":
 * a compact row of tiles, each with its 3D render (cropped tight to the
 * object), the real Smarto wordmark over the service name, and one line.
 * The renders sit on the mist tone they were generated on, so the card and
 * picture read as one surface.
 */

const DOORS = [
  {
    name: "Cabs",
    line: "Flat fares, no surge",
    href: "/cabs",
    image: "/images/service-cabs.webp",
  },
  {
    name: "Packages",
    line: "Domestic & international",
    href: "/packages",
    image: "/images/service-packages.webp",
  },
  {
    name: "Flights",
    line: "All of India",
    href: "/flights",
    image: "/images/service-flights.webp",
  },
  {
    name: "Hotels",
    line: "For every budget",
    href: "#b-hotels",
    image: "/images/service-hotels.webp",
  },
] as const;

export function ServiceDoors() {
  return (
    <div>
      <h2 className="mx-auto flex max-w-3xl items-center gap-4 px-5 text-label font-extrabold text-bone/80 uppercase">
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        All of Smarto, in one place
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
      </h2>

      {/* A compact swipeable row; all four sit centred once they fit. The
          clipping wrapper stops WebKit widening the page from inside a
          horizontal scroller. */}
      <div className="mt-6 overflow-hidden">
        <ul className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pt-2 pb-4 sm:scroll-px-8 sm:gap-4 sm:px-8 lg:justify-center">
          {DOORS.map((door, i) => (
            <li
              key={door.name}
              className="w-[8.75rem] shrink-0 snap-start motion-safe:animate-rise sm:w-[10rem] lg:w-[12.5rem]"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Link
                href={door.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-sand text-ink transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.3),0_0_0_2px_rgba(117,184,132,0.9)] focus-visible:-translate-y-1"
              >
                <span className="relative block aspect-[4/3]">
                  <Image
                    src={door.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 12.5rem, (min-width: 640px) 10rem, 8.75rem"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:-rotate-1"
                  />
                </span>
                <span className="flex flex-1 flex-col px-3 pt-1.5 pb-3 sm:px-3.5 sm:pb-3.5">
                  <Image
                    src="/brand/smarto-wordmark.webp"
                    alt={SITE.name}
                    width={720}
                    height={160}
                    className="h-[0.65rem] w-auto self-start sm:h-[0.75rem]"
                  />
                  <span className="mt-1 text-[0.9375rem] leading-none font-extrabold sm:text-[1.0625rem]">
                    {door.name}
                  </span>
                  <span className="mt-1 line-clamp-2 text-[0.6875rem] leading-snug text-taupe sm:text-[0.75rem]">
                    {door.line}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-ink text-bone transition-[background-color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-green-deep"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 -rotate-45">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
