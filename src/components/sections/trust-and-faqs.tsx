import { FaqSection } from "@/components/sections/faq-section";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { WhySmarto } from "@/components/sections/why-smarto";
import type { Faq } from "@/data/faqs";
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
  className,
}: {
  faqs: Faq[];
  location: CtaLocation;
  /** Include "Why book through Smarto". */
  why?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-16 lg:space-y-24", className)}>
      {why && <WhySmarto />}
      <GoogleReviews />
      <FaqSection faqs={faqs} location={location} />
    </div>
  );
}
