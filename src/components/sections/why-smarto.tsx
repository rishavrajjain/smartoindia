import type { ComponentType } from "react";

import { Container } from "@/components/ui/container";
import {
  CalendarIcon,
  HeadsetIcon,
  PhoneCheckIcon,
  PinIcon,
  TagIcon,
} from "@/components/ui/line-icons";
import { GOOGLE_RATING } from "@/data/reviews";

/*
 * Why book through Smarto: six reasons that hold for every service, not
 * just the cabs. Each is something the business already stands behind on
 * the site (all-in quotes, WhatsApp planning, 24x7, the Guwahati office,
 * the Google rating).
 */

function StarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m12 3 2.7 5.5 6 .9-4.35 4.25 1 6L12 16.8l-5.35 2.85 1-6L3.3 9.4l6-.9z" />
    </svg>
  );
}

const REASONS: { icon: ComponentType<{ className?: string }>; title: string; line: string }[] = [
  {
    icon: PhoneCheckIcon,
    title: "One chat, the whole trip",
    line: "Cabs, flights, hotels and packages, planned together on WhatsApp.",
  },
  {
    icon: TagIcon,
    title: "One all-in price",
    line: "The quote is what you pay. No surge, nothing added at the end.",
  },
  {
    icon: CalendarIcon,
    title: "Planned around you",
    line: "Your dates, your pace and your budget, never a fixed template.",
  },
  {
    icon: PinIcon,
    title: "Local, from Guwahati",
    line: "A team that plans the Northeast from the ground up.",
  },
  {
    icon: HeadsetIcon,
    title: "Help around the clock",
    line: "On call 24x7 on WhatsApp and phone, for the whole trip.",
  },
  {
    icon: StarGlyph,
    title: `Rated ${GOOGLE_RATING.score} on Google`,
    line: `From ${GOOGLE_RATING.count} reviews by people who travelled with us.`,
  },
];

export function WhySmarto({ className }: { className?: string }) {
  return (
    <section aria-labelledby="why-smarto" className={className}>
      <Container width="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="text-label font-extrabold text-clay uppercase">Why Smarto</p>
            <h2 id="why-smarto" className="mt-3 text-[1.875rem] leading-[1.08] lg:text-[2.5rem]">
              Why book <span className="accent">through Smarto</span>
            </h2>
            <span aria-hidden="true" className="spark-fill mt-5 block h-1 w-14 rounded-full" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-taupe">
              One team for everything on your trip, from the airport kerb to
              the last night&rsquo;s stay.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {REASONS.map((reason, i) => (
              <li
                key={reason.title}
                className="group flex gap-4 rounded-[1.5rem] bg-sand p-5 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-clay-soft sm:flex-col sm:gap-0 lg:p-6"
              >
                <span className="flex shrink-0 items-start justify-between sm:w-full">
                  <span className="grid size-11 place-items-center rounded-full bg-bone text-ink transition-colors duration-300 group-hover:bg-green-deep group-hover:text-white">
                    <reason.icon className="size-5" />
                  </span>
                  <span aria-hidden="true" className="hidden text-[0.75rem] font-extrabold text-taupe/50 tabular-nums sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="sm:mt-5">
                  <span className="block text-[1rem] leading-snug font-extrabold text-ink lg:text-[1.0625rem]">
                    {reason.title}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-taupe">
                    {reason.line}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
