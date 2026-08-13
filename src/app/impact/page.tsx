import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/deco";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { IMAGES } from "@/data/images";
import { IMPACT_COMMITMENTS } from "@/data/impact";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Impact and responsible travel",
  description:
    "How Smarto tries to keep its footprint small and its spending local across Northeast India: electric vehicles where they work, village stays paid directly, and honest limits.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <>
      <PageHero
        image={IMAGES.impactHero}
        eyebrow="Impact"
        title={
          <>
            Travelling here{" "}
            <span className="accent">without wearing it out</span>.
          </>
        }
        lead="Tourism arrived here recently and fast. This is how we try to be a useful part of it."
        priority
        stickers={
          <>
            <Label>
              No invented numbers
            </Label>
          </>
        }
      />

      <Container width="narrow" className="pt-16 lg:pt-24">
        <p className="text-xl leading-relaxed text-ink">
          We would rather say less and mean it. These are commitments, not
          achievements. We have not measured most of them properly yet.
        </p>
        <p className="mt-5 leading-relaxed text-taupe">
          No percentages, no carbon figures. When we have measured something we
          will publish it and say how. Until then an invented statistic would be
          worse than silence.
        </p>
      </Container>

      <Container width="wide" className="pt-14 lg:pt-20">
        <ul className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {IMPACT_COMMITMENTS.map((commitment, index) => (
            <li key={commitment.id} className="reveal border-t border-line pt-6">
              <span
                aria-hidden="true"
                className="font-display text-2xl font-semibold text-terracotta tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 font-sans text-[1.0625rem] font-semibold text-ink">
                {commitment.title}
              </h2>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-taupe">
                {commitment.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Forest band */}
      <section className="relative mt-20 overflow-hidden bg-clay py-16 lg:mt-28 lg:py-24">
        <Container width="wide" className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden relative aspect-[4/3] overflow-hidden bg-clay-deep">
              <Image
                src={IMAGES.impactForest.src}
                alt={IMAGES.impactForest.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 46vw, calc(100vw - 2.5rem)"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="The honest part"
                title="A private vehicle has a footprint"
                tone="dark"
                lead="Driving two people 1,600km through the hills uses fuel, and no framing changes that. Here is what we do about it."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Shorter routes with fewer transfer days, because the driving itself is most of the cost.",
                  "Vehicles filled properly rather than running half empty across a group.",
                  "Electric on the legs where charging genuinely exists.",
                  "Saying no to itineraries that are mostly time in a car.",
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
          </div>
        </Container>
      </section>

      <Container width="narrow" className="pt-16 lg:pt-24">
        <div className="border-t border-line bg-sand p-6 lg:p-8">
          <h2 className="text-[1.75rem] text-ink">
            Hold us to this
          </h2>
          <p className="mt-3 leading-relaxed text-taupe">
            If something here does not match your trip, tell us. That is more
            useful than a review, and the only way any of it stays true.
          </p>
          <div className="mt-6">
            <WhatsAppLink
              message={enquiry(
                "I have feedback about a trip and how it matched what your impact page says.",
              )}
              location="impact-cta"
              tone="quiet"
              size="md"
            >
              Send us feedback
            </WhatsAppLink>
          </div>
        </div>
      </Container>
    </>
  );
}
