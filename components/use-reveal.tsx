"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll wrapper. Children (direct siblings inside `as`) fade + rise
 * once when they enter the viewport, with an 80ms stagger between siblings.
 * Honors prefers-reduced-motion via the .reveal / .reveal-in CSS in globals.css.
 */
export function Reveal({
  children,
  className,
  stagger = 80,
  as: Tag = "div",
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: React.ElementType;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (items.length === 0) return;

    items.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${i * stagger}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stagger, threshold]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
