import Link from "next/link";

import { Container } from "@/components/ui/container";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { NAV } from "@/lib/site";
import { enquiry } from "@/lib/whatsapp";

export const metadata = {
  title: "Page not found",
  description: "This page does not exist. Try one of the sections below.",
};

export default function NotFound() {
  return (
    <Container width="default" className="py-24 lg:py-36">
      <p className="text-label font-extrabold text-clay-deep uppercase">
        404
      </p>
      <h1 className="mt-4 text-[2.5rem] leading-[1.05] text-ink sm:text-[3.5rem]">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-xl text-lg text-taupe">
        It may have moved, or the link may be wrong. Everything on the site is
        one of these sections.
      </p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex h-full flex-col border-t border-line pt-5 transition-colors hover:border-ink/40"
            >
              <span className="font-sans text-base font-extrabold text-ink">
                {item.label}
              </span>
              <span className="mt-1 text-sm text-taupe">
                {item.blurb}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-ink px-6 text-[0.9375rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
        >
          Back to home
        </Link>
        <WhatsAppLink
          message={enquiry("I was looking for something on your site:")}
          location="not-found"
          tone="quiet"
          size="md"
        >
          Ask us directly
        </WhatsAppLink>
      </div>
    </Container>
  );
}
