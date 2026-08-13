"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

import styles from "./page.module.css";

type KineticProperties = CSSProperties & {
  "--pointer-x": string;
  "--pointer-y": string;
  "--page-progress": number;
};

export function MotionShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrame = 0;

    const updatePointer = (event: PointerEvent) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--page-progress", String(progress));
    };

    updateProgress();
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  const initialProperties: KineticProperties = {
    "--pointer-x": "72vw",
    "--pointer-y": "28vh",
    "--page-progress": 0,
  };

  return (
    <div ref={rootRef} className={styles.experience} style={initialProperties}>
      <div className={styles.pointerGlow} aria-hidden="true" />
      <div className={styles.progress} aria-hidden="true" />
      {children}
    </div>
  );
}
