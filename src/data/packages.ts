import type { TravelPackage } from "@/types";
import { enquiry } from "@/lib/whatsapp";

import { IMAGES } from "./images";

/**
 * Travel package catalog.
 *
 * PLACEHOLDER CONTENT. Every record is `status: "mock"` — routes, timings, and
 * inclusions were written by the build team as a credible starting shape, not
 * supplied by Smarto. Manav owns the real catalog; replace these records in
 * place and flip `status` to `"verified"` as each one is confirmed.
 *
 * Never add a price. `priceLabel` stays "Request a quote" for the MVP.
 */
const PRICE_LABEL = "Request a quote";

export const PACKAGES: TravelPackage[] = [
  {
    slug: "meghalaya-waterfalls-and-caves",
    title: "Meghalaya waterfalls and caves",
    summary:
      "The classic Shillong–Cherrapunji–Dawki loop at a pace that leaves room for weather, with the gorge viewpoints timed for morning light.",
    state: "Meghalaya",
    destinations: ["Shillong", "Cherrapunji", "Mawlynnong", "Dawki"],
    durationDays: 5,
    durationLabel: "5 days, 4 nights",
    idealFor: ["Couples", "Small groups", "Families"],
    bestSeason: ["Sep", "Oct", "Nov", "Feb", "Mar"],
    bestSeasonLabel: "September to November, and February to March",
    hero: IMAGES.meghalayaWaterfalls,
    highlights: [
      "Cherrapunji's gorge viewpoints early, before the cloud closes in",
      "A guided walk into a limestone cave system with a local caver",
      "The Umngot river at Dawki, on the quieter upstream stretch",
      "An unhurried afternoon in Shillong's older lanes and cafés",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Guwahati, drive to Shillong",
        description:
          "Airport pickup and a three-hour climb into the hills, with a stop at Umiam lake. Evening free to walk the Laitumkhrah lanes and adjust to the altitude and the cooler air.",
        stay: "Shillong",
      },
      {
        day: 2,
        title: "Shillong to Cherrapunji",
        description:
          "A short drive out to the plateau edge. Afternoon at the Nohkalikai and Seven Sisters viewpoints, then the Mawsmai cave. We keep the order flexible. In this region the cloud decides what is worth seeing when.",
        stay: "Cherrapunji",
      },
      {
        day: 3,
        title: "Gorge morning and Mawlynnong",
        description:
          "Early start for the gorge before the mist rises. Later, the drive east to Mawlynnong through betel-nut country, with time at the village and a stop at a viewpoint over the Bangladesh plains.",
        stay: "Mawlynnong or Dawki",
      },
      {
        day: 4,
        title: "Dawki and the Umngot",
        description:
          "A boat hour on the Umngot, started early while the water is still and the day boats have not arrived. Afternoon return to Shillong with stops as you like them.",
        stay: "Shillong",
      },
      {
        day: 5,
        title: "Shillong to Guwahati, depart",
        description:
          "A relaxed morning, then the drive down to Guwahati for your flight or train. We build in a buffer for the Shillong–Guwahati road, which is reliable but not quick.",
        stay: null,
      },
    ],
    inclusions: [
      "Private vehicle with driver for the full itinerary",
      "Airport and station transfers at both ends",
      "Accommodation as described, on twin sharing",
      "Daily breakfast",
      "Fuel, tolls, permits, and driver expenses",
    ],
    exclusions: [
      "Flights and trains to and from Guwahati",
      "Lunches, dinners, and anything you drink",
      "Entry tickets, boat hire, and cave fees",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "A mix of small hotels and family-run guesthouses, chosen for location and cleanliness rather than star rating. Cherrapunji options are simpler than Shillong ones. That is the trade-off for waking up at the gorge.",
    transportNotes:
      "One vehicle and one driver for the whole trip, so your luggage stays put. Hill roads here are narrow and wet for much of the year; we plan shorter driving days than the distances suggest.",
    tags: ["Nature", "Road trip", "Culture"],
    featured: true,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry(
      "I would like a quote for the 5-day Meghalaya waterfalls and caves trip.",
    ),
    status: "mock",
  },

  {
    slug: "living-root-bridges-and-villages",
    title: "Living root bridges and villages",
    summary:
      "A short walking trip built around the root bridges of the southern slopes, with two nights in villages rather than a day trip and a long drive back.",
    state: "Meghalaya",
    destinations: ["Shillong", "Tyrna", "Nongriat", "Cherrapunji"],
    durationDays: 4,
    durationLabel: "4 days, 3 nights",
    idealFor: ["Couples", "Small groups", "Solo travellers"],
    bestSeason: ["Oct", "Nov", "Dec", "Feb", "Mar"],
    bestSeasonLabel: "October to December, and February to March",
    hero: IMAGES.meghalayaRootBridge,
    highlights: [
      "The descent to Nongriat, walked over two days instead of one",
      "A night in the valley, after the day visitors have climbed out",
      "Swimming holes on the stream below the double-decker bridge",
      "Slow time in villages that most itineraries drive straight past",
    ],
    itinerary: [
      {
        day: 1,
        title: "Guwahati to Shillong",
        description:
          "Pickup and the drive up. We use the afternoon to sort out what you will actually carry down. The descent is much better with a small bag.",
        stay: "Shillong",
      },
      {
        day: 2,
        title: "Drive to Tyrna, descend to Nongriat",
        description:
          "Morning drive to the trailhead, then the stepped descent into the valley with a local guide. It is roughly 3,000 steps down and it takes as long as it takes. Afternoon at the double-decker bridge once the day crowd has gone.",
        stay: "Nongriat",
      },
      {
        day: 3,
        title: "Valley morning, climb out",
        description:
          "An early walk to the Rainbow Falls pool if you are up for it, then the climb back to Tyrna in the cooler part of the day. Evening in Cherrapunji with nothing scheduled.",
        stay: "Cherrapunji",
      },
      {
        day: 4,
        title: "Cherrapunji to Guwahati, depart",
        description:
          "Gorge viewpoints on the way out if the sky is clear, then the drive down to Guwahati.",
        stay: null,
      },
    ],
    inclusions: [
      "Private vehicle with driver on all road days",
      "Local trekking guide for the Nongriat descent and climb",
      "Village guesthouse night at Nongriat",
      "Hotel nights in Shillong and Cherrapunji, daily breakfast",
      "Fuel, tolls, permits, and driver expenses",
    ],
    exclusions: [
      "Flights and trains to and from Guwahati",
      "Most meals in the valley, which are simple and paid locally",
      "Porter hire, if you decide you want one",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "The Nongriat night is a basic village guesthouse: shared bathrooms, limited electricity, and no network. That is the point of it. The Shillong and Cherrapunji nights are ordinary comfortable hotels.",
    transportNotes:
      "Vehicle access ends at Tyrna. Everything past that is on foot, on steps that are steep, wet, and unforgiving on knees. Tell us your fitness honestly and we will shape the days around it.",
    tags: ["Nature", "Slow travel", "Culture"],
    featured: true,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry(
      "I would like a quote for the 4-day living root bridges trip.",
    ),
    status: "mock",
  },

  {
    slug: "meghalaya-easy-family-loop",
    title: "Meghalaya at an easy pace",
    summary:
      "The same hills without the long walks or early starts. Built for families travelling with young children or grandparents.",
    state: "Meghalaya",
    destinations: ["Shillong", "Umiam", "Cherrapunji", "Mawphlang"],
    durationDays: 5,
    durationLabel: "5 days, 4 nights",
    idealFor: ["Families", "Couples"],
    bestSeason: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    bestSeasonLabel: "October to March",
    hero: IMAGES.meghalayaFamily,
    highlights: [
      "Short drives, late starts, and no day longer than four hours on the road",
      "The sacred grove at Mawphlang, which is a flat and shaded walk",
      "A boat hour at Umiam lake",
      "Viewpoints that are reachable without a descent",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Guwahati, drive to Shillong",
        description:
          "Pickup at your own pace, with a lake stop at Umiam on the way up. Nothing else planned for the day.",
        stay: "Shillong",
      },
      {
        day: 2,
        title: "Around Shillong",
        description:
          "A local day: the Don Bosco museum for a broad introduction to the region's communities, lunch in town, and an easy afternoon at Ward's Lake or the golf course road.",
        stay: "Shillong",
      },
      {
        day: 3,
        title: "Mawphlang and the plateau",
        description:
          "The sacred grove at Mawphlang with a local guide is flat, shaded, and genuinely interesting for children. Afternoon drive to Cherrapunji.",
        stay: "Cherrapunji",
      },
      {
        day: 4,
        title: "Cherrapunji viewpoints",
        description:
          "Morning at the gorge viewpoints, all of them reachable from the car park. Optional short cave visit. Afternoon back to Shillong.",
        stay: "Shillong",
      },
      {
        day: 5,
        title: "Shillong to Guwahati, depart",
        description:
          "Unhurried morning, then down to Guwahati with a generous buffer before your flight.",
        stay: null,
      },
    ],
    inclusions: [
      "Private vehicle with driver for the full itinerary",
      "Airport and station transfers",
      "Accommodation as described, with family rooms where available",
      "Daily breakfast",
      "Local guide at Mawphlang",
      "Fuel, tolls, permits, and driver expenses",
    ],
    exclusions: [
      "Flights and trains to and from Guwahati",
      "Lunches and dinners",
      "Entry tickets and boat hire",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "Hotels rather than guesthouses on this one, chosen for lifts, hot water, and rooms that can take an extra bed. Tell us ages and we will confirm what each property allows.",
    transportNotes:
      "We keep driving to short stretches with regular stops. If anyone in the group gets carsick on hill roads, say so when you enquire. It changes which route we take out of Shillong.",
    tags: ["Easy pace", "Nature", "Slow travel"],
    featured: false,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry(
      "I would like a quote for the 5-day easy-pace Meghalaya trip for my family.",
    ),
    status: "mock",
  },

  {
    slug: "kaziranga-and-the-brahmaputra",
    title: "Kaziranga and the Brahmaputra",
    summary:
      "Two full days of safari at different ranges, plus river time at Guwahati. Short, and built around when the animals are actually out.",
    state: "Assam",
    destinations: ["Guwahati", "Kaziranga", "Kohora", "Bagori"],
    durationDays: 4,
    durationLabel: "4 days, 3 nights",
    idealFor: ["Couples", "Families", "Small groups"],
    bestSeason: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    bestSeasonLabel: "November to April, when the park is open",
    hero: IMAGES.assamKaziranga,
    highlights: [
      "Two morning safaris in different ranges, which see different animals",
      "An elephant-grass landscape most people have only seen in photographs",
      "A slow evening on the Brahmaputra at Guwahati",
      "Tea and a walk through a working garden on the way back",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Guwahati, drive to Kaziranga",
        description:
          "Pickup and the four-and-a-half-hour drive east along the river plain. Evening arrival and an early night. The safari start is genuinely early.",
        stay: "Kaziranga",
      },
      {
        day: 2,
        title: "Central range, then Western range",
        description:
          "Dawn jeep safari in the Kohora range while the mist is still on the grass. Rest through the middle of the day, then an afternoon drive in a second range.",
        stay: "Kaziranga",
      },
      {
        day: 3,
        title: "Second safari and the drive back",
        description:
          "One more morning drive, then a stop at a tea garden on the road west. Afternoon arrival in Guwahati and an evening on the river.",
        stay: "Guwahati",
      },
      {
        day: 4,
        title: "Guwahati, depart",
        description:
          "Morning at Kamakhya or the river market if there is time, then the airport.",
        stay: null,
      },
    ],
    inclusions: [
      "Private vehicle with driver for the full itinerary",
      "Airport transfers",
      "Three jeep safaris with park entry and range fees",
      "Accommodation as described, daily breakfast",
      "Fuel, tolls, and driver expenses",
    ],
    exclusions: [
      "Flights and trains to and from Guwahati",
      "Lunches and dinners",
      "Camera fees where charged separately",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "Lodges near the Kohora gate, so the pre-dawn start does not also involve an hour in the car. Rooms are comfortable rather than luxurious.",
    transportNotes:
      "Safaris are in park-registered jeeps, which are not the vehicle you arrive in. That is a park rule, not a choice. Your own vehicle and driver stay with you for everything else.",
    tags: ["Wildlife", "Nature", "Easy pace"],
    featured: true,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry(
      "I would like a quote for the 4-day Kaziranga and Brahmaputra trip.",
    ),
    status: "mock",
  },

  {
    slug: "upper-assam-tea-and-river-towns",
    title: "Upper Assam tea and river towns",
    summary:
      "Jorhat, Majuli, and Sivasagar at a reading pace. For travellers who would rather understand one place than photograph six.",
    state: "Assam",
    destinations: ["Jorhat", "Majuli", "Sivasagar", "Dibrugarh"],
    durationDays: 6,
    durationLabel: "6 days, 5 nights",
    idealFor: ["Couples", "Solo travellers", "Small groups"],
    bestSeason: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    bestSeasonLabel: "November to March",
    hero: IMAGES.assamTea,
    highlights: [
      "Two nights on Majuli, reached by the vehicle ferry",
      "A satra visit with time to actually sit and watch a rehearsal",
      "Ahom-era tanks and temples at Sivasagar, largely to yourself",
      "A working tea estate, seen on a weekday when plucking is happening",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Jorhat",
        description:
          "Fly into Jorhat or arrive by road from Guwahati. An easy first evening; the town is small and walkable.",
        stay: "Jorhat",
      },
      {
        day: 2,
        title: "Ferry to Majuli",
        description:
          "The morning ferry across the Brahmaputra with the vehicle. Afternoon at one of the satras, and a slow cycle or walk between villages as the light drops.",
        stay: "Majuli",
      },
      {
        day: 3,
        title: "Majuli",
        description:
          "A full unstructured day: mask-making at Samaguri, a second satra, potters at Salmora, and a lot of flat riverine landscape in between.",
        stay: "Majuli",
      },
      {
        day: 4,
        title: "Majuli to Sivasagar",
        description:
          "Ferry back and drive east to Sivasagar. Afternoon at the Rang Ghar and the Talatal Ghar, which are quiet on most days.",
        stay: "Sivasagar",
      },
      {
        day: 5,
        title: "Sivasagar to Dibrugarh, tea country",
        description:
          "The Sivasagar tanks in the morning, then east into tea country. Afternoon on a working estate, with a walk through the garden and a tasting.",
        stay: "Dibrugarh",
      },
      {
        day: 6,
        title: "Dibrugarh, depart",
        description:
          "Morning at leisure, then transfer to Dibrugarh airport.",
        stay: null,
      },
    ],
    inclusions: [
      "Private vehicle with driver for the full itinerary",
      "Vehicle ferry crossings to and from Majuli",
      "Airport transfers at Jorhat and Dibrugarh",
      "Accommodation as described, daily breakfast",
      "Fuel, tolls, and driver expenses",
    ],
    exclusions: [
      "Flights to Jorhat and out of Dibrugarh",
      "Lunches and dinners",
      "Satra donations and entry tickets",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "Majuli accommodation is in bamboo cottages and homestays. They are comfortable and clean, but simple. The Jorhat and Dibrugarh nights can be in a tea bungalow if you would like that; say so when you enquire.",
    transportNotes:
      "The Majuli ferry runs to a schedule that shifts with the river level and stops entirely in bad weather. We build a buffer around it and will tell you honestly if a crossing looks doubtful.",
    tags: ["Slow travel", "Culture", "Nature"],
    featured: false,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry(
      "I would like a quote for the 6-day Upper Assam tea and river towns trip.",
    ),
    status: "mock",
  },

  {
    slug: "tawang-high-passes",
    title: "Tawang and the high passes",
    summary:
      "The long road to Tawang, driven at a sane altitude gain. Permits, weather, and acclimatisation handled rather than hoped for.",
    state: "Arunachal Pradesh",
    destinations: ["Tezpur", "Dirang", "Sela Pass", "Tawang", "Bomdila"],
    durationDays: 8,
    durationLabel: "8 days, 7 nights",
    idealFor: ["Couples", "Small groups", "Solo travellers"],
    bestSeason: ["Apr", "May", "Jun", "Sep", "Oct"],
    bestSeasonLabel: "April to June, and September to October",
    hero: IMAGES.arunachalTawang,
    highlights: [
      "Sela Pass crossed in the morning, when it is most likely to be open",
      "Two nights in Tawang, so the monastery is not a rushed stop",
      "The Dirang valley on the way up and again on the way down",
      "A route planned around altitude rather than against it",
    ],
    itinerary: [
      {
        day: 1,
        title: "Guwahati to Tezpur",
        description:
          "An easy first day on the plains, crossing the Brahmaputra. Evening in Tezpur. We complete your Inner Line Permit paperwork here.",
        stay: "Tezpur",
      },
      {
        day: 2,
        title: "Tezpur to Dirang",
        description:
          "Into the hills through Bhalukpong and Bomdila. A long day on the road but a steady climb, ending around 1,500 metres.",
        stay: "Dirang",
      },
      {
        day: 3,
        title: "Dirang",
        description:
          "A deliberate rest day at moderate altitude is the single biggest thing that makes the rest of this trip pleasant. Hot springs, the old dzong, and the valley floor.",
        stay: "Dirang",
      },
      {
        day: 4,
        title: "Dirang to Tawang over Sela",
        description:
          "An early start for the pass at around 4,170 metres, then down past Jaswant Garh into Tawang. Short stops only at the top; you will feel the altitude.",
        stay: "Tawang",
      },
      {
        day: 5,
        title: "Tawang",
        description:
          "The monastery in the morning, when the light is best and the day buses have not arrived. Afternoon free, deliberately, to let the altitude settle.",
        stay: "Tawang",
      },
      {
        day: 6,
        title: "Tawang valleys",
        description:
          "A day out towards the high lakes and the Bumla road if permits and conditions allow, or the Gorichen viewpoints if they do not. This day is weather-dependent and we will say so on the morning.",
        stay: "Tawang",
      },
      {
        day: 7,
        title: "Tawang to Bomdila",
        description:
          "Back over Sela in the morning and down to Bomdila, with a stop at the Dirang valley on the way.",
        stay: "Bomdila",
      },
      {
        day: 8,
        title: "Bomdila to Guwahati, depart",
        description:
          "The long descent to the plains and on to Guwahati. A full driving day; we book late flights only.",
        stay: null,
      },
    ],
    inclusions: [
      "Private high-clearance vehicle with a driver experienced on this road",
      "Inner Line Permit processing for Indian nationals",
      "Accommodation as described, daily breakfast",
      "Fuel, tolls, permits, and driver expenses",
      "Airport transfers at Guwahati",
    ],
    exclusions: [
      "Flights and trains to and from Guwahati",
      "Lunches and dinners",
      "Protected Area Permit fees for foreign nationals, which we can arrange separately",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "Hotels in Tawang and Dirang are modest and heating is limited. Bring layers rather than expecting a warm room. Hot water is usually available but sometimes only in the evening.",
    transportNotes:
      "Sela Pass closes without warning for snow and roadworks, sometimes for a full day. If it does, we stop where it is safe and pick the itinerary back up; we will not push a closed pass. Anyone with a heart or lung condition should speak to a doctor before booking this route.",
    tags: ["High altitude", "Road trip", "Nature"],
    featured: true,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry("I would like a quote for the 8-day Tawang trip."),
    status: "mock",
  },

  {
    slug: "north-sikkim-valleys",
    title: "North Sikkim valleys",
    summary:
      "Gangtok, Lachen, and Lachung with the permit work done in advance and enough time at altitude to enjoy the valleys rather than endure them.",
    state: "Sikkim",
    destinations: ["Gangtok", "Lachen", "Lachung", "Yumthang"],
    durationDays: 6,
    durationLabel: "6 days, 5 nights",
    idealFor: ["Couples", "Small groups", "Families"],
    bestSeason: ["Mar", "Apr", "May", "Oct", "Nov"],
    bestSeasonLabel: "March to May, and October to November",
    hero: IMAGES.sikkimNorth,
    highlights: [
      "Yumthang valley in the morning, before the day vehicles arrive",
      "A night each at Lachen and Lachung rather than a single rushed loop",
      "The Teesta road north, which is the best part of the drive",
      "Gangtok bookends with time to actually walk around",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bagdogra to Gangtok",
        description:
          "Airport pickup and the four-hour drive up the Teesta. Evening on MG Marg. Permit paperwork for the north is completed today.",
        stay: "Gangtok",
      },
      {
        day: 2,
        title: "Gangtok",
        description:
          "Rumtek in the morning, then an easy afternoon in town. A useful acclimatisation day before going north.",
        stay: "Gangtok",
      },
      {
        day: 3,
        title: "Gangtok to Lachen",
        description:
          "North along the Teesta through Chungthang. A long but spectacular drive, arriving in the afternoon at around 2,700 metres.",
        stay: "Lachen",
      },
      {
        day: 4,
        title: "Gurudongmar or Chopta, then Lachung",
        description:
          "A very early start north if the road and your acclimatisation both allow it; the Chopta valley is the alternative and is no consolation prize. Afternoon transfer to Lachung.",
        stay: "Lachung",
      },
      {
        day: 5,
        title: "Yumthang, then Gangtok",
        description:
          "Early run up the Yumthang valley, then the long drive back south to Gangtok.",
        stay: "Gangtok",
      },
      {
        day: 6,
        title: "Gangtok to Bagdogra, depart",
        description:
          "Morning descent to the plains for your flight, with a buffer for the Teesta road.",
        stay: null,
      },
    ],
    inclusions: [
      "Private vehicle with driver, plus the shared north-Sikkim vehicle where regulations require it",
      "Protected area permits for North Sikkim for Indian nationals",
      "Accommodation as described, daily breakfast",
      "Bagdogra airport transfers",
      "Fuel, tolls, and driver expenses",
    ],
    exclusions: [
      "Flights to and from Bagdogra",
      "Lunches and dinners",
      "Gurudongmar entry where charged",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "Lachen and Lachung accommodation is basic by design. These are small high villages, and rooms there are heated by blanket rather than radiator. Gangtok nights are ordinary comfortable hotels.",
    transportNotes:
      "North Sikkim regulations change and sometimes close routes at short notice, particularly to Gurudongmar. Foreign nationals face additional restrictions in the north; tell us your nationality when you enquire so we plan a route you can actually take.",
    tags: ["High altitude", "Nature", "Road trip"],
    featured: false,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry("I would like a quote for the 6-day North Sikkim trip."),
    status: "mock",
  },

  {
    slug: "nagaland-hills-and-hornbill",
    title: "Nagaland hills, timed for Hornbill",
    summary:
      "Kohima and the surrounding villages during the December festival week, with accommodation booked far enough ahead to be somewhere sensible.",
    state: "Nagaland",
    destinations: ["Dimapur", "Kohima", "Kisama", "Khonoma"],
    durationDays: 6,
    durationLabel: "6 days, 5 nights",
    idealFor: ["Couples", "Small groups", "Solo travellers"],
    bestSeason: ["Dec"],
    bestSeasonLabel: "First half of December, for the festival",
    hero: IMAGES.nagalandHills,
    highlights: [
      "Festival days at Kisama, arriving early enough to see the morning programme",
      "Khonoma, and a day away from the crowds",
      "The Kohima war cemetery, which deserves more than twenty minutes",
      "Village stays where the evening is the point",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Dimapur, drive to Kohima",
        description:
          "Pickup and the climb into the hills. Evening in Kohima to settle in. The town is busy during festival week and we plan around that.",
        stay: "Kohima",
      },
      {
        day: 2,
        title: "Festival day at Kisama",
        description:
          "A full day at the heritage village. We go early for the morning programme, break in the middle of the day, and return for the evening if you want to.",
        stay: "Kohima",
      },
      {
        day: 3,
        title: "Kohima and a second festival day",
        description:
          "The war cemetery and the older parts of town in the morning, then back to Kisama for whichever performances you missed.",
        stay: "Kohima",
      },
      {
        day: 4,
        title: "Khonoma",
        description:
          "Out to Khonoma for the terraces, the forest reserve, and a considerably quieter day. Overnight in the village.",
        stay: "Khonoma",
      },
      {
        day: 5,
        title: "Khonoma to Kohima",
        description:
          "A morning walk through the terraces, then back to Kohima. Last evening free.",
        stay: "Kohima",
      },
      {
        day: 6,
        title: "Kohima to Dimapur, depart",
        description:
          "The drive down to Dimapur for your flight or train, with a generous buffer for festival-week traffic.",
        stay: null,
      },
    ],
    inclusions: [
      "Private vehicle with driver for the full itinerary",
      "Inner Line Permit processing for Indian nationals",
      "Accommodation as described, daily breakfast",
      "Dimapur airport and station transfers",
      "Fuel, tolls, and driver expenses",
    ],
    exclusions: [
      "Flights and trains to and from Dimapur",
      "Festival entry tickets",
      "Lunches and dinners",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "Kohima fills up completely during festival week. Booking three to four months ahead is the difference between staying in town and staying an hour outside it. Khonoma is a village homestay.",
    transportNotes:
      "Kisama is about half an hour from Kohima and the road is slow during the festival. We leave early rather than sit in it.",
    tags: ["Festival", "Culture", "Nature"],
    featured: false,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry(
      "I would like a quote for the 6-day Nagaland trip during the Hornbill festival.",
    ),
    status: "mock",
  },

  {
    slug: "northeast-grand-circuit",
    title: "The Northeast grand circuit",
    summary:
      "Assam, Meghalaya, and Arunachal across twelve days. One long trip instead of three short ones, with rest days built in rather than bolted on.",
    state: "Multi-state",
    destinations: [
      "Guwahati",
      "Shillong",
      "Cherrapunji",
      "Kaziranga",
      "Tezpur",
      "Dirang",
      "Tawang",
    ],
    durationDays: 12,
    durationLabel: "12 days, 11 nights",
    idealFor: ["Couples", "Small groups"],
    bestSeason: ["Oct", "Nov", "Mar", "Apr"],
    bestSeasonLabel: "October to November, and March to April",
    hero: IMAGES.northeastCircuit,
    highlights: [
      "Three states without three sets of flights",
      "Kaziranga and Tawang in the same trip, sequenced so the altitude works",
      "Two genuine rest days, in Shillong and Dirang",
      "One vehicle and one driver for the whole route",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Guwahati",
        description:
          "Pickup, an easy evening on the river, and a briefing on the road ahead.",
        stay: "Guwahati",
      },
      {
        day: 2,
        title: "Guwahati to Shillong",
        description:
          "Up into Meghalaya with a stop at Umiam. Afternoon free in Shillong.",
        stay: "Shillong",
      },
      {
        day: 3,
        title: "Shillong to Cherrapunji",
        description:
          "The plateau edge, the gorge viewpoints, and a limestone cave. Overnight at Cherrapunji.",
        stay: "Cherrapunji",
      },
      {
        day: 4,
        title: "Cherrapunji and Dawki",
        description:
          "A gorge morning, then east to the Umngot for a boat hour before returning to Shillong.",
        stay: "Shillong",
      },
      {
        day: 5,
        title: "Rest day in Shillong",
        description:
          "Nothing scheduled. Walk, eat, or do very little; the second half of this trip is demanding.",
        stay: "Shillong",
      },
      {
        day: 6,
        title: "Shillong to Kaziranga",
        description:
          "Down to the plains and east along the river to the park. Evening arrival.",
        stay: "Kaziranga",
      },
      {
        day: 7,
        title: "Kaziranga safaris",
        description:
          "A dawn jeep safari in the central range and a second drive in the afternoon.",
        stay: "Kaziranga",
      },
      {
        day: 8,
        title: "Kaziranga to Dirang",
        description:
          "West and then north into Arunachal, climbing through Bomdila. A long day; the permits are already done.",
        stay: "Dirang",
      },
      {
        day: 9,
        title: "Rest day in Dirang",
        description:
          "A deliberate acclimatisation day at around 1,500 metres before the pass.",
        stay: "Dirang",
      },
      {
        day: 10,
        title: "Dirang to Tawang over Sela",
        description:
          "The pass in the morning, then down into Tawang.",
        stay: "Tawang",
      },
      {
        day: 11,
        title: "Tawang",
        description:
          "The monastery early, the valleys afterwards if conditions allow.",
        stay: "Tawang",
      },
      {
        day: 12,
        title: "Tawang to Guwahati, depart",
        description:
          "The long drive out, or an internal flight from Tezpur if you would rather not repeat the road. We will price both.",
        stay: null,
      },
    ],
    inclusions: [
      "Private high-clearance vehicle and one driver for the whole route",
      "Inner Line Permit processing for Indian nationals",
      "All accommodation as described, daily breakfast",
      "Three jeep safaris at Kaziranga with park fees",
      "Fuel, tolls, permits, and driver expenses",
    ],
    exclusions: [
      "Flights and trains to and from Guwahati",
      "Lunches and dinners",
      "Entry tickets, boat hire, and cave fees",
      "Optional internal flight on the final day",
      "Travel insurance and personal expenses",
    ],
    stayNotes:
      "Standards vary a lot across twelve days: comfortable hotels in Guwahati and Shillong, lodges at Kaziranga, and modest heated-by-blanket rooms in Dirang and Tawang. We would rather tell you that now than have you discover it on day nine.",
    transportNotes:
      "This is roughly 1,600 kilometres of hill and plains driving. The rest days are not padding. If you want to compress it below twelve days we will plan it, but we will also tell you what you are giving up.",
    tags: ["Road trip", "Nature", "Culture", "High altitude"],
    featured: true,
    priceLabel: PRICE_LABEL,
    enquiry: enquiry(
      "I would like a quote for the 12-day Northeast grand circuit.",
    ),
    status: "mock",
  },
];

export function getPackage(slug: string): TravelPackage | undefined {
  return PACKAGES.find((item) => item.slug === slug);
}

export const FEATURED_PACKAGES = PACKAGES.filter((item) => item.featured);
