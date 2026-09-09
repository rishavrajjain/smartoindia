import type { Review } from "@/types";

/**
 * Illustrative traveller feedback.
 *
 * PLACEHOLDER CONTENT, NOT REAL CUSTOMERS.
 *
 * Every entry below is written by the build team using a fictional first name
 * and a generic trip context. None of it is a verified booking, none of it may
 * be used in schema.org Review or AggregateRating markup, and the UI must keep
 * labelling this section as illustrative until Manav supplies real, attributable
 * feedback with permission to publish it.
 */
export const REVIEWS: Review[] = [
  {
    id: "review-1",
    author: "Ananya",
    context: "Meghalaya, five days",
    quote:
      "They talked us out of the itinerary we asked for and suggested a shorter one. It was the right call. We saw less and enjoyed it considerably more.",
    status: "mock",
  },
  {
    id: "review-2",
    author: "Rohit",
    context: "Kaziranga, long weekend",
    quote:
      "The driver knew which gate to be at and when. We were through and into the park while other vehicles were still queueing.",
    status: "mock",
  },
  {
    id: "review-3",
    author: "A family from Bengaluru",
    context: "Meghalaya at an easy pace",
    quote:
      "We travelled with a four-year-old and my parents. Nobody planned a single thing around us being slow, except Smarto, who planned everything around it.",
    status: "mock",
  },
  {
    id: "review-4",
    author: "Meera",
    context: "Tawang, eight days",
    quote:
      "Sela was shut on our day. They told us at breakfast instead of driving us up there to find out, and rearranged the rest without fuss.",
    status: "mock",
  },
  {
    id: "review-5",
    author: "An operations team",
    context: "Corporate offsite transport",
    quote:
      "Eleven people, three pickup points, one invoice at the end of the month. That was the whole reason we switched.",
    status: "mock",
  },
  {
    id: "review-6",
    author: "Tenzin",
    context: "North Sikkim, six days",
    quote:
      "Permits were done before we landed. I have done this trip the other way and it cost me a full day in an office.",
    status: "mock",
  },
];
