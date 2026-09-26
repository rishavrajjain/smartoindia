/**
 * Every WhatsApp link on the site is built here so the number, the encoding, and
 * the analytics contract stay in one place.
 */

/**
 * Smarto's enquiry line, in wa.me international format (no plus, no spaces).
 *
 * This is the number published on smartocabs.com. It replaces the placeholder
 * (919864148845) that was previously in the repo, confirm with Manav that
 * enquiries should land on this line.
 */
export const WHATSAPP_NUMBER = "917099013815";

/** Human-readable form, for display next to the link. */
export const WHATSAPP_DISPLAY = "+91 70990 13815";

/**
 * Where on the site a CTA was rendered. Passed to `trackCtaClick` so conversion
 * can be attributed once an analytics provider is wired up.
 */
export type CtaLocation =
  | "header"
  | "sticky"
  | "footer"
  | "home-hero"
  | "home-packages"
  | "home-custom-trip"
  | "home-cabs"
  | "home-corporate"
  | "home-alt-hero"
  | "home-alt-route"
  | "home-alt-final"
  | "concept-c"
  | "concept-d"
  | "concept-e"
  | "concept-f"
  | "b-header"
  | "b-float"
  | "b-cabs"
  | "b-festivals"
  | "b-banner-cabs"
  | "b-whatsapp-banner"
  | "packages-index"
  | "packages-empty-state"
  | "package-detail"
  | "package-detail-sticky"
  | "cabs-hero"
  | "cabs-service"
  | "cabs-fleet"
  | "cabs-book"
  | "cabs-dock"
  | "corporate-hero"
  | "corporate-enquiry"
  | "festivals-hero"
  | "festival-card"
  | "impact-cta"
  | "home-flights"
  | "flights-hero"
  | "flights-empty-state"
  | "flights-error"
  | "flights-book"
  | "flights-confirmed"
  | "events-brief"
  | "events-enquiry"
  | "corporate-rate-card"
  | "corporate-trial"
  | "corporate-dock"
  | "partner-register"
  | "partner-desk"
  | "partner-dock"
  | "not-found";

/**
 * Builds a wa.me deep link with a prefilled message.
 *
 * The message should name the page and the subject so the first reply can be
 * useful, e.g. "Hi Smarto, I would like a quote for the 6-day Meghalaya package."
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Standard opener so every enquiry arrives in a recognisable shape. */
export function enquiry(subject: string): string {
  return `Hi Smarto, ${subject}`;
}
