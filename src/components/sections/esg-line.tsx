"use client";

import { useState } from "react";

import { CheckIcon, CopyIcon } from "@/components/ui/line-icons";

/*
 * The ESG line: Manav's signature for the business page. Slide to your
 * team's monthly ride volume and get two things: the tonnes of tailpipe
 * CO2 avoided per year versus the same rides in petrol cars, and the exact
 * sentence to paste into a sustainability report, with a copy button.
 *
 * The maths and its assumptions come from his mockup and are printed in
 * full beside the figure: 9 km average ride, 145 g of tailpipe CO2 per km
 * for an equivalent petrol sedan, tailpipe only, grid generation not
 * netted out. An estimate, clearly labelled, never a certified figure.
 */

const AVG_KM_PER_RIDE = 9;
const PETROL_KG_CO2_PER_KM = 0.145;

function tonnesPerYear(ridesPerMonth: number): string {
  const t = (ridesPerMonth * 12 * AVG_KM_PER_RIDE * PETROL_KG_CO2_PER_KM) / 1000;
  return t < 10 ? t.toFixed(1) : String(Math.round(t));
}

export function EsgLine() {
  const [rides, setRides] = useState(400);
  const [copied, setCopied] = useState(false);

  const tonnes = tonnesPerYear(rides);
  const reportLine = `In the last 12 months, [your company] avoided an estimated ${tonnes} tonnes of tailpipe CO₂ emissions by moving employee transport to Smarto's all-electric fleet.`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(reportLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable (permissions, http); the text stays
      // selectable on the page, so failing quietly is fine.
    }
  };

  return (
    <div>
      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <label htmlFor="esg-rides" className="text-[0.75rem] text-bone/60">
            Employee rides a month
          </label>
          <span className="text-[1.1875rem] font-extrabold tabular-nums">
            {rides.toLocaleString("en-IN")}
          </span>
        </div>
        <input
          id="esg-rides"
          type="range"
          min={50}
          max={2000}
          step={25}
          value={rides}
          onChange={(event) => setRides(Number(event.target.value))}
          className="range-dark mt-3.5"
        />
      </div>

      <div aria-live="polite" className="mt-9 text-center">
        <p className="text-[4.5rem] leading-[0.92] font-extrabold tracking-[-0.045em] text-green tabular-nums">
          {tonnes}
          <span className="ml-2 align-middle text-[0.28em] font-extrabold tracking-[0.2em]">
            TONNES
          </span>
        </p>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-bone/60">
          of tailpipe CO₂ avoided per year,
          <br />
          versus the same rides in petrol cars.
        </p>
      </div>

      <figure className="mt-7 rounded-[14px] bg-white/6 p-5">
        <figcaption className="text-[0.625rem] font-extrabold tracking-[0.2em] text-green uppercase">
          Paste this into your report
        </figcaption>
        <blockquote className="mt-3 text-[0.90625rem] leading-relaxed text-white">
          In the last 12 months,{" "}
          <em className="font-extrabold not-italic">[your company]</em> avoided
          an estimated{" "}
          <em className="font-extrabold not-italic">{tonnes} tonnes</em> of
          tailpipe CO₂ emissions by moving employee transport to
          Smarto&rsquo;s all-electric fleet.
        </blockquote>
        <button
          type="button"
          onClick={copy}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-[0.8125rem] font-extrabold text-ink transition-transform duration-[180ms] active:scale-[0.985]"
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-green-deep" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
          {copied ? "Copied" : "Copy this line"}
        </button>
        <p className="mt-4 text-[0.65625rem] leading-relaxed text-bone/35">
          Estimate only. Assumes an average ride of {AVG_KM_PER_RIDE} km and
          145 g of tailpipe CO₂ per km for an equivalent petrol sedan. Covers
          tailpipe emissions avoided; grid generation is not netted out.
          We&rsquo;ll give you your actual ride data every month, and you can
          run your own figure.
        </p>
      </figure>
    </div>
  );
}
