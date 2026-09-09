"use client";

import { useEffect } from "react";

/**
 * Set by the search form the moment a search is submitted; consumed by the
 * results (or their skeleton) as soon as they mount.
 */
const FLAG = "smarto:scroll-to-results";

export function requestScrollToResults(): void {
  try {
    window.sessionStorage.setItem(FLAG, "1");
  } catch {
    /* private mode or storage disabled: the visitor scrolls by hand */
  }
}

/**
 * On phones the form fills the first screen, so a freshly submitted search
 * would otherwise leave the visitor staring at the form they just used. This
 * brings the results into view once, and only after a submission: landing on
 * /flights from a link stays at the top of the page like any other route.
 * Desktop shows both columns side by side and needs nothing.
 */
export function ScrollToResults() {
  useEffect(() => {
    let requested = false;
    try {
      requested = window.sessionStorage.getItem(FLAG) === "1";
      if (requested) window.sessionStorage.removeItem(FLAG);
    } catch {
      return;
    }
    if (!requested || window.innerWidth >= 1024) return;

    const target = document.getElementById("results");
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, []);
  return null;
}
