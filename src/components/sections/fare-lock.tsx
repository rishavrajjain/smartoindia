"use client";

import { useRef, useState } from "react";

import { LockIcon } from "@/components/ui/line-icons";
import { cn } from "@/lib/cn";

/*
 * The fare lock: Manav's signature for the cabs page. Tap the conditions
 * that would normally push a fare up — peak hour, rain, festival rush —
 * and watch a surge app's quote climb while Smarto's stays exactly where
 * it started. The surge figures are illustrative; the ₹399 is the real
 * railway-station flat fare.
 */

const BASE = 399;

const CONDITIONS = [
  { label: "6 PM peak", add: 180 },
  { label: "Heavy rain", add: 150 },
  { label: "Bihu rush", add: 210 },
  { label: "2 AM", add: 120 },
  { label: "Last car in the area", add: 90 },
];

/** Tweens the surge figure toward its target; jumps under reduced motion. */
function startTween(
  target: number,
  currentRef: { current: number },
  rafRef: { current: number },
  onFrame: (value: number) => void,
) {
  cancelAnimationFrame(rafRef.current);
  // Hidden tabs never fire rAF, so the figure would stall mid-tween.
  if (
    document.hidden ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    currentRef.current = target;
    onFrame(target);
    return;
  }
  const from = currentRef.current;
  const t0 = performance.now();
  const duration = 420;
  const step = (now: number) => {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    currentRef.current = from + (target - from) * eased;
    onFrame(Math.round(currentRef.current));
    if (p < 1) rafRef.current = requestAnimationFrame(step);
  };
  rafRef.current = requestAnimationFrame(step);
}

export function FareLock() {
  const [on, setOn] = useState<boolean[]>(() => CONDITIONS.map(() => false));
  const [shown, setShown] = useState(BASE);
  const [pulseKey, setPulseKey] = useState(0);

  const currentRef = useRef(BASE);
  const rafRef = useRef(0);
  const onRef = useRef(on);

  const surgeTarget =
    BASE + CONDITIONS.reduce((sum, c, i) => sum + (on[i] ? c.add : 0), 0);
  const risePct = Math.round(((surgeTarget - BASE) / BASE) * 100);

  const toggle = (index: number) => {
    // Read through the ref so rapid taps never work from a stale render.
    const next = onRef.current.map((v, i) => (i === index ? !v : v));
    onRef.current = next;
    setOn(next);
    setPulseKey((k) => k + 1);
    startTween(
      BASE + CONDITIONS.reduce((sum, c, i) => sum + (next[i] ? c.add : 0), 0),
      currentRef,
      rafRef,
      setShown,
    );
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-14">
      <div
        role="group"
        aria-label="Things that usually make a fare go up"
        className="mt-7 flex flex-wrap gap-2 lg:mt-8"
      >
        {CONDITIONS.map((condition, index) => (
          <button
            key={condition.label}
            type="button"
            aria-pressed={on[index]}
            onClick={() => toggle(index)}
            className={cn(
              "min-h-11 rounded-full px-4 text-[0.8125rem] transition-colors duration-[260ms]",
              on[index]
                ? "bg-white font-extrabold text-ink"
                : "bg-white/7 text-bone/80 hover:bg-white/12",
            )}
          >
            {condition.label}
          </button>
        ))}
      </div>

      <div className="lg:row-span-2">
        <div className="mt-7 grid grid-cols-2 gap-0.5 overflow-hidden rounded-[14px] bg-white/10 lg:mt-8">
          <div className="bg-clay-deep px-4 py-6">
            <p className="min-h-[2.7em] text-[0.71875rem] leading-snug text-bone/55">
              What a surge app quotes
            </p>
            <p
              aria-live="polite"
              className="mt-2.5 text-[2.5rem] font-extrabold tracking-[-0.035em] text-[#9a9ab0] line-through decoration-[3px] tabular-nums"
            >
              <span className="align-top text-[0.46em] no-underline opacity-80">
                ₹
              </span>
              {shown}
            </p>
            <p className="mt-2 min-h-[1.2em] text-[0.6875rem] text-[#9a9ab0]">
              {risePct > 0 ? `+${risePct}% for you` : " "}
            </p>
          </div>
          <div className="bg-clay-deep px-4 py-6">
            <p className="min-h-[2.7em] text-[0.71875rem] leading-snug text-bone/55">
              What Smarto quotes
            </p>
            <p
              key={pulseKey}
              className="mt-2.5 text-[2.875rem] font-extrabold tracking-[-0.035em] text-green tabular-nums motion-safe:animate-fare-pulse"
            >
              <span className="align-top text-[0.46em] opacity-80">₹</span>
              {BASE}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-[0.65625rem] font-extrabold tracking-[0.2em] text-green">
              <LockIcon className="size-[11px]" />
              FLAT · ALL-IN
            </p>
          </div>
        </div>

        <p className="mt-7 text-center text-[1.375rem] leading-snug font-extrabold">
          Same ride. Same rain. Same price.
        </p>
        <p className="mt-3 text-center text-[0.6875rem] leading-relaxed text-bone/40">
          Surge figures are illustrative. The ₹399 is not.
        </p>
      </div>
    </div>
  );
}
