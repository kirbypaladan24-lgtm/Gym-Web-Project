"use client";

/* ============================================================================
   PhotoBand — a full-bleed cinematic photograph section (cool pass).
   The gym's own photography becomes the section itself: edge-to-edge,
   dimmed and desaturated (the honest "not final" treatment), with the
   heading set bottom-left like a film title card.

   - GSAP ScrollTrigger gives the photograph a slow vertical drift as the
     visitor scrolls past (the wrapper is 124% tall so edges never show).
     The site's second and last scrubbed effect — motion tied to input.
   - prefers-reduced-motion: no drift; the photo simply sits.
   - The heading rises word by word via <WordReveal/> (skill §4).
   ============================================================================ */

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";

gsap.registerPlugin(ScrollTrigger);

/* SSR-safe layout effect: runs before paint on the client, never on server */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface PhotoBandProps {
  /** Photograph path (public/photos/...). */
  photo: string;
  /** Honest description of the photograph (assistive tech). */
  photoAlt: string;
  label?: string;
  heading: string;
  /** Passed to the section's aria-labelledby and the inner heading. */
  id?: string;
  /** CTA row / supporting copy under the heading. */
  children?: ReactNode;
  /** Section sizing — e.g. "h-[72vh] min-h-[560px] max-h-[920px]". */
  className?: string;
}

export function PhotoBand({
  photo,
  photoAlt,
  label,
  heading,
  id,
  children,
  className = "",
}: PhotoBandProps) {
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
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${className}`}>
      {/* Parallax wrapper — taller than the section so the drift never
          reveals an edge. */}
      <div ref={wrapRef} className="absolute inset-x-0 -top-[12%] -bottom-[12%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={photoAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale-[0.55] brightness-[0.68] contrast-[1.07]"
        />
      </div>

      {/* Scrims: blend the photograph into the flat gray above and below,
          and keep the lower-left corner calm for the title card. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,28,28,0.88) 0%, rgba(28,28,28,0.25) 30%, rgba(18,18,18,0.38) 65%, #121212 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(18,18,18,0.66) 0%, rgba(18,18,18,0.22) 42%, transparent 68%)",
        }}
      />

      {/* Title card — bottom-left, cinematic */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:pb-24">
        {label ? (
          <Reveal>
            <p className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-7 bg-ember" />
              <span className="label-utility !text-silver">{label}</span>
            </p>
          </Reveal>
        ) : null}
        <WordReveal
          as="h2"
          id={id}
          text={heading}
          delay={0.1}
          className="heading-display mt-5 max-w-3xl text-[clamp(2.3rem,5.6vw,4.6rem)] text-bone"
        />
        {children}
      </div>
    </section>
  );
}
