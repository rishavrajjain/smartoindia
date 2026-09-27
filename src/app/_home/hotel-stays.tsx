import Image from "next/image";

import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/cn";
import { enquiry } from "@/lib/whatsapp";

import type { StayCard } from "./data";
import { Rail } from "./rail";

/*
 * Popular stays from two towns as examples, then a card that opens every
 * other city: Smarto books hotels wherever the trip goes, the homepage just
 * leads with Shillong and Cherrapunjee. Each town panel carries up to three
 * hotels as tickets. The tickets are for reading;
 * booking goes through the one "Book hotels" button in the section header.
 * The photographs are of the towns and say so; no hotel gets a generated
 * picture under its name. The budget tier is an offer, not a named hotel.
 */

const TOWNS = [
  {
    place: "Shillong" as const,
    line: "Pine hills and cafés",
    image: "/images/dest-shillong.webp",
    alt: "Tin-roofed cottages among the pines of Shillong in morning mist",
  },
  {
    place: "Cherrapunjee" as const,
    line: "Waterfall country",
    image: "/images/pkg-meghalaya-waterfalls.webp",
    alt: "A waterfall plunging off the Cherrapunjee plateau into a green gorge",
  },
];

/* Tickets shown per town. */
const PER_TOWN = 3;

/* Panel width: a swipe on phones and tablets, three across on desktop. */
const PANEL =
  "w-[85vw] max-w-[24rem] shrink-0 snap-start sm:w-[26rem] sm:max-w-none lg:w-[calc((min(100vw-1rem,80rem)-6.5rem)/3)]";

/* Other stops on the printed routes, pictured, for the explore card. */
const MORE_CITIES = [
  { name: "Guwahati", image: "/images/dest-guwahati.webp" },
  { name: "Kaziranga", image: "/images/pkg-assam-kaziranga.webp" },
  { name: "Tawang", image: "/images/dest-tawang-winter.webp" },
  { name: "Ziro", image: "/images/dest-ziro.webp" },
];

export function HotelStays({
  stays,
  className,
}: {
  stays: StayCard[];
  className?: string;
}) {
  return (
    <Rail label="hotels by town" className={className}>
      {TOWNS.map((town) => {
        const all = stays.filter((s) => s.place === town.place);
        const shown = all.slice(0, PER_TOWN);
        const named = all.filter((s) => s.kind === "named").length;
        return (
          <li
            key={town.place}
            className={PANEL}
          >
            <article className="relative isolate flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-clay-deep text-bone lg:min-h-[28rem]">
              <Image
                src={town.image}
                alt={town.alt}
                fill
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 26rem, 85vw"
                className="-z-10 object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(28,26,69,0.3)] via-[rgba(28,26,69,0.5)] via-35% to-[rgba(28,26,69,0.96)]"
              />

              <div className="px-4 pt-24 pb-4 sm:px-5 sm:pb-5 lg:pt-6">
                <p className="inline-flex rounded-full bg-green px-2.5 py-0.5 text-[0.625rem] font-extrabold tracking-[0.16em] text-clay-deep uppercase">
                  Popular in
                </p>
                <h3 className="mt-1.5 text-[2rem] leading-none font-extrabold [text-shadow:0_2px_24px_rgba(28,26,69,0.55)] lg:text-[2.25rem]">
                  {town.place}
                </h3>
                <p className="mt-1.5 text-[0.75rem] text-bone/80 [text-shadow:0_1px_12px_rgba(28,26,69,0.6)]">
                  {town.line} · {named} {named === 1 ? "hotel" : "hotels"} on our journeys
                </p>

                <ul className="mt-4 space-y-2">
                  {shown.map((stay) => (
                    <li key={stay.id}>
                      <StayTicket stay={stay} />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        );
      })}
      <li className={PANEL}>
        <ExploreCities />
      </li>
    </Rail>
  );
}

/* The door to every other city. */
function ExploreCities() {
  return (
    <article className="relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-[2rem] bg-clay-deep p-4 text-bone sm:p-5 lg:min-h-[28rem]">
      <div aria-hidden="true" className="spark-glow pointer-events-none absolute -right-16 -bottom-20 size-72 opacity-70" />
      <ul aria-hidden="true" className="relative grid grid-cols-2 gap-2">
        {MORE_CITIES.map((city) => (
          <li key={city.name} className="relative h-24 overflow-hidden rounded-2xl sm:h-28">
            <Image src={city.image} alt="" fill sizes="13rem" className="object-cover" />
            <span className="photo-scrim absolute inset-0" />
            <span className="absolute bottom-2 left-2.5 text-[0.75rem] font-extrabold text-bone">
              {city.name}
            </span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-5">
        <p className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-[0.625rem] font-extrabold tracking-[0.16em] text-green uppercase ring-1 ring-white/15">
          More cities
        </p>
        <h3 className="mt-2 text-[1.625rem] leading-[1.1] lg:text-[1.875rem]">
          Staying <span className="accent">somewhere else?</span>
        </h3>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-bone/70">
          We book stays wherever your trip goes. Tell us the city and dates.
        </p>
        <p className="mt-3 text-[0.75rem] text-bone/55">
          {MORE_CITIES.map((c) => c.name).join(" · ")} · and more
        </p>
        <WaCta
          message={enquiry("I am looking for a hotel in another city. The city, dates and budget are:")}
          location="b-hotels"
          subject="other-cities"
          className="group mt-5 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-bone px-5 text-[0.875rem] font-extrabold text-ink transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <WhatsAppIcon />
          Explore other cities
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </WaCta>
      </div>
    </article>
  );
}

function StayTicket({ stay }: { stay: StayCard }) {
  const onRequest = stay.kind === "on-request";

  return (
    <div
      className={cn(
        "rounded-2xl px-3.5 py-3 text-ink sm:px-4",
        onRequest
          ? "border-2 border-dashed border-white/40 bg-bone/85 backdrop-blur-sm"
          : "bg-bone shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
      )}
    >
      <div className="flex items-center gap-2">
        <Stars count={stay.stars} label={onRequest ? "Up to 3 stars" : `${stay.stars} stars`} />
        <span className="text-[0.6875rem] font-extrabold text-green-deep">
          {stay.tier}
        </span>
      </div>
      <p className="mt-0.5 text-[0.9375rem] leading-snug font-extrabold sm:text-[1rem]">
        {stay.name.replace(`, ${stay.place}`, "")}
      </p>
      <p className="mt-0.5 line-clamp-1 text-[0.75rem] leading-snug text-taupe">
        {stay.note}
      </p>
      <p className="mt-1 truncate text-[0.6875rem] text-taupe/85">
        {onRequest ? (
          stay.features.join(" · ")
        ) : (
          <>
            {stay.features.join(" · ")} ·{" "}
            <b className="text-ink">
              On {stay.journeys} {stay.journeys === 1 ? "journey" : "journeys"}
            </b>
          </>
        )}
      </p>
    </div>
  );
}

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn("size-3.5", i < count ? "text-green-deep" : "text-line-strong")}
        >
          <path d="m12 3 2.7 5.5 6 .9-4.35 4.25 1 6L12 16.8l-5.35 2.85 1-6L3.3 9.4l6-.9z" />
        </svg>
      ))}
    </span>
  );
}
