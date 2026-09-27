import Image from "next/image";
import Link from "next/link";
import type { Viewport } from "next";

import { FlightsTeaser } from "@/components/sections/flights-teaser";
import { HeroVideo } from "@/components/sections/hero-video";
import {
  BoltIcon,
  HeadsetIcon,
  HeartIcon,
  PeopleIcon,
  SurgeOffIcon,
} from "@/components/ui/line-icons";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { CLIENT_LOGOS } from "@/data/clients";
import { FESTIVALS } from "@/data/festivals";
import { IMAGES } from "@/data/images";
import { REVIEWS } from "@/data/reviews";
import { pageMetadata } from "@/lib/seo";
import { SITE, SOCIAL, type SocialId } from "@/lib/site";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, enquiry } from "@/lib/whatsapp";
import type { Season } from "@/types";

import { CabDeals } from "./_home/cab-deals";
import {
  JOURNEY_COUNT,
  PLACES,
  POPULAR,
  SEARCH_INDEX,
  STAY_CARDS,
} from "./_home/data";
import { HotelStays } from "./_home/hotel-stays";
import { PopularRail } from "./_home/popular-rail";
import { Rail } from "./_home/rail";
import { ServiceDoors } from "./_home/service-doors";
import { TrailChrome } from "./_home/trail-chrome";
import { TrailSearch } from "./_home/trail-search";

export const metadata = pageMetadata({
  title: "Smarto: Northeast India, travelled well",
  description:
    "Flat-fare EV cabs in Guwahati, flights across India, hand-picked hotels, and fifty planned journeys across Assam, Meghalaya and Arunachal Pradesh. No surge, zero cancellation. Plan it all on WhatsApp.",
  path: "/",
});

export const viewport: Viewport = {
  themeColor: "#1c1a45",
  colorScheme: "light",
};

/*
 * The homepage: PickYourTrail's homepage rhythm (video hero with a
 * glowing search, the four Smarto services where PickYourTrail asks
 * "who's coming along", card rails, dark story cards, a chat banner)
 * rebuilt in Smarto's own brand and fed only by real catalog data. Every
 * figure here is counted from the catalog, already published on the live
 * site, or supplied by the business (the Google rating).
 */

const PLAN = enquiry("I would like to plan a trip in the Northeast.");

const HERO_STILLS = [
  { src: "/images/fleet-hero-clouds.webp", w: 1536, h: 1024 },
  { src: "/images/fleet-hero-passes.webp", w: 1536, h: 1024 },
  { src: "/images/fleet-hero-tea.webp", w: 1536, h: 1024 },
];

