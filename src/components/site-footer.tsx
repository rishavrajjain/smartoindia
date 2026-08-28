import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/deco";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { NAV, SITE } from "@/lib/site";
import { WHATSAPP_DISPLAY, enquiry } from "@/lib/whatsapp";

const STATES = ["Assam", "Meghalaya", "Arunachal", "Sikkim", "Nagaland"];

export function SiteFooter() {
  return (
    <footer data-site-chrome="footer" className="mt-28 lg:mt-40">
      {/* Sign-off */}
      <div className="border-t border-line bg-sand">
        <Container width="wide" className="py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>One message is enough</Eyebrow>
              <h2 className="mt-6 max-w-xl text-[2.25rem] leading-[1.06] sm:text-[3rem]">
                Tell us where you want to go.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-3">
              <WhatsAppLink
                message={enquiry(
                  "I would like to plan a trip. Here is what I have in mind:",
                )}
                location="footer"
                size="lg"
              >
                Message us on WhatsApp
              </WhatsAppLink>
              <p className="mt-4 text-sm text-taupe">
                {WHATSAPP_DISPLAY} · usually replies the same day
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container width="wide" className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src="/brand/smarto-wordmark.webp"
              alt={SITE.name}
              width={720}
              height={160}
              loading="lazy"
              className="h-7 w-auto"
            />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-taupe">
              Trips and transport across Northeast India, run out of{" "}
              {SITE.base}.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-label font-extrabold text-taupe uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-[0.9375rem] text-ink transition-colors hover:text-clay"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-label font-extrabold text-taupe uppercase">
              Where we travel
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">
              {STATES.join(" · ")}
            </p>
            <div className="mt-6">
              <WhatsAppLink
                message={enquiry("I would like to know more about Smarto.")}
                location="footer"
                tone="link"
              >
                {WHATSAPP_DISPLAY}
              </WhatsAppLink>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6">
          <p className="text-[0.8125rem] leading-relaxed text-taupe">
            © {new Date().getFullYear()} {SITE.legalName}. Trip details and
            festival dates are indicative and confirmed on WhatsApp before you
            travel.
          </p>
        </div>
      </Container>
      {/* Clears the fixed mobile CTA bar so the last line is never hidden. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
      {/* The signature: every light layout is anchored by the spark band. */}
      <div aria-hidden="true" className="spark-band" />
    </footer>
  );
}
