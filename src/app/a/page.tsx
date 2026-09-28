import type { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { IMAGES } from "@/data/images";
import { PACKAGES } from "@/data/packages";
import { pageMetadata } from "@/lib/seo";
import { LEGAL_LINKS } from "@/lib/site";
import { enquiry } from "@/lib/whatsapp";

import { AltWhatsAppLink } from "./alt-whatsapp-link";
import { MotionShell } from "./motion-shell";
import styles from "./page.module.css";

const editorial = Cormorant_Garamond({
  variable: "--font-alt-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-alt-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = pageMetadata({
  title: "Smarto: Thoughtful journeys across Northeast India",
  description:
    "Private road journeys, dependable transport, and local context across Northeast India. Plan a route with Smarto on WhatsApp.",
  path: "/a",
});

export const viewport: Viewport = {
  themeColor: "#f4f0e7",
  colorScheme: "light",
};

const FEATURED = [PACKAGES[0], PACKAGES[3], PACKAGES[5]];
const HERO_JOURNEY = PACKAGES[6];

const SERVICES = [
  {
    index: "01",
    label: "Private road journeys",
    copy: "Flexible itineraries with room for weather, appetite, and the pace of your group.",
    href: "/packages",
    link: "Browse journeys",
  },
  {
    index: "02",
    label: "Cabs and longer hires",
    copy: "Airport transfers, local days, outstation travel, and one vehicle for a multi-day route.",
    href: "/cabs",
    link: "Explore cab services",
  },
  {
    index: "03",
    label: "Teams and gatherings",
    copy: "Coordinated transport for offsites, employee movement, and groups travelling together.",
    href: "/corporate",
    link: "Plan group travel",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Share the rough idea",
    copy: "Send your dates, group size, and the places or experiences drawing you east.",
  },
  {
    number: "02",
    title: "Shape the route together",
    copy: "We work through drive times, seasons, stays, and the pace that feels right.",
  },
  {
    number: "03",
    title: "Travel with one contact",
    copy: "You have a clear plan and someone to reach when the road asks for a change.",
  },
];

export default function AlternativeHomePage() {
  return (
    <MotionShell>
      <div
        data-page-theme="travel-atelier"
        className={`${styles.page} ${editorial.variable} ${manrope.variable}`}
      >
        <header className={styles.header}>
          <Link
            href="/a"
            className={styles.logo}
            aria-label="Smarto alternative home"
          >
            <span className={styles.logoMark} aria-hidden="true">
              S
            </span>
            <span>Smarto</span>
          </Link>

          <nav aria-label="Alternative homepage">
            <ul className={styles.navList}>
              <li>
                <a href="#journeys">Journeys</a>
              </li>
              <li>
                <Link href="/cabs">Cabs</Link>
              </li>
              <li>
                <Link href="/festivals">Festivals</Link>
              </li>
              <li>
                <Link href="/impact">Our approach</Link>
              </li>
            </ul>
          </nav>

          <AltWhatsAppLink
            className={styles.headerCta}
            message={enquiry(
              "I would like to plan a Northeast India trip. Here is my rough idea:",
            )}
            location="home-alt-hero"
          >
            Plan a journey <Arrow />
          </AltWhatsAppLink>
        </header>

        <main>
          <section className={styles.hero} aria-labelledby="alt-hero-title">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                Private journeys across Northeast India
              </p>
              <h1 id="alt-hero-title">
                Go where the landscape <em>changes your pace.</em>
              </h1>
              <p className={styles.heroLead}>
                Thoughtful road trips, dependable transport, and useful local
                context. Begin with a place, a season, or simply the kind of
                days you want.
              </p>
              <div className={styles.heroActions}>
                <AltWhatsAppLink
                  className={styles.primaryCta}
                  message={enquiry(
                    "I would like help shaping a Northeast India journey.",
                  )}
                  location="home-alt-hero"
                >
                  Start on WhatsApp <Arrow />
                </AltWhatsAppLink>
                <a className={styles.textLink} href="#journeys">
                  View suggested journeys
                </a>
              </div>
            </div>

            <div className={styles.heroMedia}>
              <Image
                src={IMAGES.sikkimNorth.src}
                alt={IMAGES.sikkimNorth.alt}
                fill
                priority
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 58vw, 94vw"
                className={styles.photo}
              />
              <p className={styles.imageNote}>North Sikkim · High valleys</p>
              <div className={styles.heroRouteCard}>
                <div>
                  <p>Suggested beginning</p>
                  <h2>{HERO_JOURNEY.title}</h2>
                  <span>{HERO_JOURNEY.durationLabel}</span>
                </div>
                <Link
                  href={`/packages/${HERO_JOURNEY.slug}`}
                  className={styles.circleLink}
                  aria-label={`View ${HERO_JOURNEY.title}`}
                >
                  <Arrow />
                </Link>
              </div>
            </div>

            <div className={styles.heroFootnotes}>
              <p>
                <span>Based in</span>
                Guwahati, Assam
              </p>
              <p>
                <span>Travelling through</span>
                Assam · Meghalaya · Arunachal · Sikkim · Nagaland
              </p>
              <p>
                <span>Planning style</span>
                One useful conversation
              </p>
            </div>
          </section>

          <section className={styles.manifesto} aria-label="Smarto philosophy">
            <p className={styles.eyebrow}>The Smarto way</p>
            <blockquote>
              “A good journey is not a list of places. It is enough time to
              notice where you are.”
            </blockquote>
            <p className={styles.manifestoCopy}>
              We plan around real road time, changing weather, and the people
              travelling. The result feels considered, but never overmanaged.
            </p>
          </section>

          <section
            id="journeys"
            className={styles.journeys}
            aria-labelledby="journeys-title"
          >
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>A few places to begin</p>
                <h2 id="journeys-title">Journeys with room to breathe</h2>
              </div>
              <p>
                These are starting points, not fixed templates. We adjust the
                route around the season, your group, and how you like to travel.
              </p>
            </div>

            <div className={styles.journeyList}>
              {FEATURED.map((item, index) => (
                <article className={styles.journey} key={item.slug}>
                  <Link
                    href={`/packages/${item.slug}`}
                    className={styles.journeyImage}
                  >
                    <Image
                      src={item.hero.src}
                      alt={item.hero.alt}
                      fill
                      sizes="(min-width: 900px) 55vw, 92vw"
                      className={styles.photo}
                    />
                    <span>View journey</span>
                  </Link>
                  <div className={styles.journeyCopy}>
                    <p className={styles.journeyIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <p className={styles.journeyMeta}>
                        {item.state} · {item.durationLabel}
                      </p>
                      <h3>{item.title}</h3>
                      <p className={styles.journeySummary}>{item.summary}</p>
                      <div className={styles.journeyActions}>
                        <Link
                          href={`/packages/${item.slug}`}
                          className={styles.textLink}
                        >
                          Read the route
                        </Link>
                        <AltWhatsAppLink
                          className={styles.softCta}
                          message={item.enquiry}
                          location="home-alt-route"
                        >
                          Ask about this journey <Arrow />
                        </AltWhatsAppLink>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.allJourneysLink}>
              <Link href="/packages">
                Explore every journey <Arrow />
              </Link>
            </div>
          </section>

          <section className={styles.services} aria-labelledby="services-title">
            <div className={styles.serviceImages}>
              <div className={styles.roadImage}>
                <Image
                  src={IMAGES.homeRoad.src}
                  alt={IMAGES.homeRoad.alt}
                  fill
                  sizes="(min-width: 900px) 42vw, 90vw"
                  className={styles.photo}
                />
              </div>
              <div className={styles.foodImage}>
                <Image
                  src={IMAGES.homeFood.src}
                  alt={IMAGES.homeFood.alt}
                  fill
                  sizes="(min-width: 900px) 20vw, 52vw"
                  className={styles.photo}
                />
              </div>
              <p className={styles.handNote}>The road is part of the journey.</p>
            </div>

            <div className={styles.serviceContent}>
              <p className={styles.eyebrow}>Travel, held together well</p>
              <h2 id="services-title">From arrival to the road home</h2>
              <div className={styles.serviceList}>
                {SERVICES.map((service) => (
                  <article key={service.index}>
                    <p>{service.index}</p>
                    <div>
                      <h3>{service.label}</h3>
                      <p>{service.copy}</p>
                      <Link href={service.href}>
                        {service.link} <Arrow />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.planning} aria-labelledby="planning-title">
            <div className={styles.planningIntro}>
              <p className={styles.eyebrow}>Simple by design</p>
              <h2 id="planning-title">One conversation is enough to begin</h2>
              <p>
                No long form and no booking funnel. Tell us what you know. We
                will help with what you do not.
              </p>
            </div>

            <ol className={styles.steps}>
              {STEPS.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.finalCta} aria-labelledby="final-title">
            <div className={styles.finalImage}>
              <Image
                src={IMAGES.impactHero.src}
                alt={IMAGES.impactHero.alt}
                fill
                sizes="100vw"
                className={styles.photo}
              />
            </div>
            <div className={styles.finalPanel}>
              <p className={styles.eyebrow}>Start with the feeling</p>
              <h2 id="final-title">Where would you like the road to take you?</h2>
              <p>
                Send a place, a month, or the kind of trip you have in mind. We
                will take it from there.
              </p>
              <AltWhatsAppLink
                className={styles.finalButton}
                message={enquiry(
                  "I would like to plan a trip across Northeast India. Here is what I have in mind:",
                )}
                location="home-alt-final"
              >
                Plan on WhatsApp <Arrow />
              </AltWhatsAppLink>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <Link href="/a" className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true">
              S
            </span>
            <span>Smarto</span>
          </Link>
          <p>Thoughtful journeys and dependable transport across Northeast India.</p>
          <Link href="/">View the original homepage</Link>
          <p>
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.href}>
                {i > 0 && " · "}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
          </p>
        </footer>
      </div>
    </MotionShell>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
