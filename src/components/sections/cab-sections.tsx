import Image from "next/image";
import type { ComponentType } from "react";

import { BookServiceLink } from "@/components/sections/cab-quick-services";
import { Eyebrow } from "@/components/ui/deco";
import {
  AirportIcon,
  ArrowIcon,
  BoltIcon,
  BuildingIcon,
  KeyIcon,
  MountainIcon,
  PeopleIcon,
  RoadIcon,
  RouteIcon,
  TrainIcon,
} from "@/components/ui/line-icons";
import { Rail } from "@/components/ui/rail";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  CAB_SERVICE_CARDS,
  FLEET,
  OUTSTATION_ROUTES,
  type CabServiceId,
} from "@/data/cabs";
import { enquiry } from "@/lib/whatsapp";

/*
 * The cabs page's three rails, one idea each: the cars, the rides, and the
 * popular outstation routes. Scrolling down the page moves between them;
 * swiping moves along one. The services band is dark so the three read as
 * separate sections.
 */

const SERVICE_ICONS: Record<CabServiceId, ComponentType<{ className?: string }>> = {
  airport: AirportIcon,
  railway: TrainIcon,
  city: BuildingIcon,
  rental: KeyIcon,
  outstation: RoadIcon,
  shillong: MountainIcon,
  sonapur: RouteIcon,
};

