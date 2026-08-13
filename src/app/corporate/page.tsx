import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/deco";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { IMAGES } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Corporate and group travel",
  description:
    "Employee shuttles, client pickups, offsite logistics, and group movement across Northeast India, with one point of contact and consolidated monthly invoicing.",
  path: "/corporate",
});

const SERVICES = [
  {
    title: "Employee transport",
    body: "Fixed routes and timings for staff, run daily or on a shift pattern. Same drivers each week, so your team is not explaining the route every morning.",
  },
  {
    title: "Client and guest pickups",
    body: "Airport collections and hotel runs for visitors, arranged through one contact rather than whoever is free at reception.",
  },
  {
    title: "Offsites and team trips",
    body: "Moving twenty people to a hill town and back, with the itinerary, the vehicles, and the timing planned as one thing instead of three.",
  },
  {
    title: "Event and conference movement",
    body: "Shuttles between venue, hotels, and the airport across a multi-day event, with vehicles held on site rather than called each time.",
  },
  {
    title: "Site and project transport",
    body: "Regular runs to work sites on roads that are hard on vehicles, with drivers who know them.",
  },
  {
    title: "Ad-hoc requests",
    body: "The things that come up: a late flight, an extra guest, a vehicle at short notice on a Sunday.",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Tell us the pattern",
    body: "Routes, timings, how many people, how often. A rough shape is enough to start.",
  },
  {
    title: "We quote the arrangement",
    body: "Monthly, per-trip, or a mix. Driver allowances, tolls, and permits are in the number rather than added later.",
  },
  {
    title: "One contact, one invoice",
    body: "A single person to message when something changes, and consolidated billing at the end of the month.",
  },
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        image={IMAGES.corporateHero}
        eyebrow="Corporate & groups"
        title={
          <>
            Transport your team{" "}
            <span className="accent">can rely on</span>.
          </>
        }
        lead="Staff routes, client pickups, and offsites. One contact, one invoice."
        priority
        stickers={
          <>
            <Label>
              Monthly billing
            </Label>
            <Label>
              One contact
            </Label>
          </>
        }
      >
        <WhatsAppLink
          message={enquiry(
            "I am enquiring about corporate transport. Here is what my company needs:",
          )}
          location="corporate-hero"
          size="lg"
        >
          Request a corporate quote
        </WhatsAppLink>
      </PageHero>

      <Container width="wide" className="pt-16 lg:pt-24">
        <SectionHeading
          eyebrow="What we cover"
          title="From a daily shuttle to a week-long offsite"
          lead="Repetition done properly: same route, same time, same standard."
        />
        <ul className="mt-10 grid gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.title} className="reveal border-t border-line pt-5">
              <h3 className="font-sans text-base font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-taupe">
                {service.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      <section className="relative mt-20 overflow-hidden bg-clay py-16 lg:mt-28 lg:py-24">
        <Container width="wide" className="relative">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, then it runs itself"
            tone="dark"
          />
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, index) => (
              <li key={step.title}>
                <span
                  aria-hidden="true"
                  className="flex size-14 items-center justify-center rounded-sm bg-ochre font-display text-2xl font-semibold text-ink tabular-nums"
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 text-[1.5rem] text-bone">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-bone/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container width="wide" className="pt-16 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What to expect"
              title="The unglamorous parts we take seriously"
            />
            <ul className="mt-7 space-y-5">
              {[
                {
                  title: "Vehicles that are actually clean",
                  body: "Checked between runs, not once a week. Your visiting client notices this before they notice anything else.",
                },
                {
                  title: "Drivers briefed on the job",
                  body: "Who they are collecting, where they are going, and what to do if a flight slips. Not just an address forwarded by message.",
                },
                {
                  title: "Cover when something breaks",
                  body: "A replacement vehicle arranged rather than a phone call telling you it is not coming.",
                },
                {
                  title: "Billing you can reconcile",
                  body: "Itemised monthly invoicing against the routes you agreed, so finance is not chasing loose receipts.",
                },
              ].map((point) => (
                <li key={point.title} className="flex gap-3.5">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-clay-deep"
                  >
                    <path d="m4 10.5 4 4 8-9" />
                  </svg>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-taupe">
                      {point.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-t border-line bg-sand p-6 lg:p-8">
              <h2 className="text-[1.75rem] leading-tight text-ink">
                Tell us what you need moved
              </h2>
              <p className="mt-3 leading-relaxed text-taupe">
                Send the routes, timings and passenger numbers. We come back
                with an arrangement and a monthly figure.
              </p>
              <ul className="mt-6 space-y-2.5 text-[0.9375rem] font-medium text-ink">
                <li className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                  Pickup points and drop points
                </li>
                <li className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                  Days, times, and how often
                </li>
                <li className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                  Number of passengers per run
                </li>
                <li className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                  Anything that must not go wrong
                </li>
              </ul>
              <div className="mt-7">
                <WhatsAppLink
                  message={enquiry(
                    "I am enquiring about corporate transport. Here are our routes, timings, and passenger numbers:",
                  )}
                  location="corporate-enquiry"
                  size="md"
                  fullWidth
                >
                  Request a corporate quote
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
