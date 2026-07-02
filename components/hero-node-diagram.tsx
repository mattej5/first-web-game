"use client";

import { useEffect, useRef, useState } from "react";
import { NodeDiagram } from "@/components/node-diagram";

/**
 * Time-based draw-in for the NodeDiagram's circuit trace. On mount, progress
 * animates 0 → 1 over ~2s with an ease-out curve, so the full sequence (lines
 * tracing + all five nodes lighting one by one) plays while the diagram is
 * guaranteed on screen. Respects prefers-reduced-motion (instant progress = 1).
 */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function HeroNodeDiagram() {
  const [progress, setProgress] = useState(() =>
    prefersReducedMotion() ? 1 : 0
  );
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const DURATION = 2000;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(easeOut(t));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return <NodeDiagram progress={progress} />;
}
