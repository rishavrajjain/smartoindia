/** Single source of truth for site-wide identity, URLs, and navigation. */

/*
 * Verified business facts sourced from smartocabs.com (their live site).
 * Confirm with Manav before major changes, especially the WhatsApp number,
 * which differs from the placeholder previously in the repo.
 */
export const SITE = {
  name: "Smarto",
  legalName: "Firstventure Mobility Pvt. Ltd.",
  brand: "Smarto Cabs",
  slogan: "Smart People, Smart Choice",
  tagline: "Northeast India, travelled well",
  description:
    "Smarto runs EV airport transfers, outstation rides, and road trips across Assam, Meghalaya, and the wider Northeast: flat fares, no surge, zero cancellation. Plan yours on WhatsApp.",
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
  base: "Guwahati, Assam",
  email: "hello@smartocabs.com",
  address: "F20, 1st Floor, Grand Plaza, AT Road, Paltan Bazaar, Guwahati 781008",
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
    href: "/flights",
    label: "Flights",
    blurb: "Search fares into and out of the Northeast, then book on WhatsApp.",
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
