import { Container } from "@/components/ui/container";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, REVIEWS } from "@/data/reviews";
import type { Review } from "@/types";

/*
 * What travellers say: the real Google reviews in full, beside the overall
 * rating and a link to every review on Google. A swipe rail on phones, a
 * two-column masonry wall from tablet up.
 */

function Stars({ className }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={`flex gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
          <path d="m12 3 2.7 5.5 6 .9-4.35 4.25 1 6L12 16.8l-5.35 2.85 1-6L3.3 9.4l6-.9z" />
        </svg>
      ))}
    </span>
  );
}

export function GoogleReviews({
  reviews = REVIEWS,
  className,
}: {
  reviews?: Review[];
  className?: string;
}) {
  return (
    <section aria-labelledby="traveller-reviews" className={className}>
      <Container width="wide">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-8">
          <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-clay-deep p-6 text-bone lg:p-8">
            <div aria-hidden="true" className="spark-glow absolute -right-16 -bottom-16 -z-10 size-64 opacity-80" />
            <div>
              <p className="text-label font-extrabold text-green uppercase">Reviews</p>
              <h2 id="traveller-reviews" className="mt-3 text-[1.75rem] leading-[1.1] lg:text-[2.125rem]">
                What travellers <span className="accent">say</span>
              </h2>
            </div>
            <div className="mt-8 flex items-end gap-4 lg:block">
              <p className="text-[3.5rem] leading-none font-extrabold tracking-[-0.03em] lg:text-[4.5rem]">
                {GOOGLE_RATING.score}
              </p>
              <div className="pb-1 lg:mt-3 lg:pb-0">
                <Stars className="text-green" />
                <p className="mt-1.5 text-[0.8125rem] text-bone/70">
                  from {GOOGLE_RATING.count} Google reviews
                </p>
              </div>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-bone px-5 text-[0.875rem] font-extrabold text-ink transition-colors hover:bg-sand lg:mt-8"
            >
              Read them on Google
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:block sm:columns-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="w-[17.5rem] shrink-0 snap-start sm:mb-4 sm:w-auto sm:break-inside-avoid"
              >
                <figure className="flex h-full flex-col rounded-[1.5rem] bg-sand p-5 lg:p-6">
                  {review.rating === 5 && <Stars className="mb-3 text-green-deep" />}
                  <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-ink">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-2.5 border-t border-line pt-3.5 text-[0.8125rem]">
                    <span
                      aria-hidden="true"
                      className="grid size-9 place-items-center rounded-full bg-ink text-[0.8125rem] font-extrabold text-bone"
                    >
                      {review.author === "Google review" ? "G" : review.author[0]}
                    </span>
                    <span>
                      <b className="block font-extrabold text-ink">
                        {review.author === "Google review" ? "Google reviewer" : review.author}
                      </b>
                      <span className="text-taupe">Google review</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
