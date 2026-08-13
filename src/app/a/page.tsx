import Image from "next/image";
import Link from "next/link";
import type { Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

import { IMAGES } from "@/data/images";
import { PACKAGES } from "@/data/packages";
import { pageMetadata } from "@/lib/seo";
import { enquiry } from "@/lib/whatsapp";

import { AltWhatsAppLink } from "./alt-whatsapp-link";
import { MotionShell } from "./motion-shell";
import styles from "./page.module.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-alt-display",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-alt-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = pageMetadata({
  title: "Smarto Alt — Follow the road that feels right",
  description:
    "A clear, thoughtful way to discover road trips, festivals, and reliable travel across Northeast India with Smarto.",
  path: "/a",
});

export const viewport: Viewport = {
  themeColor: "#f7f6f1",
  colorScheme: "light",
};

const FEATURED = [
  PACKAGES.find((item) => item.slug === "meghalaya-waterfalls-and-caves"),
  PACKAGES.find((item) => item.slug === "kaziranga-and-the-brahmaputra"),
  PACKAGES.find((item) => item.slug === "tawang-high-passes"),
].filter((item): item is (typeof PACKAGES)[number] => Boolean(item));

const PULSES = [
  "Monsoon roads",
  "River mornings",
  "High passes",
  "Local tables",
];

export default function AlternativeHomePage() {
  return (
    <MotionShell>
      <div
        data-page-theme="kinetic-field-guide"
        className={`${bricolageGrotesque.variable} ${instrumentSans.variable}`}
      >
        <header className={styles.header}>
          <Link href="/a" className={styles.logo} aria-label="Smarto alternative home">
            SMAR<span>TO</span>
          </Link>
          <nav aria-label="Alternative homepage">
            <ul className={styles.navList}>
              <li><a href="#routes">Routes</a></li>
              <li><a href="#ways-to-move">Move</a></li>
              <li><Link href="/festivals">Festivals</Link></li>
            </ul>
          </nav>
          <AltWhatsAppLink
            className={styles.headerCta}
            message={enquiry("I would like to plan a Northeast trip from the alternative homepage.")}
            location="home-alt-hero"
          >
            Plan on WhatsApp <Arrow />
          </AltWhatsAppLink>
        </header>

        <section className={styles.hero} aria-labelledby="alt-hero-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <svg className={styles.routeLine} viewBox="0 0 900 720" aria-hidden="true">
            <path d="M-20 555 C145 460 205 625 350 492 C500 354 410 198 592 177 C710 164 746 278 936 68" />
          </svg>

          <div className={styles.heroKicker}>
            <span>26.1445° N</span>
            <span>91.7362° E</span>
            <span className={styles.liveDot}>Trips from Guwahati</span>
          </div>

          <h1 id="alt-hero-title" className={styles.heroTitle}>
            <span className={styles.wordOne}>Northeast,</span>
            <span className={styles.wordTwo}>your way.</span>
          </h1>

          <div className={`${styles.photoShard} ${styles.photoOne}`}>
            <Image
              src={IMAGES.sikkimNorth.src}
              alt=""
              fill
              priority
              sizes="(min-width: 900px) 29vw, 62vw"
              className={styles.photo}
            />
          </div>
          <div className={`${styles.photoShard} ${styles.photoTwo}`}>
            <Image
              src={IMAGES.assamKaziranga.src}
              alt=""
              fill
              priority
              sizes="(min-width: 900px) 19vw, 40vw"
              className={styles.photo}
            />
          </div>
          <div className={`${styles.photoShard} ${styles.photoThree}`}>
            <Image
              src={IMAGES.meghalayaRootBridge.src}
              alt=""
              fill
              priority
              sizes="(min-width: 900px) 17vw, 36vw"
              className={styles.photo}
            />
          </div>

          <div className={styles.heroStatement}>
            <p>
              Thoughtful road trips, dependable transport, and local context
              across Northeast India. You bring the idea. We shape the route.
            </p>
            <AltWhatsAppLink
              className={styles.heroCta}
              message={enquiry("I have a Northeast trip idea and would like help shaping the route.")}
              location="home-alt-hero"
            >
              Plan on WhatsApp <Arrow />
            </AltWhatsAppLink>
          </div>

          <a className={styles.scrollCue} href="#routes">
            <span>Explore the routes</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <div className={styles.pulseRail} aria-label="Travel ideas">
          <div className={styles.pulseTrack}>
            {[...PULSES, ...PULSES].map((pulse, index) => (
              <span key={`${pulse}-${index}`}>
                {pulse} <i aria-hidden="true">✦</i>
              </span>
            ))}
          </div>
        </div>

        <section id="routes" className={styles.routes} aria-labelledby="routes-title">
          <div className={styles.sectionIntro}>
            <p className={styles.index}>01 / PLACES TO BEGIN</p>
            <h2 id="routes-title">Three good routes.<br />Built to flex.</h2>
            <p className={styles.sectionCopy}>
              Start with a feeling, not a rigid checklist. Every route can slow
              down, stretch out, or turn somewhere unexpected.
            </p>
          </div>

          <div className={styles.routeStack}>
            {FEATURED.map((item, index) => (
              <article className={styles.routeCard} key={item.slug}>
                <Link href={`/packages/${item.slug}`} className={styles.routeImage}>
                  <Image
                    src={item.hero.src}
                    alt={item.hero.alt}
                    fill
                    sizes="(min-width: 1024px) 48vw, 92vw"
                    className={styles.photo}
                  />
                  <span className={styles.routeNumber}>0{index + 1}</span>
                  <span className={styles.routeAction}>Open route ↗</span>
                </Link>
                <div className={styles.routeMeta}>
                  <p>{item.state} · {item.durationLabel}</p>
                  <h3>{item.title}</h3>
                  <div className={styles.routeFooter}>
                    <p>{item.summary}</p>
                    <AltWhatsAppLink
                      className={styles.roundCta}
                      message={item.enquiry}
                      location="home-alt-route"
                    >
                      <span>Ask about this trip</span>
                      <Arrow />
                    </AltWhatsAppLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="ways-to-move" className={styles.move} aria-labelledby="move-title">
          <div className={styles.moveBackdrop} aria-hidden="true">MOVE</div>
          <div className={styles.moveHeading}>
            <p className={styles.index}>02 / WAYS TO MOVE</p>
            <h2 id="move-title">Reliable from arrival<br />to return.</h2>
          </div>

          <div className={styles.serviceGrid}>
            <Link href="/cabs" className={`${styles.service} ${styles.serviceLight}`}>
              <span className={styles.serviceIndex}>A</span>
              <div>
                <p>Airport · Local · Outstation</p>
                <h3>Cabs for every<br />part of the trip.</h3>
              </div>
              <span className={styles.serviceArrow}>↗</span>
            </Link>
            <Link href="/corporate" className={`${styles.service} ${styles.serviceBlue}`}>
              <span className={styles.serviceIndex}>B</span>
              <div>
                <p>Offsites · Teams · Group movement</p>
                <h3>Group travel,<br />kept coordinated.</h3>
              </div>
              <span className={styles.serviceArrow}>↗</span>
            </Link>
            <Link href="/festivals" className={`${styles.service} ${styles.serviceOrange}`}>
              <span className={styles.serviceIndex}>C</span>
              <div>
                <p>Seasonal · Local · Worth timing right</p>
                <h3>Plan around the<br />right season.</h3>
              </div>
              <span className={styles.serviceArrow}>↗</span>
            </Link>
          </div>
        </section>

        <section className={styles.method} aria-labelledby="method-title">
          <div className={styles.methodOrbit} aria-hidden="true">
            <span>YOU</span><i>→</i><span>US</span><i>→</i><span>ROAD</span>
          </div>
          <div className={styles.methodCopy}>
            <p className={styles.index}>03 / ONE MESSAGE IS ENOUGH</p>
            <h2 id="method-title">One message.<br /><em>A route shaped<br />around you.</em></h2>
            <p>
              Send your dates, the people coming, and the kind of days you want.
              We shape the practical route around your pace.
            </p>
          </div>
          <ol className={styles.methodSteps}>
            <li><span>01</span><p>You send the rough idea.</p></li>
            <li><span>02</span><p>We turn it into a route.</p></li>
            <li><span>03</span><p>You travel with one clear contact.</p></li>
          </ol>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-title">
          <div className={styles.finalTexture} aria-hidden="true" />
          <p className={styles.index}>YOUR ROAD STARTS HERE</p>
          <h2 id="final-title">Let’s plan<br />the trip.</h2>
          <AltWhatsAppLink
            className={styles.finalButton}
            message={enquiry("I would like to plan a trip across Northeast India. Here is my rough idea:")}
            location="home-alt-final"
          >
            <span>Open WhatsApp</span>
            <span className={styles.finalButtonArrow}>↗</span>
          </AltWhatsAppLink>
          <div className={styles.finalFooter}>
            <Link href="/a" className={styles.logo}>SMAR<span>TO</span></Link>
            <p>Trips and transport across Northeast India.</p>
            <Link href="/">View original homepage ↗</Link>
          </div>
        </section>
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
