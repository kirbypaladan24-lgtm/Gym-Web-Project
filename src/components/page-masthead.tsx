import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";

/* ============================================================================
   PageMasthead — the shared opening moment for every inner page
   (build-awwwards-quality-sites skill §6: "a complete semantic page" with
   a coherent, authored hierarchy; each page opens the same way so the site
   reads as one voice):

     [ index ———————————————— hairline ———————————————— label ]
     HEADING (chrome-platinum fill, words rising in sequence)
     intro copy

   - The index is editorial wayfinding, ordered like the header navigation.
   - A soft top light bloom (the "skylight" from the hero, echoed) keeps
     pages connected to the home page's lighting.
   - The heading rises word by word via <WordReveal/>; the gradient fill
     sits on each word span (background-clip:text must live on the
     transformed element itself).
   - narrow=true gives FAQ-style pages a copy-column width.
   - photo (cool pass): an optional full-bleed backdrop photograph — dimmed
     and desaturated (the honest "not final" treatment) under gradient
     scrims, so the heading stays king while the page gains a cinematic
     first viewport. Static: no parallax, no JS.
   ============================================================================ */

interface PageMastheadProps {
  /** Two-digit site index, e.g. "01" (order follows the header nav). */
  index: string;
  label: string;
  heading: string;
  description?: string;
  narrow?: boolean;
  /** Backdrop photograph path (public/photos/...). Omit for the quiet text-only masthead. */
  photo?: string;
  children?: ReactNode;
}

export function PageMasthead({
  index,
  label,
  heading,
  description,
  narrow = false,
  photo,
  children,
}: PageMastheadProps) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      {/* Backdrop photograph — dimmed, desaturated, blended into the flat
          gray above and below. Decorative: the heading carries the meaning. */}
      {photo ? (
        <div aria-hidden="true" className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover grayscale-[0.55] brightness-[0.58] contrast-[1.06]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,28,28,0.82) 0%, rgba(28,28,28,0.45) 42%, #1c1c1c 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(28,28,28,0.72) 0%, rgba(28,28,28,0.24) 46%, transparent 72%)",
            }}
          />
        </div>
      ) : null}

      {/* Top light bloom — echoes the hero's skylight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56"
        style={{
          background:
            "radial-gradient(62% 100% at 50% 0%, rgba(203, 211, 221, 0.07), transparent 70%)",
        }}
      />
      <div
        className={`relative mx-auto px-5 sm:px-8 ${
          photo ? "py-24 lg:py-32" : "py-20 lg:py-24"
        } ${narrow ? "max-w-3xl" : "max-w-7xl"}`}
      >
        <Reveal>
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="text-[12px] font-bold tracking-[0.22em] text-metallic-static"
            >
              {index}
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-line-strong via-line to-transparent"
            />
            <p className="label-utility">{label}</p>
          </div>
        </Reveal>

        <WordReveal
          as="h1"
          text={heading}
          delay={0.12}
          className="heading-display mt-7 max-w-3xl text-5xl sm:text-6xl"
          wordClassName="text-metallic-static"
        />

        {description ? (
          <Reveal delay={220}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver">
              {description}
            </p>
          </Reveal>
        ) : null}

        {children}
      </div>
    </header>
  );
}
