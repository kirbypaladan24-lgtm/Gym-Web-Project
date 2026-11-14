"use client";

/* ============================================================================
   WordReveal — the site's headline choreography (build-awwwards-quality-sites
   skill §4: reveal major headings word by word with a restrained stagger).

   How it works:
   - Server renders the full heading as plain spans (SSR/no-JS: every word
     is visible; nothing depends on JavaScript).
   - On mount (before paint, via layout effect) each word is masked inside
     an overflow-hidden span and rises in with GSAP power4.out, staggered
     55ms, triggered once when the heading enters the viewport.
   - The unsplit accessible name is preserved: the heading carries the full
     text as its aria-label and the decorative word spans are aria-hidden.
   - prefers-reduced-motion: no animation at all — words simply stay put.
   - wordClassName applies a class to every word span. Use it for gradient
     fills (text-metallic / text-metallic-static): background-clip:text must
     live on the transformed element itself, not an ancestor.
   ============================================================================ */

import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* SSR-safe layout effect: runs before paint on the client, never on server */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface WordRevealProps {
  /** Headline text. "\n" forces a line break; each line is its own group. */
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  /** Class applied to every animated word span (gradient fills). */
  wordClassName?: string;
  /** Seconds before the first word rises. */
  delay?: number;
  /** Seconds between words — keep between 0.04–0.08 (animation-systems). */
  stagger?: number;
}

export function WordReveal({
  text,
  as = "h2",
  id,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.055,
}: WordRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* Reduced motion: the server-rendered words are already complete. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    if (!words.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const Tag = as as ElementType;
  /* Only semantic elements may carry aria-label (a bare span cannot). */
  const semantic = as !== "span";
  const ariaText = text.replace(/\n/g, " ");
  const lines = text.split("\n").filter((l) => l.trim().length > 0);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      /* Two Chromium line-breaking realities for split words (inline-block
         masks), learned the hard way:
         1. text-wrap: balance (heading-display) never breaks between
            inline-blocks — force normal wrapping.
         2. ANY negative letter-spacing in the line removes the break
            opportunity at the space between inline-blocks (Chromium
            bug) — so split headings render with normal tracking.
            Plain-text headings elsewhere keep the -0.035em tracking. */
      style={{
        textWrap: "normal",
        letterSpacing: "normal",
        /* ~4px right buffer: Chromium measures inline-block lines a hair
           wider than it renders them; without this, a line that "just
           fits" clips its last glyph instead of wrapping. */
        paddingRight: "0.08em",
      }}
      aria-label={semantic ? ariaText : undefined}
    >
      {lines.map((line, li) => {
        const words = line.split(" ").filter(Boolean);
        return (
          <span
            key={li}
            aria-hidden="true"
            className={lines.length > 1 ? "block" : undefined}
          >
            {words.map((w, wi) => (
              <Fragment key={wi}>
                {/* Mask: overflow-hidden clip, with descender room so tails
                    (y, g, p) never clip at rest. The negative margin cancels
                    the padding in layout. */}
                <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                  <span
                    data-w
                    className={`inline-block will-change-transform ${wordClassName}`}
                  >
                    {w}
                  </span>
                </span>
                {/* Real space BETWEEN masks (not &nbsp; inside them) so the
                    line keeps its natural break opportunities — narrow
                    viewports wrap between words exactly like plain text. */}
                {wi < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
