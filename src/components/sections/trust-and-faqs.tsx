import { FaqSection } from "@/components/sections/faq-section";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { WhySmarto } from "@/components/sections/why-smarto";
import type { Faq } from "@/data/faqs";
import type { Review } from "@/types";
import { cn } from "@/lib/cn";
import type { CtaLocation } from "@/lib/whatsapp";

/*
 * The closing run shared by the homepage and every service page: why book
 * through Smarto, the Google reviews, and the page's own questions.
 */
export function TrustAndFaqs({
  faqs,
  location,
  why = true,
  reviews,
  className,
}: {
  faqs: Faq[];
  location: CtaLocation;
  /** Include "Why book through Smarto". */
  why?: boolean;
  /** The Google reviews to show; the general set by default. */
  reviews?: Review[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-16 lg:space-y-24", className)}>
      {why && <WhySmarto />}
      <GoogleReviews reviews={reviews} />
      <FaqSection faqs={faqs} location={location} />
    </div>
  );
}
