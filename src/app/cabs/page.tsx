import Image from "next/image";
import Link from "next/link";

import { CabQuickServices } from "@/components/sections/cab-quick-services";
import { FleetRail, OutstationRail, ServiceRail } from "@/components/sections/cab-sections";
import { ReviewStrip } from "@/components/sections/review-strip";
import { TrustAndFaqs } from "@/components/sections/trust-and-faqs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/deco";
import { ArrowIcon, TagIcon } from "@/components/ui/line-icons";
import { RotatingFare } from "@/components/ui/rotating-fare";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { CAB_SERVICE_CARDS } from "@/data/cabs";
import { CAB_FAQS } from "@/data/faqs";
import { CAB_REVIEWS, CAB_REVIEW_LINES, GOOGLE_RATING } from "@/data/reviews";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Cabs in Guwahati: airport, local and outstation taxis on flat fares",
  description:
    "Clean, premium cabs in Guwahati on flat fares: airport transfers, railway station rides, hourly rentals and outstation cabs to Shillong, Cherrapunji, Kaziranga, Tawang and Dibrugarh. Tigor EV, Dzire, Ertiga, Innova Crysta, Tempo Traveller and Urbania, booked on WhatsApp.",
  path: "/cabs",
});

/*
 * The cabs page, built from Manav's mobile mockup (smarto-cabs-mobile.html)
 * and laid out properly for desktop: booking card beside the photo,
 * services and numbers in grids. His copy,
 * lightly edited. The mockup's placeholder stat cells (rides completed,
 * CO2 avoided) stay out until real figures arrive; the reviews are real,
 * from Smarto's Google profile (src/data/reviews.ts).
 */

/* What every cab ride comes with. Each line restates something the page or
   the Google profile already backs: 24x7 support, flat fares, the reviews'
   "clean and premium cars", flight tracking, and electric city cabs. */
const PROMISES = [
  { big: "24×7", tag: "support", line: "A real person on the phone, day and night." },
  { big: "₹0", tag: "surge", line: "Affordable flat fares, in the rain or at rush hour." },
  { big: "Clean", tag: "& premium", line: "Spotless, air-conditioned cabs on every ride." },
  { big: "On time", tag: "pickups", line: "We follow your flight and plan around your train." },
  { big: GOOGLE_RATING.score, tag: "on Google", line: `Rated by riders across ${GOOGLE_RATING.count} reviews.`, star: true },
  { big: "EV", tag: "city cabs", line: "Electric cabs across Guwahati: quiet, clean and cool." },
];

/* The photo badge and phone dock cycle through every service's starting fare. */
const FARES = CAB_SERVICE_CARDS.filter((card) => card.fare).map((card) => ({
  title: `From ${card.fare}${card.unit ?? ""}`,
  line: card.name,
}));

