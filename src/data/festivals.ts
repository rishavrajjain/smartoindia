import type { Festival } from "@/types";
import { enquiry } from "@/lib/whatsapp";

/**
 * Festival discovery content.
 *
 * PLACEHOLDER CONTENT, AND TIMING-SENSITIVE.
 *
 * Most of these festivals move year to year, several follow lunar or
 * agricultural calendars rather than fixed dates. Each record therefore stores
 * the month it usually falls in, the year that timing was last sanity-checked,
 * and where it came from, rather than a specific date.
 *
 * Before production launch, every entry must be re-checked against the relevant
 * state tourism department for the coming year and `status` flipped to
 * `"verified"`. The UI states plainly that dates shift and are confirmed on
 * WhatsApp, do not remove that caveat while these are still `"mock"`.
 */
const TIMING_YEAR = 2026;
const TIMING_SOURCE = "General published guidance; not yet confirmed with state tourism for the coming year";

export const FESTIVALS: Festival[] = [
  {
    id: "bihu-spring",
    name: "Rongali Bihu",
    state: "Assam",
    month: "Apr",
    monthLabel: "Mid-April",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "The Assamese spring new year, marking the start of the sowing season. Several days of dance, feasting, and visiting.",
    whatToExpect: [
      "Community grounds hosting husori and bihu dance through the week",
      "Households cooking pitha and larus, and a lot of open invitations",
      "Towns emptying as people travel home, so plan transport early",
    ],
    travelNote:
      "The best of Bihu happens in villages and neighbourhood grounds rather than on a stage. Being driven by someone who knows which ground is worth going to matters more than a ticket.",
    enquiry: enquiry("I would like to plan a trip around Rongali Bihu."),
    status: "mock",
  },
  {
    id: "hornbill",
    name: "Hornbill Festival",
    state: "Nagaland",
    month: "Dec",
    monthLabel: "First ten days of December",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "A large gathering at Kisama near Kohima, where Naga communities present music, dance, craft, and food across ten days.",
    whatToExpect: [
      "Morning and afternoon programmes at the heritage village",
      "Craft and textile stalls, and a great deal of food",
      "Kohima at its busiest, with accommodation booked months ahead",
    ],
    travelNote:
      "Book three to four months out. The difference between staying in Kohima and staying an hour away is decided long before December.",
    enquiry: enquiry(
      "I would like to plan a trip around the Hornbill Festival.",
    ),
    status: "mock",
  },
  {
    id: "wangala",
    name: "Wangala",
    state: "Meghalaya",
    month: "Nov",
    monthLabel: "Usually November",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "The Garo harvest festival, known for its drumming. Held across the Garo Hills, with a larger gathering at Asanang.",
    whatToExpect: [
      "Long-drum lines and dancers in coordinated dress",
      "Village celebrations on different days across the hills",
      "A quieter, less-visited festival than the December gatherings",
    ],
    travelNote:
      "The Garo Hills are a long drive west of Shillong and are not a day trip. Two nights minimum if you want to see this properly.",
    enquiry: enquiry("I would like to plan a trip around Wangala."),
    status: "mock",
  },
  {
    id: "losar",
    name: "Losar",
    state: "Arunachal Pradesh",
    month: "Feb",
    monthLabel: "February or March, by the lunar calendar",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "The Tibetan and Monpa new year, observed around Tawang and the western districts with monastery rituals and household gatherings.",
    whatToExpect: [
      "Monastery ceremonies over several mornings",
      "Households cleaning, cooking, and receiving visitors",
      "Deep cold, and passes that may be snowbound",
    ],
    travelNote:
      "Losar falls in the hardest part of the Tawang travel year. Sela Pass can close for days. We will plan it, but we will be blunt about the risk.",
    enquiry: enquiry("I would like to plan a trip around Losar in Tawang."),
    status: "mock",
  },
  {
    id: "saga-dawa",
    name: "Saga Dawa",
    state: "Sikkim",
    month: "Jun",
    monthLabel: "Usually late May or June",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "A Buddhist holy month marked across Sikkim, with processions in Gangtok and observances at monasteries throughout.",
    whatToExpect: [
      "Processions carrying scriptures through Gangtok",
      "Monasteries busier and more open than usual",
      "Early monsoon weather, so the hills are green and the views are not",
    ],
    travelNote:
      "This is a religious observance rather than a performance. Ask before photographing anyone, and dress for a monastery rather than a viewpoint.",
    enquiry: enquiry("I would like to plan a trip around Saga Dawa in Sikkim."),
    status: "mock",
  },
  {
    id: "ambubachi",
    name: "Ambubachi Mela",
    state: "Assam",
    month: "Jun",
    monthLabel: "Late June",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "A four-day gathering at the Kamakhya temple in Guwahati that draws very large numbers of pilgrims.",
    whatToExpect: [
      "The temple closed for three days, then reopening to long queues",
      "Guwahati considerably busier, with traffic to match",
      "Peak monsoon heat and humidity",
    ],
    travelNote:
      "If you are visiting Guwahati for other reasons in late June, know that this is happening. Hotels fill and the Kamakhya road is slow for days.",
    enquiry: enquiry("I would like to plan a trip around Ambubachi Mela."),
    status: "mock",
  },
  {
    id: "ziro-music",
    name: "Ziro Festival of Music",
    state: "Arunachal Pradesh",
    month: "Sep",
    monthLabel: "Usually late September",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "An outdoor independent music festival held in the Ziro valley, camping-based and deliberately small.",
    whatToExpect: [
      "Multi-day outdoor stages in a rice-terrace valley",
      "Camping rather than hotels, and a lot of mud if it rains",
      "Permits required, and a long drive in from Itanagar",
    ],
    travelNote:
      "Getting to Ziro is the hard part: it is a full day's drive from the nearest airport on a road that the festival traffic does not improve. Plan a buffer day.",
    enquiry: enquiry(
      "I would like to plan a trip around the Ziro Festival of Music.",
    ),
    status: "mock",
  },
  {
    id: "shad-suk-mynsiem",
    name: "Shad Suk Mynsiem",
    state: "Meghalaya",
    month: "Apr",
    monthLabel: "Usually April",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "A Khasi thanksgiving dance held in Shillong over several days, performed in traditional dress to drum and pipe.",
    whatToExpect: [
      "Daily dancing at Weiking ground in Shillong",
      "Formal traditional dress rather than costume",
      "An observance with its own etiquette, not a tourist show",
    ],
    travelNote:
      "It pairs easily with a standard Meghalaya itinerary, since it happens in Shillong itself. Ask before photographing dancers up close.",
    enquiry: enquiry(
      "I would like to plan a trip around Shad Suk Mynsiem in Shillong.",
    ),
    status: "mock",
  },
  {
    id: "moatsu",
    name: "Moatsu",
    state: "Nagaland",
    month: "May",
    monthLabel: "Early May",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "An Ao Naga festival held after sowing, centred on Mokokchung, marking the end of the planting season.",
    whatToExpect: [
      "Village-level celebrations rather than one large venue",
      "Songs, feasting, and a strong community rather than visitor focus",
      "Far fewer outside visitors than December",
    ],
    travelNote:
      "Mokokchung is a long drive from Dimapur. This is a good option if you want Nagaland without festival-week crowds.",
    enquiry: enquiry("I would like to plan a trip around Moatsu in Nagaland."),
    status: "mock",
  },
  {
    id: "pang-lhabsol",
    name: "Pang Lhabsol",
    state: "Sikkim",
    month: "Aug",
    monthLabel: "Usually late August or September",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "A Sikkimese festival honouring Kangchenjunga as the state's guardian, with masked warrior dances at monasteries.",
    whatToExpect: [
      "Masked chaam dances, notably at Pemayangtse and Rabong",
      "Monsoon tailing off, with cloud more likely than mountain views",
      "A local observance with relatively few outside visitors",
    ],
    travelNote:
      "West Sikkim is the place to see this. The roads are slower in the monsoon tail, so allow more time than the map suggests.",
    enquiry: enquiry("I would like to plan a trip around Pang Lhabsol."),
    status: "mock",
  },
  {
    id: "bihu-autumn",
    name: "Kati Bihu",
    state: "Assam",
    month: "Oct",
    monthLabel: "Mid-October",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "The quiet Bihu. Lamps lit in paddy fields and courtyards at a lean point in the agricultural year, with none of April's noise.",
    whatToExpect: [
      "Earthen lamps in fields and at tulsi plants after dark",
      "A subdued, domestic observance rather than a public event",
      "Good travel weather, with the monsoon over",
    ],
    travelNote:
      "This is not a spectacle and should not be sold as one. It fits well inside a normal Assam trip in October, which is when the state is at its best anyway.",
    enquiry: enquiry("I would like to plan an Assam trip around Kati Bihu."),
    status: "mock",
  },
  {
    id: "nongkrem",
    name: "Ka Pomblang Nongkrem",
    state: "Meghalaya",
    month: "Nov",
    monthLabel: "Usually November",
    timingYear: TIMING_YEAR,
    timingSource: TIMING_SOURCE,
    summary:
      "A five-day Khasi harvest and thanksgiving observance held at Smit, near Shillong.",
    whatToExpect: [
      "Ceremonies at the Syiem's residence at Smit",
      "Dance across several days, with the main day drawing crowds",
      "Cool, clear post-monsoon weather",
    ],
    travelNote:
      "Smit is close enough to Shillong to visit for a day. November is also the best month for the rest of Meghalaya, so this combines well.",
    enquiry: enquiry(
      "I would like to plan a trip around Ka Pomblang Nongkrem.",
    ),
    status: "mock",
  },
];

/** Calendar order, so the month explorer reads January to December. */
export const MONTH_ORDER = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const MONTH_NAMES: Record<(typeof MONTH_ORDER)[number], string> = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};
