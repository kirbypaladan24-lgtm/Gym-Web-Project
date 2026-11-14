"use client";

/* ============================================================================
   HeroDrift — the site's single justified scrubbed sequence (skill §4:
   "reserve ScrollTrigger for justified scrubbed or pinned sequences").
   The home hero's content drifts upward and dims as the visitor scrolls
   into the page — a quiet exit, never a gimmick.

   - Wraps the hero content column; transforms only this wrapper, so it
     never fights the WordReveal spans inside it (different elements).
   - prefers-reduced-motion: no scrub, content stays put.
   ============================================================================ */

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function HeroDrift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = el.closest("section");
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -16,
        autoAlpha: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
