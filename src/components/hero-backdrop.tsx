"use client";

/* ============================================================================
   HeroBackdrop — the hero's photographic backdrop.
   Owner request (2026-11-08): "lets try to add an image background in this
   part 'YOUR SPACE. YOUR STRENGTH. YOUR PROGRESS.'".

   The gym's own photography behind the chrome-platinum headline:
   - the photograph sits edge-to-edge, dimmed and desaturated in the site's
     established photo language, with a left scrim keeping the headline
     column deep and quiet, and a bottom blend into the marquee ribbon
   - GSAP ScrollTrigger gives it a slow vertical drift as the visitor
     scrolls on (same pattern as PhotoBand); the wrapper is 124% tall so
     the drift never reveals an edge
   - prefers-reduced-motion: no drift, the photo simply sits
   - replaces <Atmosphere/> in the hero (its flat gray base would wash the
     photo out); the skylight key light and vignette carry over unchanged
   - owner rules hold: no particles, no pointer light, no moving light
     lines — a photograph, dimmed, that is all
   ============================================================================ */

import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* SSR-safe layout effect: runs before paint on the client, never on server */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface HeroBackdropProps {
  /** Photograph path (public/photos/...). */
  photo: string;
  /** Honest description of the photograph (assistive tech). */
  photoAlt: string;
}

export function HeroBackdrop({ photo, photoAlt }: HeroBackdropProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = el.closest("section");
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Parallax wrapper — taller than the hero so the drift never
          reveals an edge. Object position keeps the backlit figure
          right-of-center; the left half stays calm for the headline. */}
      <div ref={wrapRef} className="absolute inset-x-0 -top-[12%] -bottom-[12%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={photoAlt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[62%_45%] grayscale-[0.55] brightness-[0.62] contrast-[1.07]"
        />
      </div>

      {/* Left scrim — the headline column stays deep regardless of what
          the photograph does locally. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(18,18,18,0.76) 0%, rgba(18,18,18,0.48) 34%, rgba(18,18,18,0.16) 62%, transparent 78%)",
        }}
      />
      {/* Top fade (fixed header readability) + bottom blend into the
          marquee ribbon (bg-ink) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,18,18,0.5) 0%, rgba(18,18,18,0) 20%, rgba(18,18,18,0) 58%, rgba(18,18,18,0.88) 100%)",
        }}
      />
      {/* Skylight key light — carried over from Atmosphere, broad and
          horizontal, no line structure. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% -15%, rgba(203, 211, 221, 0.08), rgba(184, 190, 198, 0.03) 45%, transparent 70%)",
        }}
      />
      {/* Vignette — edge contrast for the headline, carried over from
          Atmosphere. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 10%, rgba(18, 18, 18, 0) 40%, rgba(18, 18, 18, 0.5) 100%)",
        }}
      />
    </div>
  );
}
