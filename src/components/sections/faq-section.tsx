import { Container } from "@/components/ui/container";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import type { Faq } from "@/data/faqs";
import { type CtaLocation, enquiry } from "@/lib/whatsapp";

/*
 * Frequently asked questions as a native accordion: <details> works without
 * JavaScript, opens with the keyboard, and the shared name lets only one
 * answer stand open at a time where the browser supports it.
 */
export function FaqSection({
  faqs,
  location,
  className,
}: {
  faqs: Faq[];
  location: CtaLocation;
  className?: string;
}) {
  return (
    <section aria-labelledby="faqs" className={className}>
      <Container width="wide">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="text-label font-extrabold text-clay uppercase">FAQs</p>
            <h2 id="faqs" className="mt-3 text-[1.875rem] leading-[1.08] lg:text-[2.5rem]">
              Questions, <span className="accent">answered</span>
            </h2>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-taupe">
              Something we have not covered? Ask us; a real person replies.
            </p>
            <WaCta
              message={enquiry("I have a question before I book:")}
              location={location}
              subject="faq"
              className="mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-[0.875rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
            >
              <WhatsAppIcon />
              Ask on WhatsApp
            </WaCta>
          </div>
          <div className="space-y-2.5">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                name="faq"
                open={i === 0}
                className="group rounded-[1.25rem] bg-sand transition-[background-color,box-shadow] duration-300 open:bg-bone open:shadow-[0_14px_34px_rgba(40,37,96,0.1)] open:ring-1 open:ring-line"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[0.9375rem] font-extrabold text-ink marker:hidden [&::-webkit-details-marker]:hidden lg:text-[1rem]">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-bone text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-green-deep group-open:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-4">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[0.875rem] leading-relaxed text-taupe lg:pr-16 lg:text-[0.9375rem]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
