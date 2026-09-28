import type { ContentStatus } from "@/types";

/*
 * The /cabs page's fleet, services and outstation routes.
 *
 * The vehicles and route fares are RRJ's (28 Sep 2026). The other fares are
 * the ones already published on the site and on smartocabs.com. Seat counts
 * for the two vans are the makers' usual configurations, marked "mock"
 * until Manav confirms the layouts Smarto runs. Distances and drive times
 * are approximate road figures from Guwahati.
 */

/** The seven rides the booking card offers. */
export type CabServiceId = "airport" | "rental" | "railway" | "city" | "shillong" | "outstation" | "sonapur";

export interface FleetVehicle {
  id: string;
  name: string;
  kind: string;
  /** A one-line personality for the card. */
  nickname: string;
  seats: string;
  bestFor: string;
  body: string;
  image: string;
  alt: string;
  electric?: boolean;
  status: ContentStatus;
}

export const FLEET: FleetVehicle[] = [
  {
    id: "tigor-ev",
    name: "Tata Tigor EV",
    kind: "Electric sedan",
    nickname: "The quiet one",
    seats: "4 guests",
    bestFor: "City rides, airport runs and office commutes",
    body: "All-electric and whisper-quiet, with a clean, air-conditioned cabin. Our signature city cab, on flat fares across Guwahati.",
    image: "/images/fleet-lineup-tigor-ev.webp",
    alt: "A white Smarto Tata Tigor EV parked beside a misty hill road in Meghalaya",
    electric: true,
    status: "verified",
  },
  {
    id: "dzire",
    name: "Maruti Suzuki Dzire",
    kind: "Sedan",
    nickname: "The smart all-rounder",
    seats: "4 guests",
    bestFor: "Outstation drops and day trips",
    body: "A clean, comfortable sedan with a proper boot for your bags. The easy, affordable pick for Shillong, Kaziranga and longer day trips.",
    image: "/images/fleet-lineup-dzire.webp",
    alt: "A white Maruti Suzuki Dzire sedan parked beside a misty hill road in Meghalaya",
    status: "verified",
  },
  {
    id: "ertiga",
    name: "Maruti Suzuki Ertiga",
    kind: "7-seater MPV",
    nickname: "The family favourite",
    seats: "6 guests",
    bestFor: "Families and small groups",
    body: "Three rows and AC throughout, so the whole family rides together in one car, with room to stretch out on the hill roads.",
    image: "/images/fleet-lineup-ertiga.webp",
    alt: "A white Maruti Suzuki Ertiga seven-seater parked beside a misty hill road in Meghalaya",
    status: "verified",
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    kind: "Premium MPV",
    nickname: "The hill-road classic",
    seats: "6 guests · 4 bags",
    bestFor: "Long drives to Tawang, Dibrugarh and the hills",
    body: "Premium comfort for the long haul: a smooth, high ride, plush seats and space for everyone's luggage.",
    image: "/images/fleet-lineup-innova-crysta.webp",
    alt: "A white Toyota Innova Crysta parked beside a misty hill road in Meghalaya",
    status: "verified",
  },
  {
    id: "traveller",
    name: "Force Traveller",
    kind: "Tempo traveller",
    nickname: "The whole-gang van",
    seats: "12 to 17 seats",
    bestFor: "Group tours, weddings and college trips",
    body: "One air-conditioned van, one driver and everyone together, from wedding guests to team offsites.",
    image: "/images/fleet-lineup-traveller.webp",
    alt: "A white Force Traveller tempo traveller parked beside a misty hill road in Meghalaya",
    status: "mock",
  },
  {
    id: "urbania",
    name: "Force Urbania",
    kind: "Premium van",
    nickname: "The first-class van",
    seats: "10 to 17 seats",
    bestFor: "Corporate teams and VIP groups",
    body: "The premium way to move a group: individual seats, a quiet cabin and big windows made for the views.",
    image: "/images/fleet-lineup-urbania.webp",
    alt: "A white Force Urbania premium van parked beside a misty hill road in Meghalaya",
    status: "mock",
  },
];

