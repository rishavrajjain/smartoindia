import Image from "next/image";

import { HotelStays } from "@/components/sections/hotel-stays";
import { TrustAndFaqs } from "@/components/sections/trust-and-faqs";
import { Container } from "@/components/ui/container";
import { WaCta } from "@/components/ui/wa-cta";
import { HOTEL_FAQS } from "@/data/faqs";
import { STAY_CARDS } from "@/data/hotels";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

import { HotelPlanner } from "./hotel-planner";

export const metadata = pageMetadata({
  title: "Hotels in any city, for every budget",
  description:
    "Five-star to budget stays anywhere in India and abroad, picked and booked by Smarto on WhatsApp, with an airport ride or a whole trip if you want one.",
  path: "/hotels",
});

/*
 * The hotels page. There is no hotel inventory behind it: the planner
 * composes a WhatsApp request, and the desk replies with options and rates.
 * Named hotels appear only where Manav's catalog names them (Shillong and
 * Cherrapunjee); everywhere else is an open door.
 */

const ABROAD = [
  { name: "Bali", image: "/images/intl-bali.webp" },
  { name: "Dubai", image: "/images/intl-middle-east.webp" },
  { name: "Thailand", image: "/images/intl-southeast-asia.webp" },
  { name: "Singapore", image: "/images/intl-singapore.webp" },
  { name: "Maldives", image: "/images/intl-maldives.webp" },
  { name: "Europe", image: "/images/intl-europe.webp" },
];

const INDIA = ["Guwahati", "Kaziranga", "Tawang", "Delhi", "Mumbai", "Bengaluru", "Kolkata", "Goa", "Jaipur"];

const STEPS = [
  { title: "Tell us the stay", body: "City, dates, guests and the kind of place you like." },
  { title: "Pick from a shortlist", body: "A few options with their rates, on WhatsApp." },
  { title: "We book it", body: "Confirmed with you first, and an airport ride if you want one." },
];

export default function HotelsPage() {
  return (
    <>
      {/* --- Heading and planner, beside the photograph. */}
      <Container width="wide" className="pt-8 pb-4 lg:pt-12">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-label font-extrabold text-clay uppercase">Hotels</p>
            <h1 className="mt-3 text-[2.25rem] leading-[1.05] sm:text-[2.75rem] lg:text-[3.25rem]">
              Stays for every budget, <span className="accent">anywhere you go.</span>
            </h1>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-taupe">
              Five-star to easy on the wallet, across India and abroad. Tell us
              the stay and we send a shortlist on WhatsApp.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="rounded-[2.25rem] bg-[linear-gradient(135deg,#282560_0%,#7b3f7e_45%,#c44868_100%)] p-[3px] lg:sticky lg:top-24">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.125rem] bg-sand lg:aspect-auto lg:h-[min(40rem,calc(100svh-8rem))]">
                <Image
                  src="/images/hotels-hero.webp"
                  alt="A hotel balcony at dawn with tea on a small table, looking over misty pine hills"
                  fill
                  priority
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                />
                <span aria-hidden="true" className="photo-scrim absolute inset-0 opacity-70" />
                <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 sm:inset-x-5 sm:bottom-5">
                  {["Any city, India & abroad", "5-star to budget", "Booked on WhatsApp"].map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full bg-bone/92 px-3.5 py-1.5 text-[0.75rem] font-extrabold text-ink backdrop-blur-sm"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:row-start-2">
            <HotelPlanner />
          </div>
        </div>
      </Container>

      {/* --- Popular stays from the catalog. */}
      <section aria-labelledby="popular-stays" className="pt-16 lg:pt-24">
        <Container width="wide">
          <p className="text-label font-extrabold text-clay uppercase">Popular stays</p>
          <h2 id="popular-stays" className="mt-3 text-[1.875rem] leading-[1.08] lg:text-[2.5rem]">
            Favourites in <span className="accent">Shillong and Cherrapunjee</span>
          </h2>
        </Container>
        <HotelStays stays={STAY_CARDS} className="mt-7" />
      </section>

      {/* --- Everywhere else. */}
      <section aria-labelledby="beyond" className="pt-16 lg:pt-24">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="text-label font-extrabold text-clay uppercase">Beyond the Northeast</p>
              <h2 id="beyond" className="mt-3 text-[1.875rem] leading-[1.08] lg:text-[2.5rem]">
                Hotels abroad, <span className="accent">and across India</span>
              </h2>
            </div>
            <p className="max-w-sm text-[0.875rem] leading-relaxed text-taupe">
              Tap a place and we start the shortlist. Anywhere not listed, just
              tell us.
            </p>
          </div>

          <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {ABROAD.map((place) => (
              <li key={place.name}>
                <WaCta
                  message={enquiry(`I am looking for a hotel in ${place.name}. My dates and budget are:`)}
                  location="hotels-city"
                  subject={place.name}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand"
                >
                  <Image
                    src={place.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 14vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="photo-scrim absolute inset-0" />
                  <span className="absolute inset-x-0 bottom-0 p-3.5">
                    <span className="block text-[0.625rem] font-extrabold tracking-[0.18em] text-green uppercase">
                      Hotels in
                    </span>
                    <span className="block text-[1.25rem] leading-tight font-extrabold text-bone">
                      {place.name}
                    </span>
                  </span>
                </WaCta>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[0.8125rem] font-extrabold text-ink">Across India:</span>
            {INDIA.map((city) => (
              <WaCta
                key={city}
                message={enquiry(`I am looking for a hotel in ${city}. My dates and budget are:`)}
                location="hotels-city"
                subject={city}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-sand px-4 text-[0.8125rem] text-ink transition-colors hover:bg-ink hover:text-bone"
              >
                {city}
              </WaCta>
            ))}
          </div>
        </Container>
      </section>

      {/* --- How it works. */}
      <Container width="wide" className="pt-16 lg:pt-24">
        <h2 className="text-[1.75rem] leading-tight lg:text-[2.25rem]">
          How booking <span className="accent">works</span>
        </h2>
        <ol className="mt-7 grid gap-3 sm:grid-cols-3 lg:gap-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-[1.5rem] bg-sand p-5 lg:p-6">
              <span className="grid size-9 place-items-center rounded-full bg-ink text-[0.8125rem] font-extrabold text-bone tabular-nums">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[1.0625rem] font-extrabold text-ink">{step.title}</h3>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-taupe">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <TrustAndFaqs faqs={HOTEL_FAQS} location="hotels-faq" className="pt-16 lg:pt-24" />
    </>
  );
}
