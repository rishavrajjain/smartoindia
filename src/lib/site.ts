/** Single source of truth for site-wide identity, URLs, and navigation. */

export const SITE = {
  name: "Smarto",
  legalName: "Smarto India",
  tagline: "Northeast India, travelled well",
  description:
    "Smarto plans road trips, festival journeys, and everyday transport across Assam, Meghalaya, Arunachal Pradesh, Sikkim, and Nagaland. Tell us what you have in mind on WhatsApp.",
  /**
   * Absolute origin used for canonical URLs, sitemap entries, and Open Graph.
   * Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every deployment.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://smartoindia.vercel.app"),
  locale: "en_IN",
  /** Operating base. Kept vague until Manav confirms a registered address. */
  base: "Guwahati, Assam",
} as const;

export interface NavItem {
  href: string;
  label: string;
  /** Short description used in the footer and the mobile menu. */
  blurb: string;
}

export const NAV: NavItem[] = [
  {
    href: "/packages",
    label: "Packages",
    blurb: "Planned routes across the Northeast, shaped around your pace.",
  },
  {
    href: "/cabs",
    label: "Cabs & EV",
    blurb: "Airport runs, local hires, outstation trips, and electric vehicles.",
  },
  {
    href: "/corporate",
    label: "Corporate",
    blurb: "Employee transport, offsites, and reliable group movement.",
  },
  {
    href: "/festivals",
    label: "Festivals",
    blurb: "What happens when, and how to plan a trip around it.",
  },
  {
    href: "/impact",
    label: "Impact",
    blurb: "How we try to keep our footprint small and the money local.",
  },
];

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
