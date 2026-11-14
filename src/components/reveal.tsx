"use client";

/* ============================================================================
   Reveal — scroll-triggered entrance.
   Exact pattern from the workspace skill `animation-on-scroll`:
   IntersectionObserver adds `.reveal-in`, which switches the element's
   paused reveal animation to running (keyframes live in globals.css).
   Choreography follows `animation-systems`: primary first, small stagger
   for siblings, animate once, final state visible without JS / with
   reduced motion (globals.css handles both).
   ============================================================================ */

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer?.unobserve(entry.target); // run once
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
  }
  return observer;
}

interface RevealProps {
  children: ReactNode;
  /** Stagger in ms — keep between 40–90 per animation-systems. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure" | "span";
}

export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const Tag = as as "div";
  const style: CSSProperties = delay ? { animationDelay: `${delay}ms` } : {};

  return (
    <Tag ref={ref as never} className={`reveal-on-scroll ${className}`} style={style}>
      {children}
    </Tag>
  );
}
