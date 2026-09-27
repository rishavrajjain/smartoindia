import { POPULAR_SECTORS, findAirport } from "@/data/airports";
import { MAX_DAYS_AHEAD } from "@/lib/flights";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

/*
 * Frequently asked questions. Every answer restates something the site
 * already establishes (WhatsApp booking, all-in quotes, flat cab fares,
 * 24x7 support, hotels anywhere, permits planned for Arunachal journeys).
 * Payment methods, refunds and cancellation terms are left out until Manav
 * supplies them.
 */

export interface Faq {
  q: string;
  a: string;
}

export const GENERAL_FAQS: Faq[] = [
  {
    q: "How do I book with Smarto?",
    a: `Message us on WhatsApp or call ${WHATSAPP_DISPLAY}. Tell us where, when and who is travelling, and we reply with a plan and one all-in quote. There is no app to download.`,
  },
  {
    q: "Is the price I'm quoted the price I pay?",
    a: "Yes. Every quote is all-in, and our cab fares are flat: no surge for rain, rush hour or a 2 AM pickup. Nothing is added at the end.",
  },
  {
    q: "What can Smarto book for me?",
    a: "Cabs across Guwahati, flights across India, hotels in any city, domestic and international packages, and transport for companies, weddings and events.",
  },
  {
    q: "Will someone meet me at the airport?",
    a: "Yes. Our airport rides meet you at arrivals and follow your flight, so a delay does not leave you stranded.",
  },
  {
    q: "Do you sort out permits for Arunachal Pradesh?",
    a: "Yes, permits are part of how we plan every Arunachal journey. Indian citizens need an Inner Line Permit and foreign nationals a Protected Area Permit; we tell you exactly what we need from you.",
  },
  {
    q: "Can I reach you during the trip?",
    a: "Yes. Our team is on call 24x7 on WhatsApp and phone, from the first pickup to the drop home.",
  },
];

export const HOTEL_FAQS: Faq[] = [
  {
    q: "Which cities can you book hotels in?",
    a: "Anywhere in India, and abroad too. The Shillong and Cherrapunjee stays on this page are simply the ones our journeys use most.",
  },
  {
    q: "Can I book just a hotel, without a cab or package?",
    a: "Yes. Book only the stay, or add an airport ride or a whole trip and we plan them together.",
  },
  {
    q: "What budgets do you cover?",
    a: "From five-star hotels to clean, comfortable three-star and budget rooms. Tell us your budget and we suggest stays that fit it.",
  },
  {
    q: "How do I get hotel options?",
    a: "Use the planner at the top of this page or message us on WhatsApp. We send a few options with their rates, and you choose.",
  },
  GENERAL_FAQS[1],
  GENERAL_FAQS[5],
];

/* The popular routes, read from the same list the flight search offers. */
const ROUTES = POPULAR_SECTORS.map(
  ([a, b]) => `${findAirport(a)?.city ?? a} to ${findAirport(b)?.city ?? b}`,
);

export const FLIGHT_FAQS: Faq[] = [
  {
    q: "What are the most popular routes?",
    a: `${ROUTES.slice(0, -1).join(", ")} and ${ROUTES[ROUTES.length - 1]}. Tap any of them under the search to start.`,
  },
  {
    q: "How do I book a flight?",
    a: "Search your route and date, pick a fare, and confirm it with us on WhatsApp. Nothing is ticketed until you say yes.",
  },
  {
    q: "Why do some dates show no fares?",
    a: "Our fares come from an airline partner's fixed-departure seats, which are limited. If a date is empty, message us and we find you a fare by hand.",
  },
  {
    q: "Can I book a round trip?",
    a: "Yes. Add a return date and both legs are priced together, in one booking.",
  },
  {
    q: "How far ahead can I search, and for how many people?",
    a: `Up to ${MAX_DAYS_AHEAD} days ahead, and up to 9 seats in one search for adults and children together, plus infants.`,
  },
  {
    q: "Will a cab be waiting when I land?",
    a: "In Guwahati, yes. Tell us your flight and a Smarto cab meets you at arrivals.",
  },
];

export const CAB_FAQS: Faq[] = [
  {
    q: "How do I book a cab?",
    a: "Pick your ride under Quick services on this page and fill in what you know, or message us on WhatsApp with your pickup, drop and time.",
  },
  {
    q: "Is there surge pricing?",
    a: "Never. Rain, rush hour or a 2 AM pickup, the fare you are quoted is the fare you pay.",
  },
  {
    q: "Are the cabs electric?",
    a: "Our city cabs in Guwahati are all-electric. For long outstation journeys we use a car suited to the route, confirmed in your quote.",
  },
  {
    q: "Do you do airport pickups?",
    a: "Yes. We meet you at arrivals and follow your flight, so a delay does not leave you stranded.",
  },
  {
    q: "Can I hire a cab by the hour?",
    a: "Yes. Hourly rentals start from ₹349 per hour: a car and driver on your clock.",
  },
  {
    q: "Do you go outside Guwahati?",
    a: "Yes: Shillong, Kaziranga, Tezpur and across the Northeast, on fixed fares agreed up front.",
  },
];

export const PACKAGE_FAQS: Faq[] = [
  {
    q: "What is included in a journey?",
    a: "A dedicated car and driver, your hotels, daily breakfast and end-to-end planning, as one all-in bundle.",
  },
  {
    q: "What is not included?",
    a: "Lunches and dinners, entry fees, optional activities like safaris or boat rides, and personal expenses.",
  },
  {
    q: "Can I change a journey?",
    a: "Yes. Every journey can be reshaped: dates, pace, hotels and route.",
  },
  {
    q: "Why are prices not shown?",
    a: "They depend on your dates, group size and hotels. You get one all-in quote on WhatsApp, and that is the price you pay.",
  },
  {
    q: "Are there group departures?",
    a: "On selected journeys: fixed dates, a shared coach and private rooms. Solo travellers can join without a supplement.",
  },
  GENERAL_FAQS[4],
];

export const INTL_FAQS: Faq[] = [
  {
    q: "Are these fixed packages?",
    a: "No, they are sample itineraries. We tailor the dates, pace and stays to you and quote all-in on WhatsApp.",
  },
  {
    q: "Will I stay anywhere twice?",
    a: "No. Every trip is one continuous route: fly in, stay in each place once, and fly home from the last stop.",
  },
  {
    q: "Can I go somewhere that is not listed?",
    a: "Yes. Name the place and we plan it.",
  },
  PACKAGE_FAQS[3],
  GENERAL_FAQS[0],
  GENERAL_FAQS[5],
];

export const FESTIVAL_FAQS: Faq[] = [
  {
    q: "Are festival dates fixed?",
    a: "No. Many follow lunar or local calendars and shift each year. We confirm the current dates on WhatsApp before you book.",
  },
  {
    q: "How early should I book?",
    a: "Early. Festival weeks fill months ahead, Hornbill in December most of all.",
  },
  {
    q: "Can you plan a whole trip around a festival?",
    a: "Yes: the stays, the cars and the days around it. Some of our journeys are built around festivals, such as Wangala and Torgya.",
  },
  GENERAL_FAQS[4],
  GENERAL_FAQS[5],
];
