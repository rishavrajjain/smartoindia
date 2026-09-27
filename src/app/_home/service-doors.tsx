import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/site";

/*
 * The four Smarto services, where PickYourTrail asks "who's coming along":
 * each a card with its 3D render, the real Smarto wordmark beside the
 * service name, and one line. The renders sit on the same mist tone they
 * were generated on, so the card and picture read as one surface.
 */

const DOORS = [
  {
    name: "Cabs",
    line: "Flat fares, no surge",
    href: "/cabs",
    image: "/images/door-cabs.webp",
  },
  {
    name: "Flights",
    line: "Fares into the Northeast",
    href: "/flights",
    image: "/images/door-flights.webp",
  },
  {
    name: "Packages",
    line: "Domestic & international",
    href: "/packages",
    image: "/images/door-packages.webp",
  },
  {
    name: "Hotels",
    line: "Stays for every budget",
    href: "#b-hotels",
    image: "/images/door-hotels.webp",
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

      <ul className="mx-auto mt-7 grid max-w-6xl grid-cols-2 gap-3 px-5 sm:gap-4 sm:px-8 lg:grid-cols-4 lg:gap-5">
        {DOORS.map((door, i) => (
          <li
            key={door.name}
            className="motion-safe:animate-rise"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Link
              href={door.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-sand text-ink ring-2 ring-transparent transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_26px_50px_rgba(0,0,0,0.35),0_0_0_2px_rgba(117,184,132,0.9)] focus-visible:-translate-y-1.5"
            >
              <span className="relative block aspect-square">
                <Image
                  src={door.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18rem, 45vw"
                  className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.07] group-hover:-rotate-1 sm:p-3"
                />
              </span>
              <span className="flex flex-1 flex-col justify-end px-4 pb-4 sm:px-5 sm:pb-5">
                <span className="flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:gap-1.5">
                  <Image
                    src="/brand/smarto-wordmark.webp"
                    alt={SITE.name}
                    width={720}
                    height={160}
                    className="h-[0.85rem] w-auto sm:h-[1.15rem]"
                  />
                  <span className="text-[1.1875rem] leading-none font-extrabold sm:text-[1.3125rem]">
                    {door.name}
                  </span>
                </span>
                <span className="mt-1.5 block text-[0.75rem] leading-snug text-taupe sm:text-[0.8125rem]">
                  {door.line}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-ink text-bone transition-[background-color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-green-deep sm:top-4 sm:right-4 sm:size-10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="size-4 -rotate-45">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
