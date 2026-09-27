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
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
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

const MARQUEE = [
  "#TravelledWell",
  "No surge, ever",
  "Zero cancellation",
  "Electric in the city",
  `${JOURNEY_COUNT} planned journeys`,
  "Planned on WhatsApp",
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

      {/* --- The green band. */}
      <div className="overflow-hidden bg-green py-3.5 text-clay-deep">
        <ul className="flex w-max motion-safe:animate-marquee items-center">
          {[0, 1].map((copy) =>
            MARQUEE.map((item) => (
              <li
                key={`${copy}-${item}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex items-center gap-8 pr-8 text-[1.0625rem] font-extrabold whitespace-nowrap lg:text-[1.25rem]"
              >
                {item}
                <BoltIcon className="size-4 text-clay-deep/60" />
              </li>
            )),
          )}
        </ul>
      </div>

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

      {/* --- Promo banners. */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pt-14 sm:px-8 lg:grid-cols-2 lg:gap-6 lg:pt-20">
        <div className="relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-clay-deep text-bone lg:min-h-[24rem] lg:justify-end lg:p-10">
          <div className="relative aspect-[16/10] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
            <Image
              src="/images/fleet-cabs-hero.webp"
              alt="A Smarto electric cab at a misty hill-road viewpoint, rear door open and travel bags beside it"
              fill
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-[rgba(28,26,69,0.95)] via-[rgba(28,26,69,0.72)] via-50% to-[rgba(28,26,69,0.12)] lg:block" />
          <div className="p-7 lg:p-0">
            <p className="text-label font-extrabold text-green uppercase">Cabs · Guwahati</p>
            <h2 className="mt-3 max-w-sm text-[1.75rem] leading-[1.1] lg:text-[2.125rem]">
              Rain, rush hour or 2 AM. <span className="accent">Same fare.</span>
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <WaCta
                message={enquiry("I would like to book a cab in Guwahati.")}
                location="b-banner-cabs"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-green-deep px-6 text-[0.875rem] font-extrabold text-white"
              >
                <WhatsAppIcon />
                Book a cab
              </WaCta>
              <Link
                href="/cabs"
                className="inline-flex min-h-12 items-center rounded-full px-5 text-[0.875rem] font-extrabold text-bone ring-1 ring-white/40 transition-colors hover:bg-white/10"
              >
                See all fares
              </Link>
            </div>
          </div>
        </div>
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

      {/* --- Why travellers trust Smarto: three photographs. */}
      <section className="relative mt-16 overflow-hidden bg-sand py-14 lg:mt-24 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-[30rem] left-1/2 h-[46rem] w-[90rem] -translate-x-1/2 rounded-[50%] bg-bone/80" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-center text-[1.75rem] leading-tight lg:text-[2.25rem]">
            Travel that <span className="accent">just works</span>
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-8">
            {[
              {
                title: "Planned day by day",
                line: "Every journey is printed with its drive times and stays.",
                src: "/images/fleet-hero-passes.webp",
                alt: "A Smarto cab on a high mountain road under prayer flags, snow peaks behind",
              },
              {
                title: "Electric in the city",
                line: "Guwahati rides on an EV fleet, on a flat fare.",
                src: "/images/fleet-corporate-charging.webp",
                alt: "A row of Smarto electric cabs charging at an office campus at dusk",
              },
              {
                title: "One WhatsApp thread",
                line: "Cars, hotels and permits sorted in one conversation.",
                src: "/images/fleet-cabs-airport.webp",
                alt: "A Smarto electric cab at the airport departures kerb at dawn, a suitcase beside it",
              },
            ].map((card) => (
              <li key={card.title} className="text-center">
                <span className="relative block aspect-[16/9] overflow-hidden rounded-[1.5rem] ring-4 ring-bone shadow-[0_18px_40px_rgba(40,37,96,0.14)] sm:aspect-[4/3]">
                  <Image src={card.src} alt={card.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </span>
                <h3 className="mt-5 text-[1.25rem] font-extrabold text-ink">{card.title}</h3>
                <p className="mx-auto mt-1 max-w-xs text-[0.875rem] leading-relaxed text-taupe">
                  {card.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- The WhatsApp banner (PickYourTrail's app download). */}
      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-clay-deep px-6 pt-10 text-bone sm:px-10 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center lg:gap-12 lg:px-14 lg:pt-0">
          <div aria-hidden="true" className="spark-glow absolute -top-24 -left-20 -z-10 size-80" />
          <div aria-hidden="true" className="absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-green/15 blur-3xl" />
          <div className="lg:py-14">
            <p className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-[0.75rem] font-extrabold text-green ring-1 ring-white/15">
              No app to download
            </p>
            <h2 className="mt-4 max-w-md text-[1.875rem] leading-[1.08] lg:text-[2.5rem]">
              Your best way to plan a trip?{" "}
              <span className="accent">One WhatsApp message.</span>
            </h2>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-bone/70">
              Tell us who&rsquo;s coming, when, and how you like to travel. We
              come back with a plan you can say yes to.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <WaCta
                message={PLAN}
                location="b-whatsapp-banner"
                className="inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-full bg-green-deep px-7 text-[0.9375rem] font-extrabold text-white transition-transform duration-150 active:scale-[0.98]"
              >
                <WhatsAppIcon />
                Start on WhatsApp
              </WaCta>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-[0.875rem] text-bone/75 hover:text-bone">
                or call {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          <ChatPhone />

          <figure className="hidden flex-col items-center gap-3 lg:flex">
            <span className="rounded-2xl bg-bone p-3 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
              <Image src="/images/b-whatsapp-qr.svg" alt="QR code that opens a WhatsApp chat with Smarto" width={132} height={132} unoptimized />
            </span>
            <figcaption className="text-[0.75rem] text-bone/65">Scan to chat</figcaption>
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

/* An example exchange, drawn in CSS so it stays crisp and editable. */
function ChatPhone() {
  return (
    <figure className="relative mx-auto mt-10 w-[16.5rem] lg:mt-12 lg:self-end">
      <div className="rounded-t-[2.5rem] bg-[#0f0e2b] p-2.5 pb-0 shadow-[0_-10px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <div className="overflow-hidden rounded-t-[2rem] bg-[#ece5dd]">
          <div className="flex items-center gap-2.5 bg-clay px-4 pt-5 pb-3 text-bone">
            <span className="grid size-8 place-items-center rounded-full bg-bone">
              <Image src="/brand/smarto-cab-tigor.webp" alt="" width={360} height={141} className="h-3 w-auto" />
            </span>
            <span className="text-[0.8125rem] font-extrabold">Smarto</span>
          </div>
          <div className="space-y-2.5 px-3 pt-4 pb-6 text-[0.75rem] leading-snug text-[#1f1f1f]">
            <p className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 shadow-sm">
              Hi Smarto, five days in Meghalaya with my parents in November.
              Something gentle?
            </p>
            <p className="max-w-[88%] rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
              November is a lovely window. Slow Meghalaya is five nights at an
              easy pace. Shall I send the day by day?
            </p>
            <p className="ml-auto max-w-[40%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-right shadow-sm">
              Yes please!
            </p>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">An example WhatsApp conversation</figcaption>
    </figure>
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
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <Image src="/brand/smarto-wordmark-light.webp" alt={SITE.name} width={720} height={160} className="h-7 w-auto" />
            <p className="mt-5 max-w-md text-[0.875rem] leading-relaxed text-bone/65">
              Smarto is a Guwahati travel and mobility company. We run electric
              cabs on flat fares across the city and {JOURNEY_COUNT} planned
              road journeys through Assam, Meghalaya and Arunachal Pradesh, all
              arranged on WhatsApp. No surge pricing, zero cancellation.
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
