import Image from "next/image";
import Link from "next/link";

import { CabQuickServices } from "@/components/sections/cab-quick-services";
import { FleetRail, OutstationRail, ServiceRail } from "@/components/sections/cab-sections";
import { ReviewStrip } from "@/components/sections/review-strip";
import { TrustAndFaqs } from "@/components/sections/trust-and-faqs";
import { Container } from "@/components/ui/container";
import { ArrowIcon, TagIcon } from "@/components/ui/line-icons";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { CAB_FAQS } from "@/data/faqs";
import { CAB_REVIEW_LINES } from "@/data/reviews";
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

const NUMBERS = [
  { n: "100%", l: "Electric fleet" },
  { n: "₹0", l: "Surge, ever" },
  { n: "1st", l: "With flat pricing in Guwahati" },
  { n: "24×7", l: "On a real phone" },
];

const STEPS = [
  {
    title: "Tell us where you're going",
    body: "WhatsApp or the site. No app.",
  },
  {
    title: "See your flat fare",
    body: "Before you commit to anything.",
  },
  {
    title: "Ride. Pay exactly what you saw",
    body: "No meter, no rounding up.",
  },
];

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
              <span>
                <span className="block text-[0.9375rem] leading-snug font-extrabold text-ink">
                  Flat ₹399
                </span>
                <span className="block text-[0.75rem] text-taupe">
                  Railway station drop
                </span>
              </span>
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

      {/* ——— The numbers we're willing to print. */}
      <div className="mt-16 bg-sand py-14 lg:mt-20">
        <Container width="wide">
          <p className="text-label font-extrabold text-clay uppercase">
            Since 2023
          </p>
          <h2 className="mt-4 text-[1.875rem] leading-[1.08] sm:text-[2.25rem]">
            The numbers we&rsquo;re{" "}
            <span className="accent">willing to print.</span>
          </h2>
          <dl className="reveal mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {NUMBERS.map((item, index) => (
              <div
                key={item.n}
                className={`rounded-2xl px-5 py-7 transition-transform duration-[260ms] hover:-translate-y-1 ${
                  ["bg-clay-soft", "bg-green-deep/10", "bg-sand", "bg-clay-soft"][index]
                }`}
              >
                <dd
                  className={`text-[2.375rem] leading-none font-extrabold tracking-[-0.035em] ${
                    index === 1 ? "text-green-deep" : "text-ink"
                  }`}
                >
                  {item.n}
                </dd>
                <dt className="mt-2.5 text-[0.78125rem] leading-snug font-extrabold text-taupe">
                  {item.l}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* ——— Booking, start to finish. */}
      <Container width="narrow" className="pt-16 lg:pt-20">
        <p className="text-label font-extrabold text-clay uppercase">
          Booking, start to finish
        </p>
        <h2 className="mt-4 text-[1.875rem] leading-[1.08] sm:text-[2.25rem]">
          Three steps.{" "}
          <span className="accent">No surprises in any of them.</span>
        </h2>
        <ol className="relative mt-9">
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-4 left-[0.875rem] border-l-2 border-dashed border-line-strong"
          />
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="reveal relative grid grid-cols-[1.75rem_1fr] gap-x-4 pb-8 last:pb-0 sm:gap-x-5"
            >
              <span
                className={`z-10 inline-flex size-7 items-center justify-center self-start rounded-full text-[0.75rem] font-extrabold text-bone tabular-nums ${
                  index === STEPS.length - 1 ? "bg-green-deep" : "bg-ink"
                }`}
              >
                {index + 1}
              </span>
              <div className="pt-0.5">
                <h3 className="text-[1.03125rem] leading-snug font-extrabold">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-[26rem] text-[0.875rem] leading-relaxed text-taupe">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      {/* --- Why Smarto, the Google reviews, and this page's questions. */}
      <TrustAndFaqs faqs={CAB_FAQS} location="cabs-faq" className="pt-16 lg:pt-24" />

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

      {/* ——— The promise, to close. */}
      <Container width="wide" className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <span aria-hidden="true" className="spark-fill block h-[3px] w-16 rounded-full" />
        <p className="mt-6 text-label font-extrabold text-clay uppercase">
          Cabs · Guwahati
        </p>
        <h2 className="mt-5 max-w-3xl text-[2.25rem] leading-[1.05] tracking-[-0.015em] sm:text-[3rem] lg:text-[3.75rem]">
          The price you&rsquo;re quoted{" "}
          <span className="accent block">is the price you pay.</span>
        </h2>
        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-taupe">
            Flat fares. No surge. No bargaining. All-electric cabs across
            Guwahati, 24×7.
          </p>
          <a
            href="#book"
            className="inline-flex min-h-[3.25rem] shrink-0 items-center gap-2.5 self-start rounded-full bg-green-deep px-6 text-[0.9375rem] font-extrabold text-white transition-transform duration-150 active:scale-[0.985] sm:self-auto"
          >
            Search cabs
            <ArrowIcon className="size-4 -rotate-90" />
          </a>
        </div>
      </Container>

      {/* ——— The cabs dock, on phones. */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div
          className="flex items-center justify-between gap-3 bg-ink px-4 pt-3.5"
          style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))" }}
        >
          <p className="text-[0.6875rem] leading-snug text-bone/60">
            <span className="block text-[0.90625rem] font-extrabold text-bone">
              Flat ₹399
            </span>
            Railway station drop
          </p>
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
      {/* Clears the fixed dock so the footer's last line is never hidden. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  );
}
