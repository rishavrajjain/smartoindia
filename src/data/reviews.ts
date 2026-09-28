import type { Review } from "@/types";

/**
 * Real customer reviews from Smarto Cabs' Google Business profile
 * (4.9 from 2,036 reviews as of 28 Sep 2026), used with RRJ's go-ahead.
 *
 * Quotes are verbatim excerpts, never edited or combined; a highlight is a
 * contiguous piece of its quote, with an ellipsis where it starts mid-way.
 * Reviewers appear by first name and last initial as Google shows them, or
 * as "Google review" where the snippet carried no name. Reviews from RRJ's
 * copy of the Google list (28 Sep 2026) came without star ratings, so they
 * carry no `rating` and show no stars. Reviews that name other cab apps,
 * drivers or staff are left out. Do not add these to
 * schema.org Review or AggregateRating markup: the ratings live on Google.
 */
export const GOOGLE_RATING = { score: "4.9", count: "2,000+" } as const;

/** Smarto Cabs on Google Maps, where every review lives. */
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=8183920777346941104";

/** Every review we quote. Pages pick from these below. */
const GOOGLE_REVIEWS: Review[] = [
  {
    id: "google-ambarish",
    author: "Ambarish G.",
    context: "Google, 5 stars",
    rating: 5,
    quote:
      "I've been using Smarto Airport Taxi since August 2023, and my experience has been consistently excellent. The cabs are always on time, which makes airport travel completely stress-free. The fares are reasonable, especially considering they provide clean and premium cars. The drivers are experienced, polite, and professional, making every journey comfortable and safe.",
    highlight: "…makes airport travel completely stress-free.",
    status: "verified",
  },
  {
    id: "google-sayantan",
    author: "Sayantan D.",
    context: "Google, 5 stars",
    rating: 5,
    quote:
      "Good experience overall. On-time pickup, neat and well-maintained car with proper AC. Driver was courteous and drove carefully. Reasonable fare. Comfortable ride.",
    highlight: "Driver was courteous and drove carefully.",
    status: "verified",
  },
  {
    id: "google-care",
    author: "Google review",
    context: "5 stars",
    rating: 5,
    quote: "Good driver and good customer care service response.",
    highlight: "…good customer care service response.",
    status: "verified",
  },
  {
    id: "google-price",
    author: "Google review",
    context: "5 stars",
    rating: 5,
    quote:
      "Dedicated, customer service oriented service provider at affordable price.",
    highlight: "…service provider at affordable price.",
    status: "verified",
  },
  {
    id: "google-hospitality",
    author: "Google review",
    context: "5 stars",
    rating: 5,
    quote: "We need more people like him in hospitality service.",
    highlight: "We need more people like him in hospitality service.",
    status: "verified",
  },
  {
    id: "google-debobrat",
    author: "Debobrat M.",
    context: "Google, 5 stars",
    rating: 5,
    quote:
      "On time service. Very efficient and cost effective service on Airport dropping and pickup. I have used many times and the services are great. Nice experience.",
    highlight: "On time service. Very efficient and cost effective…",
    status: "verified",
  },
  {
    id: "google-arun",
    author: "Arun A.",
    context: "Google, 5 stars",
    rating: 5,
    quote:
      "Affordable and reliable service by Smarto. The smart way to travel to and from the airport. Hassle free booking, clean cabs, professional drivers and safe driving. Highly recommended.",
    highlight: "Hassle free booking, clean cabs, professional drivers…",
    status: "verified",
  },  {
    id: "google-rohit",
    author: "Rohit G.",
    context: "Google review",
    quote:
      "The best cab service I used ever. I hired Innova Crysta for 3 days in Shillong from Smarto and I really enjoyed the trip. The car was super clean, AC was working perfectly, driver was such a gentleman and he was so punctual. Very flexible and professional. I loved it and will always rent from Smarto.",
    highlight: "The car was super clean, AC was working perfectly…",
    status: "verified",
  },
  {
    id: "google-anwesha",
    author: "Anwesha K.",
    context: "Google review",
    quote:
      "While in Guwahati this had been a Saviour! We may have booked them for like more than 10 times in 15 days! Each time we got Neat and clean Cabs, great no fuss, friendly drivers, reasonably priced! Fantastic and quick contact center service. Please keep up the great work guys... what feels best is my commute is pollution free.",
    highlight: "…Neat and clean Cabs, great no fuss, friendly drivers…",
    status: "verified",
  },
  {
    id: "google-bipul",
    author: "Bipul K.",
    context: "Google review",
    quote:
      "Smarto is really good and reliable. Their staff, including the drivers are polite, well behaved and always on time. Their cars are clean, always in tiptop condition. I've been using their services since inception and hope to continue, provided they keep up the good work.",
    highlight: "Their cars are clean, always in tiptop condition.",
    status: "verified",
  },
  {
    id: "google-sidhartha",
    author: "Sidhartha D.",
    context: "Google review",
    quote:
      "I had a flight at 5:00 AM and the driver came at 3:00 AM right on time to pick me up",
    highlight: "…the driver came at 3:00 AM right on time to pick me up",
    status: "verified",
  },
  {
    id: "google-jaydeep",
    author: "Jaydeep A.",
    context: "Google review",
    quote:
      "Easy to book, quick response service and value for money service cost. Plus the designated driver arrived at pick up location before time which is considered a great sign for commuting from one place to another. Highly recommend booking cabs with Smarto",
    highlight: "Easy to book, quick response service…",
    status: "verified",
  },
  {
    id: "google-dulal",
    author: "Dulal S.",
    context: "Google review",
    quote:
      "Smarto Cabs service is outstanding. They are always on time, customer friendly and comes with reasonable price. Their vehicles are very clean. Great experience.",
    highlight: "Their vehicles are very clean. Great experience.",
    status: "verified",
  },
  {
    id: "google-neil",
    author: "Neil",
    context: "Google review",
    quote:
      "A breath of fresh air among cab service providers, punctual, reliable, well behaved staff and well maintained cars.",
    highlight: "A breath of fresh air among cab service providers…",
    status: "verified",
  },
  {
    id: "google-himadri",
    author: "Himadri P.",
    context: "Google review",
    quote:
      "Ontime, budget friendly fare, nice electric car. Best ride so far.. keep up",
    highlight: "Ontime, budget friendly fare, nice electric car.",
    status: "verified",
  },
  {
    id: "google-saurabh",
    author: "Saurabh A.",
    context: "Google review",
    quote:
      "Always had good experience with Smarto. Always on time and good cabs. No hassle of bargaining. Not very costly.",
    highlight: "Always on time and good cabs. No hassle of bargaining.",
    status: "verified",
  },
  {
    id: "google-gautam",
    author: "Gautam M.",
    context: "Google review",
    quote:
      "A reliable cab service provider. Used multiple times. Very well behaved drivers and no overcharging issues ever.",
    highlight: "…no overcharging issues ever.",
    status: "verified",
  },
];

