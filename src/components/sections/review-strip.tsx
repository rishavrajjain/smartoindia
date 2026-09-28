import { BoltIcon } from "@/components/ui/line-icons";
import { GOOGLE_RATING } from "@/data/reviews";
import type { Review } from "@/types";

/*
 * The green band of real Google feedback drifting past: the overall rating,
 * then one short line per tile, bolt-separated. Shared by the homepage and
 * the cabs page so both read the same. Hovering pauses it; reduced motion
 * gets a still row.
 */
export function ReviewStrip({
  reviews,
  label,
}: {
  reviews: Pick<Review, "id" | "author" | "context" | "highlight">[];
  label: string;
}) {
  return (
    <section aria-label={label} className="bg-green text-clay-deep">
      <div className="marquee-mask overflow-hidden py-3">
        <ul
          className="flex w-max items-center motion-safe:animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: `${(reviews.length + 1) * 15}s` }}
        >
          {[0, 1].map((copy) => [
            <li
              key={`${copy}-rating`}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 items-center"
            >
              <p className="flex h-[4.875rem] flex-col justify-center rounded-2xl bg-clay-deep px-5 text-bone shadow-[0_6px_16px_rgba(28,26,69,0.18)]">
                <span className="flex items-center gap-1.5 text-[1.375rem] leading-none font-extrabold">
                  {GOOGLE_RATING.score}
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-green">
                    <path d="m12 3 2.7 5.5 6 .9-4.35 4.25 1 6L12 16.8l-5.35 2.85 1-6L3.3 9.4l6-.9z" />
                  </svg>
                </span>
                <span className="mt-1 text-[0.6875rem] whitespace-nowrap text-bone/70">
                  {GOOGLE_RATING.count} Google reviews
                </span>
              </p>
              <BoltIcon className="mx-5 size-4 shrink-0 text-clay-deep/60" />
            </li>,
            ...reviews.map((review) => (
              <li
                key={`${copy}-${review.id}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center"
              >
                <figure className="flex w-[16.5rem] items-start gap-2.5 rounded-2xl bg-bone py-3 pr-3.5 pl-2.5 shadow-[0_6px_16px_rgba(28,26,69,0.12)]">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-clay-deep text-green"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                      <path d="M4 18v-5.2C4 8.6 6 6 10 5l.8 1.6C8.6 7.5 7.6 9 7.5 11H10v7zm9.5 0v-5.2c0-4.2 2-6.8 6-7.8l.8 1.6c-2.2.9-3.2 2.4-3.3 4.4h2.5v7z" />
                    </svg>
                  </span>
                  <span className="min-w-0 leading-tight">
                    <blockquote className="line-clamp-2 text-[0.8125rem] leading-snug font-extrabold text-ink">
                      {review.highlight}
                    </blockquote>
                    <figcaption className="mt-1 truncate text-[0.6875rem] text-taupe">
                      {review.author} · {review.context}
                    </figcaption>
                  </span>
                </figure>
                <BoltIcon className="mx-5 size-4 shrink-0 text-clay-deep/60" />
              </li>
            )),
          ])}
        </ul>
      </div>
    </section>
  );
}
