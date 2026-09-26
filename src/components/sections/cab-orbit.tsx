"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { WaCta } from "@/components/ui/wa-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

export interface OrbitService {
  name: string;
  line: string;
  fare: string | null;
  icon: string;
  message: string;
}

/*
 * The service turntable. The Smarto cab holds the centre while the six
 * services orbit it on a flattened ellipse, front of the ring is close and
 * bright, the back passes small and dim behind the car. Whichever service
 * swings to the front becomes the focus, and its card (tagline, fare,
 * WhatsApp) fades in beneath the stage.
 *
 * The "3D" is arithmetic, not CSS perspective: each icon's position, scale,
 * depth order, and opacity derive from its angle on the ellipse, applied
 * directly to styles inside one rAF tween per step. Between steps nothing
 * runs, the only standing motion is the cab's CSS float. Autoplay advances
 * the ring every few seconds, pauses when the visitor interacts, and stops
 * entirely off-screen, in hidden tabs, and under reduced motion.
 */

const STEP = 60; // degrees between services
const RX = 152; // orbit half-width
const RY = 56; // orbit half-height (the ellipse's squash is the "tilt")
const SPIN_MS = 950;
const DWELL_MS = 4000;
const PAUSE_MS = 7000;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const wrap = (n: number, m: number) => ((n % m) + m) % m;

/** Position on the ring at `phi` degrees; 0° is front-centre, closest to us. */
function place(phi: number) {
  const rad = (phi * Math.PI) / 180;
  const depth = Math.cos(rad); // 1 front … −1 back
  return {
    x: RX * Math.sin(rad),
    y: RY * depth,
    scale: 0.62 + 0.63 * (depth + 1) * 0.5,
    opacity: 0.4 + 0.6 * (depth + 1) * 0.5,
    z: 10 + Math.round(depth * 8),
  };
}

function iconStyle(phi: number): CSSProperties {
  const p = place(phi);
  return {
    transform: `translate(-50%, -50%) translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) scale(${p.scale.toFixed(3)})`,
    zIndex: p.z,
    opacity: p.opacity.toFixed(3),
  };
}