export interface CabServiceCard {
  id: CabServiceId;
  name: string;
  body: string;
  /** "Starting" fare, or null where the fare comes with the quote. */
  fare: string | null;
  fareLabel?: string;
  unit?: string;
}

export const CAB_SERVICE_CARDS: CabServiceCard[] = [
  {
    id: "airport",
    name: "Airport transfers",
    body: "On-time pickups and drops at Guwahati airport, Terminal 1 and 2. We follow your flight and meet you at arrivals, even at 4 AM.",
    fare: "₹399",
  },
  {
    id: "railway",
    name: "Railway station rides",
    body: "Reliable drops and pickups at Guwahati, Kamakhya and New Guwahati stations, timed to your train, early or late.",
    fare: null,
  },
  {
    id: "city",
    name: "City rides",
    body: "Affordable flat-fare rides anywhere in Guwahati in a clean electric cab. No surge in the rain or at rush hour.",
    fare: "₹249",
    fareLabel: "Minimum fare",
  },
  {
    id: "rental",
    name: "Hourly rentals",
    body: "A car and driver on your clock, 2 to 12 hours with 10 km included every hour. Made for meetings, shopping and hospital visits.",
    fare: "₹349",
    unit: "/hr",
  },
  {
    id: "outstation",
    name: "Outstation cabs",
    body: "One-way, round-trip and multi-day cabs from Guwahati across the Northeast, on a fixed fare agreed before you set off.",
    fare: "₹2,799",
  },
  {
    id: "shillong",
    name: "Shillong rides",
    body: "A reserved cab or an affordable shared seat between Guwahati and Shillong, with a return whenever you need one.",
    fare: "₹2,799",
  },
  {
    id: "sonapur",
    name: "Sonapur rides",
    body: "Fixed-fare drops and pickups between Guwahati and Sonapur, one way or return, on time and without the haggling.",
    fare: "₹1,599",
  },
];

export interface OutstationRoute {
  id: string;
  to: string;
  fare: string;
  distance: string;
  time: string;
  line: string;
  image: string;
  alt: string;
  /** A permit the trip needs, if any. */
  permit?: string;
}

export const OUTSTATION_ROUTES: OutstationRoute[] = [
  {
    id: "shillong",
    to: "Shillong",
    fare: "₹2,799",
    distance: "About 100 km",
    time: "About 3 hrs",
    line: "The hill capital: pine forests, cafés and cool air.",
    image: "/images/dest-shillong.webp",
    alt: "Tin-roofed cottages among pines on a misty Shillong hillside",
  },
  {
    id: "cherrapunji",
    to: "Cherrapunji",
    fare: "₹5,999",
    distance: "About 150 km",
    time: "About 4 hrs",
    line: "Waterfalls, living root bridges and famously wet skies.",
    image: "/images/pkg-meghalaya-waterfalls.webp",
    alt: "A traveller with an arm raised beside a tall waterfall in a green Meghalaya gorge",
  },
  {
    id: "kaziranga",
    to: "Kaziranga",
    fare: "₹7,499",
    distance: "About 200 km",
    time: "About 5 hrs",
    line: "One-horned rhinos, grasslands and jeep safaris.",
    image: "/images/pkg-assam-kaziranga.webp",
    alt: "Golden grassland and wetland at sunrise in the Assam floodplain, egrets rising off the water",
  },
  {
    id: "dibrugarh",
    to: "Dibrugarh",
    fare: "₹13,499",
    distance: "About 440 km",
    time: "About 9 hrs",
    line: "Tea country in upper Assam, along the Brahmaputra.",
    image: "/images/pkg-assam-tea.webp",
    alt: "Bright green rows of tea bushes stretching to the horizon under a blue sky",
  },
  {
    id: "tawang",
    to: "Tawang",
    fare: "₹15,999",
    distance: "About 450 km",
    time: "Usually 2 days",
    line: "Monasteries and high passes, with a night halt on the way.",
    image: "/images/pkg-arunachal-tawang.webp",
    alt: "Prayer flags strung across a high Himalayan pass with snow peaks behind",
    permit: "Inner Line Permit needed",
  },
];
