import type { CabService, VehicleClass } from "@/types";
import { enquiry } from "@/lib/whatsapp";

import { IMAGES } from "./images";

/**
 * Cab and fleet content.
 *
 * PLACEHOLDER CONTENT. Service descriptions are written to a credible shape but
 * are not confirmed operating detail. Fleet counts, vehicle models, and coverage
 * areas must come from Manav before any of this is presented as fact — which is
 * why no record below states a number of vehicles.
 */
export const CAB_SERVICES: CabService[] = [
  {
    id: "airport-transfers",
    name: "Airport transfers",
    summary:
      "Fixed pickups and drops at Guwahati, Shillong, Dibrugarh, Jorhat, Dimapur, and Bagdogra.",
    details: [
      "Driver tracks your flight and waits if it is late",
      "Meet at the terminal exit, with a name board if you want one",
      "Luggage-appropriate vehicle confirmed when you book, not on arrival",
      "Late-night and pre-dawn runs available",
    ],
    bestFor: ["Arrivals", "Departures", "Hotel drops"],
    image: IMAGES.cabsAirport,
    enquiry: enquiry("I need an airport transfer. Here are my flight details:"),
    status: "mock",
  },
  {
    id: "local-rides",
    name: "Local rides and half-day hire",
    summary:
      "Point-to-point trips or a car and driver for a few hours around town.",
    details: [
      "Hourly or half-day hire within city limits",
      "Useful for meetings, hospital visits, shopping, or a day of errands",
      "Driver stays with the vehicle so you are not re-booking every stop",
      "Same-day requests handled when a vehicle is free",
    ],
    bestFor: ["City travel", "Errands", "Short hires"],
    enquiry: enquiry(
      "I need a local cab. Here is the date, time, and area I need it in:",
    ),
    status: "mock",
  },
  {
    id: "outstation",
    name: "Outstation trips",
    summary:
      "One-way or return runs between towns across Assam, Meghalaya, and neighbouring states.",
    details: [
      "Guwahati to Shillong, Kaziranga, Tezpur, Jorhat, and further",
      "One-way and return pricing quoted separately, so you can compare",
      "Driver night halt and state permits included in the quote",
      "Multiple pickups on the way out if your group is spread across town",
    ],
    bestFor: ["Intercity", "Weekend trips", "One-way drops"],
    image: IMAGES.cabsOutstation,
    enquiry: enquiry(
      "I need an outstation cab. Here is my route and travel date:",
    ),
    status: "mock",
  },
  {
    id: "multi-day-tours",
    name: "Multi-day tours",
    summary:
      "A vehicle and driver for the length of your trip, with the route planned around road conditions rather than a map.",
    details: [
      "Same vehicle and driver throughout, so luggage stays in the car",
      "Driver familiar with hill roads, permits, and where a stop is safe",
      "Itinerary adjusted en route when weather closes something",
      "Works alongside our packages, or on its own if you have your own plan",
    ],
    bestFor: ["Road trips", "Custom routes", "Family holidays"],
    enquiry: enquiry(
      "I need a car and driver for a multi-day trip. Here are my dates and rough route:",
    ),
    status: "mock",
  },
  {
    id: "corporate-transport",
    name: "Corporate transport",
    summary:
      "Employee shuttles, guest pickups, and event movement on a monthly or per-trip arrangement.",
    details: [
      "Recurring staff routes with fixed timings",
      "Guest and client pickups with a single point of contact",
      "Consolidated monthly invoicing rather than per-ride receipts",
      "Vehicle class matched to the occasion",
    ],
    bestFor: ["Staff shuttles", "Client pickups", "Events"],
    enquiry: enquiry(
      "I am enquiring about corporate transport. Here is what my company needs:",
    ),
    status: "mock",
  },
  {
    id: "ev-hire",
    name: "EV hire",
    summary:
      "Electric vehicles for city and shorter intercity runs, subject to charging on the route.",
    details: [
      "Quieter and cheaper to run over a day of city stops",
      "Best suited to city travel and shorter intercity legs",
      "We will tell you honestly when a route is better served by a diesel",
      "Charging stops planned into longer runs rather than improvised",
    ],
    bestFor: ["City travel", "Airport runs", "Low-emission trips"],
    image: IMAGES.cabsEv,
    enquiry: enquiry(
      "I would like to hire an electric vehicle. Here is my route and date:",
    ),
    status: "mock",
  },
];

/**
 * Vehicle classes offered.
 *
 * PLACEHOLDER CONTENT. Deliberately describes categories rather than specific
 * models or a fleet size, since neither has been confirmed. Do not add counts.
 */
export const VEHICLE_CLASSES: VehicleClass[] = [
  {
    id: "hatchback-ev",
    name: "Electric hatchback",
    seats: "Up to 4 passengers",
    description:
      "City runs, airport transfers, and short intercity legs where charging is available at both ends.",
    electric: true,
    status: "mock",
  },
  {
    id: "sedan",
    name: "Sedan",
    seats: "Up to 4 passengers",
    description:
      "Comfortable for two with luggage, or four on shorter runs. The default for airport work.",
    electric: false,
    status: "mock",
  },
  {
    id: "suv",
    name: "SUV",
    seats: "Up to 6 passengers",
    description:
      "Higher clearance for hill roads and rough surfaces. What we use for most multi-day trips.",
    electric: false,
    status: "mock",
  },
  {
    id: "tempo-traveller",
    name: "Tempo traveller",
    seats: "9 to 16 passengers",
    description:
      "Groups, corporate movement, and families travelling together rather than in convoy.",
    electric: false,
    status: "mock",
  },
];
