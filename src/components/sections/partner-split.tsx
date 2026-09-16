"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

/*
 * The open split: Manav's signature for the partner page. Most operators
 * won't tell a partner what they keep; this shows the whole split on a
 * ₹399 railway station drop, then lets the partner slide their monthly
 * volume to see their commission tier and what comes back to them.
 *
 * Numbers are the mockup's: tiers of 5% / 7.5% / 10%, with thresholds
 * printed in brackets and labelled provisional in the fine print below
 * (they are confirmed in the partner agreement).
 */

const FARE = 399;

const TIERS = [
  { min: 0, rate: 0.05, label: "5%", band: "Under [50]\nrides a month" },
  { min: 50, rate: 0.075, label: "7.5%", band: "[50]–[149]\nrides a month" },
  { min: 150, rate: 0.1, label: "10%", band: "[150]+\nrides a month" },
];

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

export function PartnerSplit() {
  const [rides, setRides] = useState(120);

  let tier = 0;
  for (let i = 0; i < TIERS.length; i++) if (rides >= TIERS[i].min) tier = i;
  const perRide = FARE * TIERS[tier].rate;
  const nextTier = tier < TIERS.length - 1 ? TIERS[tier + 1] : null;

  return (
    <div>
      {/* The split itself, row by row. */}
      <div className="mt-7 flex flex-col gap-px overflow-hidden rounded-[14px] bg-white/10">
        <div className="flex items-center justify-between gap-3.5 bg-clay-deep px-4 py-4">
          <p className="text-[0.8125rem] leading-snug text-bone/60">
            <span className="block text-[0.90625rem] font-extrabold text-white">
              Your guest pays
            </span>
            The same flat fare as a walk-in
          </p>
          <span className="text-[1.625rem] font-extrabold tracking-[-0.03em] whitespace-nowrap tabular-nums">
            ₹{FARE}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3.5 bg-clay-deep px-4 py-4">
          <p className="text-[0.8125rem] leading-snug text-bone/60">
            <span className="block text-[0.90625rem] font-extrabold text-white">
              Smarto keeps
            </span>
            Car, driver, charging, support
          </p>
          <span className="text-[1.625rem] font-extrabold tracking-[-0.03em] whitespace-nowrap text-bone/40 tabular-nums">
            ₹{fmt(FARE - perRide)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3.5 bg-green-deep/15 px-4 py-4">
          <p className="text-[0.8125rem] leading-snug text-bone/60">
            <span className="block text-[0.90625rem] font-extrabold text-green">
              You earn
            </span>
            Credited to your account
          </p>
          <span className="text-[2.125rem] font-extrabold tracking-[-0.03em] whitespace-nowrap text-green tabular-nums">
            ₹{fmt(perRide)}
          </span>
        </div>
      </div>
      <p className="mt-4 text-[0.8125rem] leading-relaxed text-bone/60">
        <b className="font-extrabold text-white">
          Nothing extra comes out of your guest&rsquo;s pocket.
        </b>{" "}
        They pay what the price list says, and the driver will never ask them
        for a rupee more. Your margin is our cost, not theirs.
      </p>

      {/* Volume in, tier and total out. */}
      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <label htmlFor="partner-rides" className="text-[0.75rem] text-bone/60">
            Rides you book a month
          </label>
          <span className="text-[1.1875rem] font-extrabold tabular-nums">
            {fmt(rides)}
          </span>
        </div>
        <input
          id="partner-rides"
          type="range"
          min={10}
          max={500}
          step={5}
          value={rides}
          onChange={(event) => setRides(Number(event.target.value))}
          className="range-dark mt-3.5"
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10">
        {TIERS.map((option, index) => (
          <div
            key={option.label}
            className={cn(
              "px-2.5 py-4 text-center transition-colors duration-[260ms]",
              index === tier ? "bg-green-deep/20" : "bg-clay-deep",
            )}
          >
            <p
              className={cn(
                "text-[1.25rem] font-extrabold tracking-[-0.02em]",
                index === tier && "text-green",
              )}
            >
              {option.label}
            </p>
            <p className="mt-1 text-[0.65625rem] leading-snug whitespace-pre-line text-bone/50">
              {option.band}
            </p>
          </div>
        ))}
      </div>

      <div aria-live="polite" className="mt-8 text-center">
        <p className="text-[4.125rem] leading-[0.94] font-extrabold tracking-[-0.045em] text-green tabular-nums">
          <span className="align-top text-[0.42em] opacity-85">₹</span>
          {fmt(perRide * rides)}
        </p>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-bone/60">
          back to you this month, at your current volume.
        </p>
        <p className="mt-4 min-h-5 text-[0.8125rem] text-green">
          {nextTier
            ? `${nextTier.min - rides} more rides a month takes you to ${nextTier.rate * 100}%.`
            : "You're at the top tier."}
        </p>
      </div>
    </div>
  );
}