export function FleetRail({ className }: { className?: string }) {
  return (
    <section aria-labelledby="fleet-title" className={className}>
      <Rail
        label="our fleet"
        header={
          <>
            <Eyebrow>Our fleet</Eyebrow>
            <h2 id="fleet-title" className="mt-3 text-[1.875rem] leading-[1.08] sm:text-[2.25rem] lg:text-[2.5rem]">
              Clean, premium cars <span className="accent">for every trip</span>
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-taupe">
              From our all-electric Tigor EV for city rides to premium vans for
              groups, every Smarto car is air-conditioned, kept spotless and
              driven by a courteous, professional driver.
            </p>
          </>
        }
      >
        {FLEET.map((car) => (
          <li key={car.id} className="w-[17.5rem] shrink-0 snap-start sm:w-[19.5rem] lg:w-[21rem]">
            <article className="relative flex h-full flex-col rounded-[1.75rem] bg-sand p-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.375rem] bg-line">
                <Image
                  src={car.image}
                  alt={car.alt}
                  fill
                  sizes="(min-width: 1024px) 21rem, (min-width: 640px) 19.5rem, 17.5rem"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-bone/92 px-3 py-1.5 text-[0.6875rem] font-extrabold text-ink backdrop-blur-sm">
                  {car.electric && <BoltIcon className="size-3.5 text-green-deep" />}
                  {car.kind}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
                <p className="text-label font-extrabold text-green-deep uppercase">{car.nickname}</p>
                <h3 className="mt-1.5 text-[1.1875rem] leading-tight font-extrabold text-ink">{car.name}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-taupe">{car.body}</p>
                <dl className="mt-4 space-y-2 border-t border-line pt-3.5 text-[0.8125rem]">
                  <div className="flex items-center gap-2.5">
                    <dt className="sr-only">Seats</dt>
                    <PeopleIcon className="size-4 shrink-0 text-taupe" />
                    <dd className="font-extrabold text-ink">{car.seats}</dd>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <dt className="sr-only">Best for</dt>
                    <RoadIcon className="mt-0.5 size-4 shrink-0 text-taupe" />
                    <dd className="leading-snug text-taupe">{car.bestFor}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-5">
                  <WaCta
                    message={enquiry(`I would like to book the ${car.name}.`)}
                    location="cabs-fleet"
                    subject={car.id}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink text-[0.8125rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
                  >
                    <WhatsAppIcon />
                    Book this car
                  </WaCta>
                </div>
              </div>
            </article>
          </li>
        ))}
      </Rail>
    </section>
  );
}

export function ServiceRail({ className }: { className?: string }) {
  return (
    <section aria-labelledby="services-title" className={`relative isolate overflow-hidden bg-clay-deep py-14 text-bone lg:py-20 ${className ?? ""}`}>
      <div aria-hidden="true" className="spark-glow absolute -top-24 -right-24 -z-10 size-80 opacity-70" />
      <Rail
        label="our services"
        tone="dark"
        header={
          <>
            <Eyebrow tone="dark">Our services</Eyebrow>
            <h2 id="services-title" className="mt-3 text-[1.875rem] leading-[1.08] text-bone sm:text-[2.25rem] lg:text-[2.5rem]">
              Reliable cabs for <span className="accent">every kind of ride</span>
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-bone/65">
              Affordable flat fares, on-time pickups and a real person on the
              phone 24×7, whichever ride you book.
            </p>
          </>
        }
      >
        {CAB_SERVICE_CARDS.map((service, i) => {
          const Icon = SERVICE_ICONS[service.id];
          return (
            <li key={service.id} className="w-[16.5rem] shrink-0 snap-start sm:w-[18rem]">
              <article className="relative flex h-full flex-col rounded-[1.5rem] bg-white/[0.06] p-5 ring-1 ring-white/10">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-green/15 text-green">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-[0.75rem] font-extrabold text-bone/35 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-[1.125rem] leading-tight font-extrabold text-bone">{service.name}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-bone/70">{service.body}</p>
                <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                  <p className="leading-tight">
                    {service.fare ? (
                      <>
                        <span className="block text-[0.6875rem] text-bone/55">{service.fareLabel ?? "Starting"}</span>
                        <span className="text-[1.25rem] font-extrabold text-green">{service.fare}</span>
                        {service.unit && <span className="text-[0.8125rem] text-bone/60">{service.unit}</span>}
                      </>
                    ) : (
                      <span className="block max-w-[8rem] text-[0.75rem] text-bone/60">Flat fare with your quote</span>
                    )}
                  </p>
                  <BookServiceLink
                    service={service.id}
                    className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-bone px-4 text-[0.8125rem] font-extrabold text-ink transition-colors hover:bg-green"
                  >
                    Book
                    <ArrowIcon className="size-3.5 -rotate-90" />
                    <span className="sr-only"> {service.name.toLowerCase()} at the top of the page</span>
                  </BookServiceLink>
                </div>
              </article>
            </li>
          );
        })}
      </Rail>
    </section>
  );
}

export function OutstationRail({ className }: { className?: string }) {
  return (
    <section id="outstation" aria-labelledby="outstation-title" className={`scroll-mt-20 ${className ?? ""}`}>
      <Rail
        label="outstation routes"
        header={
          <>
            <Eyebrow>Smarto Outstation</Eyebrow>
            <h2 id="outstation-title" className="mt-3 text-[1.875rem] leading-[1.08] sm:text-[2.25rem] lg:text-[2.5rem]">
              Outstation cabs from Guwahati, <span className="accent">on one fixed fare</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-taupe">
              Book a reliable one-way, round-trip or multi-day outstation cab
              from Guwahati to Shillong, Cherrapunji, Kaziranga, Tawang,
              Dibrugarh and anywhere in the Northeast. Clean, well-kept cars,
              drivers who know the hill roads, and a fixed fare agreed before you
              leave: no surge, nothing added at the end.
            </p>
          </>
        }
      >
        {OUTSTATION_ROUTES.map((route) => (
          <li key={route.id} className="w-[16.5rem] shrink-0 snap-start sm:w-[18.5rem]">
            <article className="relative isolate flex h-full min-h-[25rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-clay-deep p-4 text-bone sm:min-h-[27rem]">
              <Image
                src={route.image}
                alt={route.alt}
                fill
                sizes="(min-width: 640px) 18.5rem, 16.5rem"
                className="-z-10 object-cover"
              />
              <span aria-hidden="true" className="photo-scrim absolute inset-0 -z-10" />
              <ul className="flex flex-wrap gap-1.5">
                {[route.distance, route.time, route.permit].filter(Boolean).map((fact) => (
                  <li
                    key={fact}
                    className="rounded-full bg-clay-deep/55 px-2.5 py-1 text-[0.6875rem] font-extrabold text-bone backdrop-blur-sm"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-[0.75rem] font-extrabold tracking-[0.14em] text-green uppercase">Guwahati →</p>
                <h3 className="mt-1 text-[1.75rem] leading-none font-extrabold">{route.to}</h3>
                <p className="mt-2 text-[0.8125rem] leading-snug text-bone/80">{route.line}</p>
                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-bone p-2 pl-3.5 text-ink">
                  <p className="leading-tight">
                    <span className="block text-[0.6875rem] text-taupe">Starting</span>
                    <span className="text-[1.25rem] font-extrabold text-green-deep">{route.fare}</span>
                  </p>
                  <WaCta
                    message={enquiry(`I would like an outstation cab from Guwahati to ${route.to}.`)}
                    location="cabs-outstation"
                    subject={route.id}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-deep px-4 text-[0.8125rem] font-extrabold text-white"
                  >
                    <WhatsAppIcon />
                    Book
                  </WaCta>
                </div>
              </div>
            </article>
          </li>
        ))}
        <li className="w-[16.5rem] shrink-0 snap-start sm:w-[18.5rem]">
          <article className="relative flex h-full flex-col justify-between rounded-[1.75rem] bg-sand p-6">
            <span className="grid size-12 place-items-center rounded-full bg-ink text-green">
              <RoadIcon className="size-6" />
            </span>
            <div>
              <h3 className="text-[1.5rem] leading-tight font-extrabold text-ink">Going somewhere else?</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-taupe">
                Tezpur, Majuli, Dawki, Ziro or any town in the Northeast. Tell us
                the route and we send a fixed fare.
              </p>
              <WaCta
                message={enquiry("I would like an outstation cab. My route and date are:")}
                location="cabs-outstation"
                subject="other"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.8125rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
              >
                <WhatsAppIcon />
                Ask for a fare
              </WaCta>
            </div>
          </article>
        </li>
      </Rail>
      <p className="mx-auto mt-4 max-w-7xl px-5 text-[0.75rem] text-taupe sm:px-8">
        Starting fares from Guwahati. Your exact fare depends on the car, dates
        and stops, and is confirmed on WhatsApp before you travel.
      </p>
    </section>
  );
}