export function CabOrbit({ services }: { services: readonly OrbitService[] }) {
  const count = services.length;
  const [active, setActive] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swayRef = useRef<HTMLDivElement>(null);

  // The turntable engine lives entirely inside the effect, plain closure
  // state, style writes only. JSX handlers reach it through this ref, and
  // `active` alone flows back into React (for the card + aria-current).
  const api = useRef<{ step: (d: number) => void; focus: (i: number) => void }>(
    null,
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let steps = 0; // cumulative, so the ring never unwinds
    let theta = 0;
    let activeIdx = 0;
    let raf = 0;
    let pausedUntil = 0;
    let inView = true;
    let touch: { x: number; y: number } | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = (t: number, sway: number) => {
      theta = t;
      for (let i = 0; i < count; i++) {
        const el = iconRefs.current[i];
        if (!el) continue;
        const s = iconStyle(t + i * STEP);
        el.style.transform = s.transform as string;
        el.style.zIndex = String(s.zIndex);
        el.style.opacity = s.opacity as string;
      }
      // The cab leans into the turn while the ring is moving.
      if (swayRef.current)
        swayRef.current.style.transform = `translateX(${(sway * 7).toFixed(1)}px) rotate(${(sway * -2.2).toFixed(2)}deg)`;
    };

    const go = (delta: number) => {
      steps += delta;
      activeIdx = wrap(steps, count);
      setActive(activeIdx);

      const from = theta;
      const to = -steps * STEP;
      const dir = Math.sign(to - from);

      window.cancelAnimationFrame(raf);
      if (reduced.matches) {
        apply(to, 0);
        return;
      }
      const t0 = performance.now();
      const frame = (now: number) => {
        const p = Math.min(1, (now - t0) / SPIN_MS);
        apply(
          from + (to - from) * easeInOut(p),
          dir * Math.sin(Math.PI * p),
        );
        if (p < 1) raf = window.requestAnimationFrame(frame);
      };
      raf = window.requestAnimationFrame(frame);
    };

    const pause = () => {
      pausedUntil = Date.now() + PAUSE_MS;
    };

    api.current = {
      step: (d) => {
        pause();
        go(d);
      },
      focus: (i) => {
        pause();
        // Shortest way around the ring.
        const d = wrap(i - activeIdx + count / 2, count) - count / 2;
        if (d !== 0) go(d);
      },
    };

    const onPointerDown = (e: PointerEvent) => {
      touch = { x: e.clientX, y: e.clientY };
      pause();
    };
    const onPointerUp = (e: PointerEvent) => {
      const start = touch;
      touch = null;
      if (!start) return;
      const dx = e.clientX - start.x;
      if (Math.abs(dx) > 48 && Math.abs(dx) > 1.5 * Math.abs(e.clientY - start.y))
        go(dx < 0 ? 1 : -1);
    };
    stage.addEventListener("pointerdown", onPointerDown, { passive: true });
    stage.addEventListener("pointerup", onPointerUp, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observer.observe(stage);

    const timer = window.setInterval(() => {
      if (
        reduced.matches ||
        document.hidden ||
        !inView ||
        Date.now() < pausedUntil
      )
        return;
      go(1);
    }, DWELL_MS);

    return () => {
      api.current = null;
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", onPointerUp);
      observer.disconnect();
      window.clearInterval(timer);
      window.cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <div>
      {/* --- The stage. */}
      {/* Full-bleed stage: the ring needs the frame's whole width to keep the
          services clear of the car. */}
      <div
        ref={stageRef}
        className="relative -mx-6 h-[15.5rem] touch-pan-y select-none"
      >
        {/* Soft ground wash, the dashed route the services ride, and a halo
            marking the focus spot at the front of the ring. */}
        <div
          aria-hidden="true"
          className="absolute top-[138px] left-1/2 h-[140px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-clay-soft)_0%,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-[138px] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-[1.5px] border-dashed border-line-strong"
          style={{ width: RX * 2, height: RY * 2 }}
        />
        <div
          aria-hidden="true"
          className="absolute top-[194px] left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(40,37,96,0.14)_0%,transparent_70%)]"
        />

        {/* The cab: floats on CSS, leans on JS while the ring turns. */}
        <div
          aria-hidden="true"
          className="absolute top-[158px] left-1/2 z-[1] h-3.5 w-[148px] rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(28,26,69,0.4)_0%,transparent_72%)] motion-safe:animate-cab-shadow"
          style={{ transform: "translateX(-50%)" }}
        />
        <div
          ref={swayRef}
          className="absolute top-[110px] left-1/2 z-10 -ml-[90px] w-[180px]"
          style={{ transform: "translateX(0px)" }}
        >
          {/* Centering rides a margin, not a transform, the float keyframes
              own this element's transform outright. */}
          <div className="motion-safe:animate-cab-float -mt-[50px]">
            <Image
              src="/images/cab-orbit-hero.webp"
              alt=""
              width={480}
              height={259}
              loading="lazy"
              sizes="180px"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* The six services, riding the ellipse. */}
        {services.map((service, i) => (
          <button
            key={service.name}
            ref={(el) => {
              iconRefs.current[i] = el;
            }}
            type="button"
            onClick={() => api.current?.focus(i)}
            aria-label={service.name}
            aria-current={i === active ? "true" : undefined}
            className="absolute top-[138px] left-1/2 size-16 rounded-full"
            style={iconStyle(i * STEP)}
          >
            <Image
              src={service.icon}
              alt=""
              width={240}
              height={240}
              loading="lazy"
              sizes="90px"
              className="size-full object-contain [filter:drop-shadow(0_6px_8px_rgba(28,26,69,0.2))]"
            />
          </button>
        ))}
      </div>

      {/* --- The focused service, with the arrows that steer the ring. */}
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => api.current?.step(-1)}
          aria-label="Previous service"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-clay transition-colors hover:bg-sand"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
            <path
              d="M10 3 5 8l5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative min-h-[11.5rem] flex-1">
          {services.map((service, i) => (
            <div
              key={service.name}
              inert={i !== active || undefined}
              className={cn(
                "absolute inset-0 flex flex-col items-center text-center transition-[opacity,transform] duration-500",
                i === active
                  ? "translate-y-0 opacity-100 delay-150"
                  : "pointer-events-none translate-y-1.5 opacity-0",
              )}
            >
              <p className="font-display text-[1.3125rem] leading-tight text-ink">
                {service.name}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-taupe">
                {service.line}
              </p>
              {service.fare ? (
                /* The fare lockup: confirmed flat fares are green, with the
                   mandated all-in microcopy beside the number. */
                <p className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe uppercase">
                    from
                  </span>
                  <span className="font-extrabold text-[1.375rem] tracking-[-0.03em] text-green-deep tabular-nums">
                    <span className="align-top text-[0.7rem] leading-none opacity-75">
                      ₹
                    </span>
                    {service.fare.replace("₹", "")}
                  </span>
                  <span className="text-[0.625rem] font-extrabold tracking-[0.2em] text-green-deep uppercase">
                    all-in
                  </span>
                </p>
              ) : (
                <p className="mt-2.5 text-[0.625rem] font-extrabold tracking-[0.2em] text-taupe uppercase">
                  fixed quote on WhatsApp
                </p>
              )}
              <WaCta
                message={service.message}
                location="home-cabs"
                subject={service.name}
                className="mt-3.5 inline-flex min-h-11 items-center gap-2 rounded-full bg-clay px-5 text-[0.875rem] font-extrabold text-bone transition-colors hover:bg-clay-deep"
              >
                <WhatsAppIcon />
                Book on WhatsApp
              </WaCta>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => api.current?.step(1)}
          aria-label="Next service"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-clay transition-colors hover:bg-sand"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
            <path
              d="m6 3 5 5-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Every fare, for readers who never see the turntable. */}
      <ul className="sr-only">
        {services.map((service) => (
          <li key={service.name}>
            {service.name}: {service.line}
            {service.fare ? ` From ${service.fare}.` : " Fixed quote on WhatsApp."}
          </li>
        ))}
      </ul>
    </div>
  );
}