/* Festival cards pair the catalog entry with its scene, soonest first. */
const FESTIVAL_IMAGE: Record<string, (typeof IMAGES)[keyof typeof IMAGES]> = {
  "bihu-spring": IMAGES.festBihu,
  hornbill: IMAGES.festHornbill,
  wangala: IMAGES.festWangala,
  losar: IMAGES.festLosar,
};
const MONTHS: Season[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function HomePage() {
  const thisMonth = new Date().getMonth();
  const festivals = FESTIVALS.filter((f) => FESTIVAL_IMAGE[f.id]).sort(
    (a, b) =>
      ((MONTHS.indexOf(a.month) - thisMonth + 12) % 12) -
      ((MONTHS.indexOf(b.month) - thisMonth + 12) % 12),
  );

  return (
    <div data-page-theme="trail" className="bg-bone text-ink">
      <TrailChrome index={SEARCH_INDEX} sentinelId="b-hero-end" />

      {/* --- Hero: film on phones, crossfading stills on desktop. */}
      <section
        id="b-top"
        className="relative isolate flex h-[78svh] min-h-[34rem] flex-col items-center justify-end overflow-hidden bg-clay-deep text-bone lg:h-[44rem]"
      >
        <div className="absolute inset-0 -z-10 lg:hidden">
          <HeroVideo
            src="/video/hero-reel.mp4"
            poster="/images/hero-video-poster.webp"
            alt="A young traveller with a backpack walking across the tarmac at Guwahati airport, a plane behind her"
            sizes="(max-width: 1023px) 100vw, 1px"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
          {HERO_STILLS.map((still, i) => (
            <div
              key={still.src}
              className={i === 0 ? "hero-still hero-still-first" : "hero-still"}
              style={{ animationDelay: `${i * 7 - 1}s` }}
            >
              <Image
                src={still.src}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 100vw, 1px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-2/5 bg-gradient-to-b from-[rgba(28,26,69,0.55)] to-transparent lg:h-3/5 lg:from-[rgba(28,26,69,0.7)] lg:via-[rgba(28,26,69,0.35)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-gradient-to-t from-[rgba(28,26,69,0.85)] via-[rgba(28,26,69,0.35)] to-transparent lg:h-1/4 lg:from-[rgba(28,26,69,0.6)] lg:via-transparent"
        />

        <div className="w-full max-w-4xl px-5 pb-24 text-center sm:px-8 lg:mt-28 lg:mb-auto lg:pb-0">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-clay-deep/45 px-4 py-2 text-[0.75rem] ring-1 ring-white/20 backdrop-blur-md sm:text-[0.8125rem]">
            <span aria-hidden="true" className="size-2 rounded-full bg-green shadow-[0_0_10px_#75b884]" />
            <span>
              <b>50,000+</b> customers driven so far
            </span>
          </p>
          <h1 className="mt-5 text-[2.375rem] leading-[1.02] tracking-[-0.02em] [text-shadow:0_2px_28px_rgba(28,26,69,0.55)] sm:text-[3.25rem] lg:text-[4.25rem]">
            The Northeast,{" "}
            <span className="accent block">planned around you.</span>
          </h1>
        </div>
        <span id="b-hero-end" aria-hidden="true" className="absolute bottom-0 h-px w-px" />
      </section>

      {/* --- The sheet: search straddling the fold, then the four Smarto services. */}
      <section
        aria-label="Plan your trip"
        className="relative z-10 -mt-12 rounded-t-[2.5rem] bg-clay-deep pb-14 text-bone lg:-mt-14 lg:rounded-t-[3.5rem] lg:pb-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-3 h-56 rounded-t-[2.2rem] border-x-2 border-t-2 border-dashed border-white/12 [mask-image:linear-gradient(to_bottom,#000_30%,transparent)] lg:inset-x-5 lg:top-4 lg:rounded-t-[3.1rem]"
        />
        <div className="relative z-30 mx-auto -mt-8 max-w-2xl px-5 lg:-mt-9">
          <TrailSearch index={SEARCH_INDEX} />
        </div>

        <div className="relative mt-12 lg:mt-14">
          <ServiceDoors />
          <PopularRail journeys={POPULAR} />
        </div>
      </section>

      {/* --- The green band: traveller feedback, drifting past. */}
      <section aria-label="Traveller feedback" className="bg-green text-clay-deep">
        <div className="marquee-mask overflow-hidden pt-3">
          <ul
            className="flex w-max items-center motion-safe:animate-marquee hover:[animation-play-state:paused]"
            style={{ animationDuration: "90s" }}
          >
            {[0, 1].map((copy) =>
              REVIEWS.map((review) => (
                <li
                  key={`${copy}-${review.id}`}
                  aria-hidden={copy === 1 ? true : undefined}
                  className="flex shrink-0 items-center"
                >
                  <figure className="flex w-[16.5rem] items-start gap-2.5 rounded-2xl bg-bone py-3 pr-3.5 pl-2.5 shadow-[0_6px_16px_rgba(28,26,69,0.12)]">
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-clay-deep text-green"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                        <path d="M4 18v-5.2C4 8.6 6 6 10 5l.8 1.6C8.6 7.5 7.6 9 7.5 11H10v7zm9.5 0v-5.2c0-4.2 2-6.8 6-7.8l.8 1.6c-2.2.9-3.2 2.4-3.3 4.4h2.5v7z" />
                      </svg>
                    </span>
                    <span className="min-w-0 leading-tight">
                      <blockquote className="line-clamp-2 text-[0.8125rem] leading-snug font-extrabold text-ink">
                        {review.highlight}
                      </blockquote>
                      <figcaption className="mt-1 truncate text-[0.6875rem] text-taupe">
                        {review.author} · {review.context}
                      </figcaption>
                    </span>
                  </figure>
                  <BoltIcon className="mx-5 size-4 shrink-0 text-clay-deep/60" />
                </li>
              )),
            )}
          </ul>
        </div>
        <p className="pt-1.5 pb-2 text-center text-[0.625rem] text-clay-deep/65">
          Illustrative feedback while we gather permission to publish real reviews.
        </p>
      </section>

      {/* --- Cabs: PickYourTrail's "recently booked" layout. */}
      <section className="pt-14 lg:pt-20">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-center lg:gap-4 lg:pl-8">
          <div className="px-5 sm:px-8 lg:px-0">
            <h2 className="text-[2rem] leading-[1.05] lg:text-[2.5rem]">
              Cabs at one{" "}
              <span className="relative inline-block">
                <span className="accent relative z-10">flat</span>
                <Scribble className="absolute -inset-x-3 -inset-y-2.5 h-[calc(100%+1.25rem)] w-[calc(100%+1.5rem)] text-green" />
              </span>{" "}
              <span className="accent">fare</span>
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 text-[0.8125rem] font-extrabold text-green-deep lg:mt-5 lg:rounded-full lg:bg-green/15 lg:px-3.5 lg:py-2">
              <SurgeOffIcon className="size-4" />
              No surge · zero cancellation
            </p>
            <p className="mt-4 hidden max-w-[15rem] text-[0.875rem] leading-relaxed text-taupe lg:block">
              Rain, rush hour or 2 AM, the quoted price is the price.
            </p>
          </div>
          <CabDeals className="mt-7 lg:mt-0" />
        </div>
        <p className="mx-auto mt-3 max-w-7xl px-5 text-[0.6875rem] text-taupe/75 sm:px-8">
          Starting fares from Smarto&rsquo;s published rate list, confirmed on
          WhatsApp before you ride.
        </p>
      </section>

      {/* --- Flights: a photographic panel with the boarding pass as a punched ticket. */}
      <FlightsTeaser layout="wide" id="b-flights" location="b-flights" />

      {/* --- Hotels: the catalog's Shillong and Cherrapunjee stays, town by town. */}
      <section id="b-hotels" className="scroll-mt-24 pt-14 lg:pt-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-x-10 gap-y-6 px-5 sm:px-8">
          <div>
            <p className="text-label font-extrabold text-clay uppercase">Hotels</p>
            <h2 className="mt-3 text-[1.875rem] leading-[1.08] lg:text-[2.5rem]">
              Stays for{" "}
              <span className="relative inline-block">
                <span className="accent relative z-10">every budget</span>
                <Swoosh className="absolute -bottom-2.5 left-0 h-3.5 w-full text-green" />
              </span>
            </h2>
            <p className="mt-5 max-w-md text-[0.875rem] leading-relaxed text-taupe">
              Hand-picked stays wherever you are headed, from five-star to
              easy on the wallet. A few favourites from Shillong and
              Cherrapunjee to start.
            </p>
          </div>
          {/* The one way in to book a stay; points at WhatsApp until the
              hotels booking page exists. */}
          <WaCta
            message={enquiry("I would like to book a hotel. My destination, dates and budget are:")}
            location="b-hotels"
            className="group inline-flex min-h-[3.5rem] items-center gap-3 rounded-full bg-green-deep py-2 pr-6 pl-2 text-[0.9375rem] font-extrabold text-white shadow-[0_14px_30px_rgba(57,151,114,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
                <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V7.5A1.5 1.5 0 0 1 7.5 6h3A1.5 1.5 0 0 1 12 7.5V10" />
              </svg>
            </span>
            Book hotels
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </WaCta>
        </div>
        <HotelStays stays={STAY_CARDS} className="mt-7" />
      </section>

      {/* --- Why Smarto: the stats strip. */}
      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:pt-20">
        <h2 className="text-center text-[1.5rem] leading-tight lg:text-[2rem]">
          Why travellers <span className="accent">pick Smarto</span>
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 rounded-[2rem] bg-sand p-4 sm:gap-4 sm:p-6 lg:grid-cols-5 lg:items-center lg:gap-2 lg:px-8 lg:py-9">
          {/* Smarto as a whole, not just the cabs. The rating is the
              business's own figure; it stays out of structured data. */}
          <Stat icon={StarIcon} value="4.9+" label="Google rating" />
          <Stat icon={HeadsetIcon} value="24×7" label="customer support" />
          <div className="order-first col-span-2 flex flex-col items-center py-2 text-center lg:order-none lg:col-span-1">
            <span aria-hidden="true" className="spark-fill mb-4 h-1 w-12 rounded-full" />
            <p className="text-[1.25rem] leading-tight text-taupe lg:text-[1.375rem]">
              Smart People,
              <span className="block">
                <span className="accent text-ink">Smart </span>
                <span className="accent text-gradient-green">Choice</span>
              </span>
            </p>
          </div>
          <Stat icon={PeopleIcon} value="50,000+" label="customers served" />
          <Stat icon={HeartIcon} value="Every" label="customer matters" />
        </div>
      </section>

      {/* --- Corporate: the navy band, with the revolving client wall. */}
      <section id="b-corporate" className="relative mt-14 scroll-mt-24 overflow-hidden bg-ink py-14 text-bone lg:mt-20 lg:py-20">
        <div aria-hidden="true" className="spark-glow pointer-events-none absolute -top-24 -right-16 size-72 lg:size-[28rem]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center lg:gap-14">
          <div>
            <p className="text-label font-extrabold text-clay-bright uppercase">Corporate</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight text-bone lg:text-[2.5rem]">
              Teams that <span className="accent">arrive on time</span>
            </h2>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-bone/70">
              Employee transport, offsites, and everyday movement: one point of
              contact, billing your finance team will not argue with.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <WaCta
                message={enquiry("I would like to discuss corporate transport for my team.")}
                location="b-corporate"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-bone px-6 text-[0.9375rem] font-extrabold text-ink transition-colors hover:bg-white"
              >
                <WhatsAppIcon />
                Talk to us about your team
              </WaCta>
              <Link href="/corporate" className="link-rule text-[0.875rem] font-extrabold text-bone">
                How corporate travel works
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-white/10">
              <Image
                src="/images/fleet-corporate-porch.webp"
                alt="Smarto electric cabs arriving at the glass porch of a modern office on a bright morning"
                fill
                sizes="32rem"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <p className="relative mx-auto mt-12 max-w-7xl px-5 text-label font-extrabold text-bone/55 uppercase sm:px-8">
          Trusted by teams at
        </p>
        {/* Revolving client logos, two copies for a seamless loop. */}
        <div className="marquee-mask relative mt-4 overflow-hidden">
          <ul className="flex w-max animate-marquee items-center gap-3">
            {[0, 1].map((copy) =>
              CLIENT_LOGOS.map((logo) => (
                <li
                  key={`${copy}-${logo.name}`}
                  aria-hidden={copy === 1 ? true : undefined}
                  className="flex h-16 shrink-0 items-center justify-center rounded-2xl bg-bone px-6 lg:h-20 lg:px-8"
                >
                  <Image
                    src={logo.src}
                    alt={copy === 0 ? logo.name : ""}
                    width={logo.w}
                    height={logo.h}
                    loading="lazy"
                    className="h-8 w-auto object-contain lg:h-10"
                  />
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      {/* --- Places: a rail of real stops, with honest counts. */}
      <section className="pt-14 lg:pt-20">
        <Rail
          label="places"
          header={
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-[1.75rem] leading-tight lg:text-[2.25rem]">
                Pick a place <span className="accent">to start</span>
              </h2>
              <Link
                href="/packages"
                className="link-rule shrink-0 text-[0.8125rem] font-extrabold text-ink"
              >
                All {JOURNEY_COUNT} journeys
              </Link>
            </div>
          }
        >
          {PLACES.map((place) => (
            <li key={place.name} className="w-[12.5rem] shrink-0 snap-start sm:w-[14rem] lg:w-[15.5rem]">
              <Link
                href={`/packages?q=${encodeURIComponent(place.name)}#journeys`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand"
              >
                <Image
                  src={place.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 248px, 224px"
                  className="zoom-slow object-cover"
                />
                <span aria-hidden="true" className="photo-scrim absolute inset-0" />
                <span className="absolute top-3 right-3 rounded-full bg-bone/92 px-2.5 py-1 text-[0.6875rem] font-extrabold text-ink backdrop-blur-sm">
                  {place.count} {place.count === 1 ? "journey" : "journeys"}
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <span className="block text-[0.625rem] font-extrabold tracking-[0.2em] text-bone/80 uppercase">
                    {place.line}
                  </span>
                  <span className="mt-1 block text-[1.625rem] leading-none font-extrabold text-bone lg:text-[1.875rem]">
                    {place.name}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </Rail>
      </section>

      {/* --- Festivals: dark arch cards (PickYourTrail's traveller stories). */}
      <section className="relative mt-16 overflow-hidden bg-clay-deep py-14 text-bone lg:mt-24 lg:py-20">
        <div aria-hidden="true" className="spark-glow pointer-events-none absolute -top-32 -right-24 size-96" />
        <div aria-hidden="true" className="spark-glow pointer-events-none absolute -bottom-40 -left-32 size-96 opacity-60" />
        <Rail
          label="festivals"
          tone="dark"
          className="relative"
          header={
            <div>
              <p className="text-label font-extrabold text-green uppercase">
                Festivals
              </p>
              <h2 className="mt-3 text-[1.75rem] leading-tight lg:text-[2.25rem]">
                Travel <span className="accent">by the calendar</span>
              </h2>
              <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-bone/65">
                The region&rsquo;s big gatherings, and a car that gets you there
                on the day.
              </p>
            </div>
          }
        >
          {festivals.map((festival) => (
            <li key={festival.id} className="w-[15rem] shrink-0 snap-start lg:w-[calc((min(100vw-1rem,80rem)-7.75rem)/4)]">
              <Link href="/festivals" className="group block text-center">
                <span className="relative block aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl ring-1 ring-white/15">
                  <Image
                    src={FESTIVAL_IMAGE[festival.id].src}
                    alt={FESTIVAL_IMAGE[festival.id].alt}
                    fill
                    sizes="(min-width: 1024px) 300px, 240px"
                    className="zoom-slow object-cover"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(28,26,69,0.55)] to-transparent to-50%" />
                  <span className="absolute inset-x-0 bottom-4 flex justify-center">
                    <span className="rounded-full bg-bone px-3 py-1 text-[0.6875rem] font-extrabold tracking-[0.1em] text-ink uppercase">
                      {MONTH_NAMES[MONTHS.indexOf(festival.month)]}
                    </span>
                  </span>
                </span>
                <span className="mt-4 block text-[1.125rem] font-extrabold transition-colors group-hover:text-green">
                  {festival.name}
                </span>
                <span className="mt-0.5 block text-[0.8125rem] text-bone/60">
                  {festival.state}
                </span>
              </Link>
            </li>
          ))}
        </Rail>
        <div className="relative mx-auto mt-8 flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 sm:px-8">
          <p className="max-w-md text-[0.75rem] leading-relaxed text-bone/55">
            Festival dates shift year to year. We confirm the current calendar
            on WhatsApp before you book.
          </p>
          <WaCta
            message={enquiry("I would like to plan a trip around a Northeast festival.")}
            location="b-festivals"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-bone px-6 text-[0.875rem] font-extrabold text-ink transition-colors hover:bg-sand"
          >
            <WhatsAppIcon />
            Plan around a festival
          </WaCta>
        </div>
      </section>

      {/* --- Promo banner: weddings and events. */}
      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-clay-deep text-bone lg:min-h-[24rem] lg:justify-end lg:p-10">
          <div className="relative aspect-[16/10] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
            <Image
              src="/images/fleet-events-wedding.webp"
              alt="Smarto electric cabs lined up beneath a marigold-decorated wedding gate at dusk"
              fill
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-[rgba(28,26,69,0.95)] via-[rgba(28,26,69,0.72)] via-50% to-[rgba(28,26,69,0.12)] lg:block" />
          <div className="p-7 lg:p-0">
            <p className="text-label font-extrabold text-green uppercase">Weddings &amp; events</p>
            <h2 className="mt-3 max-w-sm text-[1.75rem] leading-[1.1] lg:text-[2.125rem]">
              A wedding to move? <span className="accent">One coordinator.</span>
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <WaCta
                message={enquiry("I would like to plan transport for a wedding or event.")}
                location="b-banner-events"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-bone px-6 text-[0.875rem] font-extrabold text-ink transition-colors hover:bg-sand"
              >
                <WhatsAppIcon />
                Plan an event
              </WaCta>
              <Link
                href="/events"
                className="inline-flex min-h-12 items-center rounded-full px-5 text-[0.875rem] font-extrabold text-bone ring-1 ring-white/40 transition-colors hover:bg-white/10"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- WhatsApp: an open section on the page, not another card. */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-green/15 px-3.5 py-1.5 text-[0.75rem] font-extrabold text-green-deep">
              <WhatsAppIcon className="size-3.5" />
              No app to download
            </p>
            <h2 className="mt-4 max-w-xl text-[1.875rem] leading-[1.08] text-ink lg:text-[2.5rem]">
              Your best way to plan a trip?{" "}
              <span className="accent block">One WhatsApp message.</span>
            </h2>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-taupe">
              Tell us who&rsquo;s coming, when, and how you like to travel. We
              come back with a plan you can say yes to.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <WaCta
                message={PLAN}
                location="b-whatsapp-banner"
                className="inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-full bg-green-deep px-7 text-[0.9375rem] font-extrabold text-white shadow-[0_14px_30px_rgba(57,151,114,0.3)] transition-transform duration-150 active:scale-[0.98]"
              >
                <WhatsAppIcon />
                Start on WhatsApp
              </WaCta>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-[0.875rem] text-taupe hover:text-ink">
                or call {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          {/* The phone stands on a soft backdrop instead of inside a card. */}
          <div className="relative isolate mx-auto">
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand sm:size-[22rem]" />
            <div aria-hidden="true" className="absolute -top-2 -right-6 -z-10 size-28 rounded-full bg-green/25 blur-2xl" />
            <ChatPhone />
          </div>

          <figure className="hidden flex-col items-center gap-3 lg:flex">
            <span className="rounded-2xl bg-bone p-3 shadow-[0_18px_40px_rgba(40,37,96,0.12)] ring-1 ring-line">
              <Image src="/images/b-whatsapp-qr.svg" alt="QR code that opens a WhatsApp chat with Smarto" width={132} height={132} unoptimized />
            </span>
            <figcaption className="text-[0.75rem] text-taupe">Scan to chat</figcaption>
          </figure>
        </div>
      </section>

      <TrailFooter />
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="flex h-full min-w-0 flex-col items-start gap-3 rounded-2xl bg-bone p-4 lg:flex-row lg:items-center lg:justify-center lg:bg-transparent lg:p-0">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-green/15 text-green-deep lg:size-12">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[1.375rem] font-extrabold text-ink lg:text-[1.625rem]">{value}</span>
        <span className="mt-0.5 block text-[0.75rem] text-taupe">{label}</span>
      </span>
    </div>
  );
}

/* A line star in the line-icons style, for the rating stat. */
function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m12 3 2.7 5.5 6 .9-4.35 4.25 1 6L12 16.8l-5.35 2.85 1-6L3.3 9.4l6-.9z" />
    </svg>
  );
}

/* A hand-drawn loop around a word, PickYourTrail's signature doodle. */
function Scribble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M78 6C52 1 14 7 6 24c-7 15 17 30 58 30 38 0 53-11 50-25C111 14 86 5 58 6 38 7 22 10 16 14" />
    </svg>
  );
}

/* A hand-drawn underline, the scribble's quieter sibling. */
function Swoosh({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 11c38-7 92-10 150-6 16 1 30 3 44 6M40 14c30-3 70-4 110-1" />
    </svg>
  );
}

/* Smarto's WhatsApp greeting, drawn in CSS so it stays crisp and editable:
   the visitor's prefilled opener, then the auto-reply with every service
   and the button back to the site, as the real business account shows it. */
const GREETING_SERVICES = [
  "Airport",
  "Rentals",
  "Railway",
  "City",
  "Packages",
  "Events",
  "Flights",
  "Hotels",
];

function ChatPhone() {
  return (
    <figure className="relative mx-auto w-[17rem]">
      <div className="rounded-[2.5rem] bg-[#0f0e2b] p-2.5 shadow-[0_28px_60px_rgba(28,26,69,0.35)] ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[2rem] bg-[#ece5dd]">
          <div className="flex items-center gap-2.5 bg-clay px-4 pt-5 pb-3 text-bone">
            <span className="grid size-8 place-items-center rounded-full bg-bone">
              <Image src="/brand/smarto-cab-tigor.webp" alt="" width={360} height={141} className="h-3 w-auto" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.8125rem] font-extrabold">Smarto</span>
              <span className="block text-[0.625rem] text-bone/65">Business account</span>
            </span>
          </div>
          <div className="space-y-2.5 px-3 pt-4 pb-6 text-[0.75rem] leading-snug text-[#1f1f1f]">
            <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 pt-2 pb-1.5 shadow-sm">
              <p>Hi Smarto, I would like to plan a trip in the Northeast.</p>
              <p className="mt-0.5 text-right text-[0.5625rem] text-[#667781]">
                10:21 PM <span className="text-[#53bdeb]">✓✓</span>
              </p>
            </div>
            <div className="max-w-[92%] overflow-hidden rounded-xl rounded-tl-sm bg-white shadow-sm">
              <div className="px-3 pt-2 pb-1.5">
                <p>
                  Thank you for reaching out to Smarto: Smart People, Smart
                  Choice.
                </p>
                <p className="mt-2 leading-relaxed">
                  {GREETING_SERVICES.map((service) => `•${service}`).join(" ")}
                </p>
                <p className="mt-0.5 text-right text-[0.5625rem] text-[#667781]">10:22 PM</p>
              </div>
              <p className="flex items-center justify-center gap-1.5 border-t border-[#e9edef] py-2 text-[0.75rem] text-[#111b21]">
                <svg viewBox="0 0 24 24" fill="none" stroke="#027eb5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
                  <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </svg>
                Smarto
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        An example WhatsApp exchange: a visitor asks to plan a trip, and
        Smarto&rsquo;s greeting lists airport rides, rentals, railway drops,
        city rides, packages, events, flights and hotels.
      </figcaption>
    </figure>
  );
}

/* Brand glyphs for the social links, drawn to sit with the line icons. */
function SocialGlyph({ id, className }: { id: SocialId; className?: string }) {
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  const paths: Record<Exclude<SocialId, "instagram">, string> = {
    facebook:
      "M14 8.6V6.9c0-.8.2-1.3 1.4-1.3H17V2.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2H8.2V12h2.6v9.4H14V12h2.6l.4-3.4z",
    youtube:
      "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z",
    x: "M17.6 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.1 21H2l7.3-8.3L1.6 3H8l4.4 5.8zm-1.1 16.2h1.7L7.3 4.7H5.5z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={paths[id]} />
    </svg>
  );
}

function TrailFooter() {
  const columns = [
    {
      title: "Journeys by place",
      links: PLACES.slice(0, 5).map((p) => ({
        label: p.name,
        href: `/packages?q=${encodeURIComponent(p.name)}#journeys`,
      })),
    },
    {
      title: "Travel with Smarto",
      links: [
        { label: "Cabs & EV", href: "/cabs" },
        { label: "Flights", href: "/flights" },
        { label: "Events", href: "/events" },
        { label: "Corporate", href: "/corporate" },
        { label: "Partners", href: "/partners" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: `All ${JOURNEY_COUNT} journeys`, href: "/packages" },
        { label: "Festivals", href: "/festivals" },
        { label: "Impact", href: "/impact" },
      ],
    },
  ];

  return (
    <footer className="mt-16 bg-clay-deep text-bone lg:mt-24">
      <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 lg:pt-14">
        {/* Affiliation and social accounts, above the company description. */}
        <div className="grid gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 sm:items-end">
          <div>
            <h2 className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-bone/50 uppercase">
              Affiliated organisation
            </h2>
            <a
              href="https://netta.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-2xl bg-bone px-5 py-3.5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Image
                src="/logos/netta.webp"
                alt="NETTA, North East Travel Trade Association"
                width={868}
                height={199}
                className="h-10 w-auto sm:h-11"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="sm:justify-self-end">
            <h2 className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-bone/50 uppercase sm:text-right">
              Follow Smarto
            </h2>
            <ul className="mt-4 flex gap-2.5">
              {SOCIAL.map((account) => (
                <li key={account.id}>
                  <a
                    href={account.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-12 place-items-center rounded-full bg-white/[0.08] text-bone ring-1 ring-white/15 transition-colors duration-200 hover:bg-green hover:text-clay-deep hover:ring-green"
                  >
                    <SocialGlyph id={account.id} className="size-5" />
                    <span className="sr-only">Smarto on {account.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <Image src="/brand/smarto-wordmark-light.webp" alt={SITE.name} width={720} height={160} className="h-7 w-auto" />
            <p className="mt-5 max-w-md text-[0.875rem] leading-relaxed text-bone/65">
              Smarto is a Guwahati travel company that plans the whole trip:
              electric cabs on flat fares, flights across India, hand-picked
              hotels, and domestic and international packages, plus transport
              for companies, weddings and events. One WhatsApp chat, a team on
              call 24&times;7, and every price quoted all-in.
            </p>
            <dl className="mt-6 space-y-3 text-[0.8125rem]">
              <div>
                <dt className="sr-only">WhatsApp and calls</dt>
                <dd>
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-green">{WHATSAPP_DISPLAY}</a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="hover:text-green">{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Office</dt>
                <dd className="max-w-xs leading-relaxed text-bone/60">{SITE.address}</dd>
              </div>
            </dl>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-bone/50 uppercase">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[0.875rem] text-bone/85 transition-colors hover:text-green">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-12 border-t border-white/10 py-7 text-[0.75rem] leading-relaxed text-bone/50">
          © {new Date().getFullYear()} {SITE.legalName}. Fares and trip details
          are confirmed on WhatsApp before travel.
        </p>
      </div>
      <div aria-hidden="true" className="spark-band" />
    </footer>
  );
}
