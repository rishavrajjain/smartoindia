import Image from "next/image";

import { FestivalExplorer } from "@/components/sections/festival-explorer";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/deco";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { FESTIVALS } from "@/data/festivals";
import { IMAGES } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Northeast India festival calendar",
  description:
    "Hornbill, Bihu, Wangala, Losar, Ziro and more. Browse Northeast Indian festivals by month and plan a trip around one. Dates shift each year and are confirmed before you travel.",
  path: "/festivals",
});

export default function FestivalsPage() {
  return (
    <>
      <PageHero
        image={IMAGES.festivalsHero}
        eyebrow="Festival calendar"
        title={
          <>
            Plan the trip around{" "}
            <span className="accent">the festival</span>.
          </>
        }
        lead="December is Hornbill, April is Bihu, and something happens in most months."
        priority
        stickers={
          <>
            <Label>
              12 festivals
            </Label>
            <Label>
              Book early
            </Label>
          </>
        }
      >
        <WhatsAppLink
          message={enquiry(
            "I would like to plan a trip around a festival. Here is the one I have in mind:",
          )}
          location="festivals-hero"
          size="lg"
        >
          Plan a festival trip
        </WhatsAppLink>
      </PageHero>

      {/* Timing caveat — prominent, because these dates genuinely move. */}
      <Container width="wide" className="pt-12 lg:pt-16">
        <div className="flex gap-4 rounded-sm border border-line-strong bg-sand p-5">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-clay-deep"
          >
            <circle cx="10" cy="10" r="7.5" />
            <path d="M10 6.5v4.5M10 13.6v.2" />
          </svg>
          <p className="text-[0.9375rem] leading-relaxed text-ink">
            <span className="font-extrabold text-clay-deep">
              Dates move every year.
            </span>{" "}
            Several of these follow lunar or agricultural calendars rather than
            fixed dates, and state announcements often come only a few months
            ahead. The months below are indicative. We confirm exact dates with
            you on WhatsApp before anything is booked.
          </p>
        </div>
      </Container>

      <Container width="wide" className="pt-12 lg:pt-16">
        <SectionHeading
          eyebrow="Browse by month"
          title="What happens when"
          lead="Quiet months are shown too. Knowing July is empty helps."
        />
        <div className="mt-9">
          <FestivalExplorer festivals={FESTIVALS} />
        </div>
      </Container>

      {/* Etiquette */}
      <section className="relative mt-20 overflow-hidden bg-ink py-16 lg:mt-28 lg:py-24">
        <Container width="wide" className="relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Going well"
                title="These are observances, not performances"
                tone="dark"
                lead="A community doing something for itself. Visitors are welcome at most of it, and the difference is not always signposted."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Ask before photographing anyone close up, especially at religious observances.",
                  "Dress for a monastery rather than a viewpoint when the day includes one.",
                  "Some grounds and ceremonies are not open to visitors. Your driver or guide will know which.",
                  "Buy from the craft stalls. It is the most direct way money reaches the people performing.",
                ].map((line) => (
                  <li key={line} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ochre"
                    />
                    <span className="leading-relaxed text-bone/75">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 self-start">
              <div className="overflow-hidden relative aspect-[3/4] overflow-hidden bg-clay-deep">
                <Image
                  src={IMAGES.festivalTextiles.src}
                  alt={IMAGES.festivalTextiles.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="overflow-hidden relative mt-8 aspect-[3/4] overflow-hidden bg-clay-deep">
                <Image
                  src={IMAGES.festivalDrums.src}
                  alt={IMAGES.festivalDrums.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container width="wide" className="pt-20 lg:pt-28">
        <div className="border-t border-line bg-sand px-6 py-16 text-center sm:px-12 lg:py-20">
          <SectionHeading
            align="center"
            eyebrow="Book early"
            title="Festival weeks fill months ahead"
            lead="Kohima in December is booked long before the dates are announced. Start now, not in October."
          />
          <div className="mt-9 flex justify-center">
            <WhatsAppLink
              message={enquiry(
                "I would like to plan a trip around a festival. Here is the festival and my rough dates:",
              )}
              location="festivals-hero"
              size="lg"
            >
              Plan a festival trip
            </WhatsAppLink>
          </div>
        </div>
      </Container>
    </>
  );
}
