import type { Review } from "@/types";

/**
 * Real customer reviews from Smarto Cabs' Google Business profile
 * (4.9 from 2,036 reviews as of 28 Sep 2026), used with RRJ's go-ahead.
 *
 * Quotes are verbatim excerpts, never edited or combined; a highlight is a
 * contiguous piece of its quote, with an ellipsis where it starts mid-way.
 * Reviewers appear by first name and last initial as Google shows them, or
 * as "Google review" where the snippet carried no name. Do not add these to
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
    quote:
      "I've been using Smarto Airport Taxi since August 2023, and my experience has been consistently excellent. The cabs are always on time, which makes airport travel completely stress-free. The fares are reasonable, especially considering they provide clean and premium cars. The drivers are experienced, polite, and professional, making every journey comfortable and safe.",
    highlight: "…makes airport travel completely stress-free.",
    status: "verified",
  },
  {
    id: "google-sayantan",
    author: "Sayantan D.",
    context: "Google, 5 stars",
    quote:
      "Good experience overall. On-time pickup, neat and well-maintained car with proper AC. Driver was courteous and drove carefully. Reasonable fare. Comfortable ride.",
    highlight: "Driver was courteous and drove carefully.",
    status: "verified",
  },
  {
    id: "google-care",
    author: "Google review",
    context: "5 stars",
    quote: "Good driver and good customer care service response.",
    highlight: "…good customer care service response.",
    status: "verified",
  },
  {
    id: "google-price",
    author: "Google review",
    context: "5 stars",
    quote:
      "Dedicated, customer service oriented service provider at affordable price.",
    highlight: "…service provider at affordable price.",
    status: "verified",
  },
  {
    id: "google-hospitality",
    author: "Google review",
    context: "5 stars",
    quote: "We need more people like him in hospitality service.",
    highlight: "We need more people like him in hospitality service.",
    status: "verified",
  },
  {
    id: "google-debobrat",
    author: "Debobrat M.",
    context: "Google, 5 stars",
    quote:
      "On time service. Very efficient and cost effective service on Airport dropping and pickup. I have used many times and the services are great. Nice experience.",
    highlight: "On time service. Very efficient and cost effective…",
    status: "verified",
  },
  {
    id: "google-arun",
    author: "Arun A.",
    context: "Google, 5 stars",
    quote:
      "Affordable and reliable service by Smarto. The smart way to travel to and from the airport. Hassle free booking, clean cabs, professional drivers and safe driving. Highly recommended.",
    highlight: "Hassle free booking, clean cabs, professional drivers…",
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
export const CAB_REVIEWS = pick(["google-debobrat", "google-arun", "google-ambarish", "google-sayantan", "google-care"]);

/*
 * Lines about the cabs themselves, for the cabs page. Each is a verbatim,
 * contiguous piece of one review above (ellipses mark a cut), checked at
 * build time so an edit to a quote cannot leave a line it no longer says.
 */
const CAB_LINES: [id: string, line: string][] = [
  ["google-ambarish", "The cabs are always on time…"],
  ["google-arun", "Hassle free booking, clean cabs, professional drivers…"],
  ["google-sayantan", "On-time pickup, neat and well-maintained car…"],
  ["google-debobrat", "On time service. Very efficient and cost effective…"],
  ["google-care", "Good driver and good customer care…"],
  ["google-ambarish", "…makes airport travel completely stress-free."],
  ["google-arun", "Affordable and reliable service by Smarto."],
  ["google-sayantan", "Driver was courteous and drove carefully."],
  ["google-ambarish", "The drivers are experienced, polite…"],
  ["google-sayantan", "Reasonable fare. Comfortable ride."],
];

export const CAB_REVIEW_LINES = CAB_LINES.map(([id, line], i) => {
  const review = GOOGLE_REVIEWS.find((r) => r.id === id);
  if (!review || !review.quote.includes(line.replaceAll("…", ""))) {
    throw new Error(`Cab review line ${i + 1} is not in review "${id}".`);
  }
  return { id: `${id}-${i}`, author: review.author, context: review.context, highlight: line };
});