function pick(ids: string[]): Review[] {
  return ids.map((id) => {
    const review = GOOGLE_REVIEWS.find((r) => r.id === id);
    if (!review) throw new Error(`No review "${id}".`);
    return review;
  });
}

/** The homepage and service pages. */
export const REVIEWS = pick(["google-ambarish", "google-sayantan", "google-care", "google-price", "google-hospitality"]);

/** The cabs page: only reviews about the rides themselves. */
export const CAB_REVIEWS = pick([
  "google-rohit",
  "google-anwesha",
  "google-bipul",
  "google-sidhartha",
  "google-debobrat",
  "google-jaydeep",
  "google-arun",
  "google-dulal",
]);

/*
 * Lines about the cabs themselves, for the cabs page. Each is a verbatim,
 * contiguous piece of one review above (ellipses mark a cut), checked at
 * build time so an edit to a quote cannot leave a line it no longer says.
 */
const CAB_LINES: [id: string, line: string][] = [
  ["google-rohit", "The car was super clean, AC was working perfectly…"],
  ["google-bipul", "Their cars are clean, always in tiptop condition."],
  ["google-sayantan", "On-time pickup, neat and well-maintained car…"],
  ["google-neil", "A breath of fresh air among cab service providers…"],
  ["google-himadri", "Ontime, budget friendly fare, nice electric car."],
  ["google-arun", "Hassle free booking, clean cabs, professional drivers…"],
  ["google-sidhartha", "…the driver came at 3:00 AM right on time…"],
  ["google-saurabh", "Always on time and good cabs. No hassle of bargaining."],
  ["google-debobrat", "On time service. Very efficient and cost effective…"],
  ["google-gautam", "…no overcharging issues ever."],
  ["google-ambarish", "The cabs are always on time…"],
  ["google-dulal", "Their vehicles are very clean. Great experience."],
  ["google-care", "Good driver and good customer care…"],
]

export const CAB_REVIEW_LINES = CAB_LINES.map(([id, line], i) => {
  const review = GOOGLE_REVIEWS.find((r) => r.id === id);
  if (!review || !review.quote.includes(line.replaceAll("…", ""))) {
    throw new Error(`Cab review line ${i + 1} is not in review "${id}".`);
  }
  return { id: `${id}-${i}`, author: review.author, context: review.context, highlight: line };
});
