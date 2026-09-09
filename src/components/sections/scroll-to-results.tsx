"use client";

import { useEffect } from "react";

/**
 * On phones the form fills the first screen, so a fresh search would otherwise
 * land the visitor looking at the form they just used. Bring the results into
 * view once; desktop shows both columns side by side and needs nothing.
 */
export function ScrollToResults() {
  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    const target = document.getElementById("results");
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, []);
  return null;
}