export default function CabsPage() {

  return (
    <>
      {/* ——— Hero: straight into booking. */}
      <CabQuickServices
        eyebrow="Cabs"
        title={
          <>
            Search <span className="accent">cabs</span>
          </>
        }
        sub="Flat fares on all-electric cabs across Guwahati, 24×7. Pick a ride and your fare comes back on WhatsApp."
        aside={
          <div className="relative">
            <div className="rounded-[2.1875rem] bg-[linear-gradient(135deg,#282560_0%,#7b3f7e_45%,#c44868_100%)] p-[3px]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand">
                <Image
                  src="/images/fleet-cabs-hero.webp"
                  alt="A Smarto electric cab at a misty hill-road viewpoint, rear door open and travel bags beside it"
                  fill
                  priority
                  sizes="(min-width: 1280px) 480px, 416px"
                  className="zoom-slow object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 ring-1 ring-line motion-safe:animate-cab-float sm:left-7">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-green-deep/10">
                <TagIcon className="size-5 text-green-deep" />
              </span>
              <RotatingFare
                items={FARES}
                className="min-w-[9.5rem]"
                titleClassName="text-[0.9375rem] leading-snug font-extrabold text-ink"
                lineClassName="text-[0.75rem] text-taupe"
              />
            </div>
          </div>
        }
      />

      {/* ——— What riders say about the cabs, drifting past. */}
      <ReviewStrip reviews={CAB_REVIEW_LINES} label="What riders say about our cabs" />

      {/* ——— The cars, the rides and the routes: three rails. */}
      <FleetRail className="pt-16 lg:pt-24" />
      <ServiceRail className="mt-16 lg:mt-24" />
      <OutstationRail className="pt-16 lg:pt-24" />

      {/* ——— What every cab ride comes with. */}
      <section aria-labelledby="promises-title" className="mt-16 bg-sand py-14 lg:mt-24 lg:py-20">
        <Container width="wide">
          <Eyebrow>Smarto Cabs</Eyebrow>
          <h2 id="promises-title" className="mt-3 text-[1.875rem] leading-[1.08] sm:text-[2.25rem] lg:text-[2.5rem]">
            What every ride <span className="accent">comes with.</span>
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {PROMISES.map((item, index) => {
              const dark = index === 1;
              return (
                <li
                  key={item.tag}
                  className={`rounded-[1.5rem] px-4 py-6 transition-transform duration-[260ms] hover:-translate-y-1 sm:px-6 sm:py-7 ${
                    dark ? "bg-ink text-bone" : "bg-bone text-ink"
                  }`}
                >
                  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[1.875rem] leading-none font-extrabold tracking-[-0.03em] sm:text-[2.5rem] ${
                        dark ? "text-green" : "text-ink"
                      }`}
                    >
                      {item.big}
                      {item.star && (
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5 text-green-deep sm:size-6">
                          <path d="m12 3 2.7 5.5 6 .9-4.35 4.25 1 6L12 16.8l-5.35 2.85 1-6L3.3 9.4l6-.9z" />
                        </svg>
                      )}
                    </span>
                    <span className={`text-[0.875rem] font-extrabold ${dark ? "text-bone/80" : "text-taupe"}`}>
                      {item.tag}
                    </span>
                  </p>
                  <p className={`mt-3 text-[0.8125rem] leading-snug ${dark ? "text-bone/70" : "text-taupe"}`}>
                    {item.line}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* --- Reviews about the rides, and this page's questions. */}
      <TrustAndFaqs faqs={CAB_FAQS} location="cabs-faq" why={false} reviews={CAB_REVIEWS} className="pt-16 lg:pt-24" />

      {/* ——— Beyond the city. */}
      <Container width="wide" className="pt-16 lg:pt-20">
        <div className="bg-ink px-6 py-14 text-bone sm:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-label font-extrabold text-green uppercase">
                Beyond the city
              </p>
              <h2 className="mt-4 text-[1.875rem] leading-[1.08] text-bone sm:text-[2.25rem]">
                Going further than Guwahati?{" "}
                <span className="accent block">Shillong, in a quiet car.</span>
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-bone/70">
                Cars, hotels and flights together, all-in. Nothing added at
                the end.
              </p>
            </div>
            <Link
              href="/packages"
              className="inline-flex min-h-[3.25rem] shrink-0 items-center gap-2.5 self-start rounded-full border border-white/40 px-6 text-[0.875rem] font-extrabold text-bone transition-colors hover:bg-white/8 lg:self-center"
            >
              See outstation packages
              <ArrowIcon className="size-4" />
            </Link>
          </div>
        </div>
      </Container>

      {/* ——— The cabs dock, on phones. */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div
          className="flex items-center justify-between gap-3 bg-ink px-4 pt-3.5"
          style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))" }}
        >
          <RotatingFare
            items={FARES}
            className="min-w-0"
            titleClassName="text-[0.90625rem] font-extrabold text-bone"
            lineClassName="text-[0.6875rem] leading-snug text-bone/60"
          />
          <WaCta
            message={enquiry("I need a cab in Guwahati.")}
            location="cabs-dock"
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-green-deep px-5 text-[0.875rem] font-extrabold text-white"
          >
            <WhatsAppIcon />
            Book on WhatsApp
          </WaCta>
        </div>
        <div aria-hidden="true" className="spark-band" />
      </div>
    </>
  );
}
