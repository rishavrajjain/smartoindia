import Link from "next/link";

import { Container } from "@/components/ui/container";
import { GRIEVANCE_OFFICER, type LegalBlock, type LegalDoc } from "@/data/legal";
import { SITE } from "@/lib/site";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/whatsapp";

/*
 * The layout shared by the Terms and the Privacy Policy: numbered sections
 * in a reading column, an "On this page" list (sticky from desktop up,
 * folded away on phones), and the contact and Grievance Officer card that
 * both documents point to.
 */

function updatedOn(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Block({ block }: { block: LegalBlock }) {
  if ("h" in block) {
    return <h3 className="mt-6 text-[0.9375rem] font-extrabold text-ink first:mt-0">{block.h}</h3>;
  }
  if ("p" in block) {
    return <p className="mt-3 text-[0.9375rem] leading-relaxed text-taupe first:mt-0">{block.p}</p>;
  }
  return (
    <ul className="mt-3 space-y-2.5 first:mt-0">
      {block.list.map((item) => (
        <li key={item} className="relative pl-5 text-[0.9375rem] leading-relaxed text-taupe">
          <span aria-hidden="true" className="absolute top-[0.6rem] left-0.5 size-1.5 rounded-full bg-green-deep" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Contents({ doc }: { doc: LegalDoc }) {
  return (
    <ol className="space-y-0.5">
      {doc.sections.map((section, i) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex min-h-10 items-center gap-3 rounded-xl px-2 text-[0.875rem] text-taupe transition-colors hover:bg-sand hover:text-ink"
          >
            <span className="w-5 shrink-0 text-[0.75rem] font-extrabold text-green-deep tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            {section.title}
          </a>
        </li>
      ))}
      <li>
        <a
          href="#contact"
          className="flex min-h-10 items-center gap-3 rounded-xl px-2 text-[0.875rem] text-taupe transition-colors hover:bg-sand hover:text-ink"
        >
          <span className="w-5 shrink-0" />
          Contact us
        </a>
      </li>
    </ol>
  );
}

export function LegalPage({
  doc,
  other,
}: {
  doc: LegalDoc;
  /** The companion document, linked from the side column. */
  other: { href: "/terms" | "/privacy"; label: string };
}) {
  const split = doc.title.lastIndexOf(" ");

  return (
    <Container width="wide" className="pt-10 pb-6 lg:pt-16 lg:pb-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-label font-extrabold text-clay uppercase">Legal</p>

          <details className="group mt-4 rounded-2xl bg-sand lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-[0.875rem] font-extrabold text-ink [&::-webkit-details-marker]:hidden">
              On this page
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4 transition-transform group-open:rotate-180">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <nav aria-label="On this page" className="px-2 pb-3">
              <Contents doc={doc} />
            </nav>
          </details>

          <nav aria-label="On this page" className="mt-5 hidden lg:block">
            <Contents doc={doc} />
          </nav>

          <Link
            href={other.href}
            className="mt-4 hidden min-h-11 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-extrabold text-ink ring-1 ring-line-strong transition-colors hover:bg-sand lg:inline-flex"
          >
            {other.label}
            <span aria-hidden="true">→</span>
          </Link>
        </aside>

        <article className="max-w-3xl">
          <h1 className="text-[2.25rem] leading-[1.05] tracking-[-0.015em] sm:text-[3rem]">
            {doc.title.slice(0, split)} <span className="accent">{doc.title.slice(split + 1)}</span>
          </h1>
          <p className="mt-4 text-[0.8125rem] font-extrabold text-taupe">
            Last updated <time dateTime={doc.updated}>{updatedOn(doc.updated)}</time>
          </p>
          <span aria-hidden="true" className="spark-fill mt-6 block h-[3px] w-16 rounded-full" />
          <div className="mt-6 space-y-3">
            {doc.intro.map((p) => (
              <p key={p} className="text-[1rem] leading-relaxed text-ink">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 space-y-12">
            {doc.sections.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24">
                <h2
                  id={`${section.id}-title`}
                  className="flex items-baseline gap-3 text-[1.25rem] leading-snug font-extrabold text-ink sm:text-[1.375rem]"
                >
                  <span className="text-[0.8125rem] text-green-deep tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-4">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section id="contact" aria-labelledby="contact-title" className="mt-14 scroll-mt-24 rounded-[1.75rem] bg-sand p-6 sm:p-8">
            <h2 id="contact-title" className="text-[1.25rem] font-extrabold text-ink sm:text-[1.375rem]">
              Contact us
            </h2>
            <dl className="mt-5 grid gap-5 text-[0.9375rem] sm:grid-cols-2">
              <div>
                <dt className="text-label font-extrabold text-taupe uppercase">Grievance Officer</dt>
                <dd className="mt-1.5 leading-relaxed text-ink">
                  {GRIEVANCE_OFFICER.name}, {GRIEVANCE_OFFICER.role}
                  <br />
                  {SITE.legalName}
                </dd>
              </div>
              <div>
                <dt className="text-label font-extrabold text-taupe uppercase">Office</dt>
                <dd className="mt-1.5 leading-relaxed text-ink">{SITE.address}</dd>
              </div>
              <div>
                <dt className="text-label font-extrabold text-taupe uppercase">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${SITE.email}`} className="font-extrabold text-ink underline-offset-4 hover:underline">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-label font-extrabold text-taupe uppercase">Phone and WhatsApp</dt>
                <dd className="mt-1.5">
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="font-extrabold text-ink underline-offset-4 hover:underline">
                    {WHATSAPP_DISPLAY}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <Link
            href={other.href}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-extrabold text-ink ring-1 ring-line-strong transition-colors hover:bg-sand lg:hidden"
          >
            {other.label}
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      </div>
    </Container>
  );
}
