import type { Review } from "@/types";

/**
 * Real customer reviews from Smarto Cabs' Google Business profile
 * (4.9 from 2,032 reviews as of 27 Sep 2026), used with RRJ's go-ahead.
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

export const REVIEWS: Review[] = [
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
];
