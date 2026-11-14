"use client";

/* ============================================================================
   SmoothScroll — the site's sole smooth-scroll engine (skill §4).
   Engine decision: Lenis (evaluated against Locomotive Scroll — Lenis is
   lighter, actively maintained, and the standard GSAP ticker integration).
   Exactly one engine is installed and initialized; Locomotive is not.

   - Lenis drives the scroll; GSAP's ticker drives Lenis; every Lenis scroll
     event syncs ScrollTrigger measurements.
   - Route changes (App Router) and font loading both re-measure triggers.
   - prefers-reduced-motion: the component never initializes — the site
     falls back to native scrolling.
   - Cleanup destroys the instance and removes the ticker callback.
   ============================================================================ */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  /* Route changes swap the page content — re-measure every trigger. */
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  /* Web fonts change text metrics — refresh once they arrive. */
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
    };
  }, []);

  return null;
}
