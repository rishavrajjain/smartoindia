import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/deco";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { CAB_SERVICES, VEHICLE_CLASSES } from "@/data/cabs";
import { IMAGES } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";
import type { CabService } from "@/types";

export const metadata = pageMetadata({
  title: "Cabs, airport transfers, and EV hire",
  description:
    "Airport pickups, local hire, outstation runs, multi-day tours, and electric vehicles across Assam, Meghalaya, and the wider Northeast. Send your route on WhatsApp for a quote.",
  path: "/cabs",
});

export default function CabsPage() {
  return (
    <>
      <PageHero
        image={IMAGES.cabsHero}
        eyebrow="Cabs & EV fleet"
        title={
          <>
            A car, a driver, and{" "}
            <span className="accent">someone who answers</span>.
          </>
        }
        lead="Airport runs at 4am, school drops for a month, or two weeks across three states."
        priority
        stickers={
          <>
            <Label>
              EV available
            </Label>
            <Label>
              6 airports
            </Label>
          </>
        }
      >
        <WhatsAppLink
          message={enquiry(
            "I need a cab. Here is my route, date, and number of passengers:",
          )}
          location="cabs-hero"
          size="lg"
        >
          Get a quote on WhatsApp
        </WhatsAppLink>
      </PageHero>

      <Container width="wide" className="pt-16 lg:pt-24">
        <SectionHeading
          eyebrow="What we run"
          title="Six ways people use us"
          lead="Same vehicles, same drivers. Only the length changes."
        />

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAB_SERVICES.map((service) => (
            <li key={service.id} className="reveal">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>

      {/* EV section */}
      <section className="relative mt-20 overflow-hidden bg-clay py-16 lg:mt-28 lg:py-24">
        <Container width="wide" className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Electric vehicles"
                title="Electric where the range maths works"
                tone="dark"
                lead="Great for city stops and shorter legs, and much nicer to spend a day in. Not the right answer for Tawang."
              />
              <p className="mt-5 leading-relaxed text-bone/75">
                Charging outside the bigger towns is still thin. Send us a route
                and we will say honestly whether an EV suits it.
              </p>
              <div className="mt-8">
                <WhatsAppLink
                  message={enquiry(
                    "I would like to hire an electric vehicle. Here is my route:",
                  )}
                  location="cabs-fleet"
                  tone="onDark"
                  size="md"
                >
                  Ask about EV hire
                </WhatsAppLink>
              </div>
            </div>
            <div className="overflow-hidden relative aspect-[4/3] overflow-hidden bg-clay-deep">
              <Image
                src={IMAGES.cabsEv.src}
                alt={IMAGES.cabsEv.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 46vw, calc(100vw - 2.5rem)"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Fleet */}
      <Container width="wide" className="pt-16 lg:pt-24">
        <SectionHeading
          eyebrow="Vehicle classes"
          title="What you will actually be sitting in"
          lead="Matched to the road and the luggage, not to a price tier."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VEHICLE_CLASSES.map((vehicle) => (
            <li
              key={vehicle.id}
              className="flex h-full flex-col border-t border-line pt-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-sans text-base font-semibold text-ink">
                  {vehicle.name}
                </h3>
                {vehicle.electric && (
                  <span className="shrink-0 border border-clay/40 bg-clay-soft px-2.5 py-1 text-label font-medium text-clay uppercase">
                    Electric
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-label font-medium text-taupe uppercase">
                {vehicle.seats}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-taupe">
                {vehicle.description}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-taupe">
          Models and availability vary by city and date. We confirm the exact
          vehicle when we quote, not when you are standing at the kerb.
        </p>
      </Container>

      {/* CTA */}
      <Container width="wide" className="pt-20 lg:pt-28">
        <div className="border-t border-line bg-sand px-6 py-16 text-center sm:px-12 lg:py-20">
          <SectionHeading
            align="center"
            eyebrow="Ready when you are"
            title="Send us the route"
            lead="Pickup, drop, date, time, how many of you. That is all we need."
          />
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppLink
              message={enquiry(
                "I need an airport transfer. Here are my flight details:",
              )}
              location="cabs-service"
              subject="airport-transfers"
              size="lg"
            >
              Airport transfer
            </WhatsAppLink>
            <WhatsAppLink
              message={enquiry(
                "I need an outstation cab. Here is my route and date:",
              )}
              location="cabs-service"
              subject="outstation"
              tone="quiet"
              size="lg"
            >
              Outstation trip
            </WhatsAppLink>
          </div>
        </div>
      </Container>
    </>
  );
}

function ServiceCard({ service }: { service: CabService }) {
  return (
    <article className="group flex h-full flex-col border-t border-line pt-5">
      {service.image && (
        <div className="relative aspect-[3/2] overflow-hidden bg-sand">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, calc(100vw - 2.5rem)"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.375rem] leading-tight text-ink">{service.name}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-taupe">
          {service.summary}
        </p>

        <ul className="mt-4 space-y-2">
          {service.details.map((detail) => (
            <li key={detail} className="flex gap-2.5 text-sm leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-clay"
              />
              <span className="text-taupe">{detail}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.bestFor.map((use) => (
            <span
              key={use}
              className="border border-line-strong px-2.5 py-1 text-label font-medium text-taupe uppercase"
            >
              {use}
            </span>
          ))}
        </div>

        <div className="flex-1" />
        <div className="mt-5">
          <WhatsAppLink
            message={service.enquiry}
            location="cabs-service"
            subject={service.id}
            tone="quiet"
            size="sm"
            fullWidth
          >
            Ask about {service.name.toLowerCase()}
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
