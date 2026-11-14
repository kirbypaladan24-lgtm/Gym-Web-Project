/* ============================================================================
   PlaceholderMedia — media box for pages awaiting dedicated photography.
   Two states (owner direction, 2026-11-07):

   1. photo supplied → the gym's own photograph (from .assets, optimized
      into public/photos) fills the box:
        - displayed with a gray filter (the honest "not final" state)
        - hover: the filter smoothly lifts to full color while the image
          eases into a gentle ~5% zoom (700ms, expo-out)
        - keyboard focus reveals the same state via the nearest group
        - reduced motion: no zoom, no transition (image simply shown)
   2. no photo yet → the neutral watermark placeholder (plan §4.2): a
      quiet charcoal field, brand emblem, and an explicit "photograph
      pending" label. Never presented as a real gym photo.
   ============================================================================ */

import { siteFacts } from "@/lib/content";

interface PlaceholderMediaProps {
  /** What real image will replace this block, e.g. "Branch 1 entrance". */
  awaiting: string;
  /** Layout hints */
  className?: string;
  ratio?: "wide" | "square" | "tall" | "panorama";
  label?: string;
  /** Supplied photograph path (public/photos/...). Omit for the watermark state. */
  photo?: string;
  /** Honest description of the supplied photo (assistive tech). */
  photoAlt?: string;
}

const RATIOS: Record<string, string> = {
  wide: "aspect-[16/10]",
  square: "aspect-square",
  tall: "aspect-[3/4]",
  panorama: "aspect-[21/9]",
};

export function PlaceholderMedia({
  awaiting,
  className = "",
  ratio = "wide",
  label = "Photograph pending",
  photo,
  photoAlt,
}: PlaceholderMediaProps) {
  /* ------------------------- Supplied photo state ------------------------ */
  if (photo) {
    return (
      <figure
        className={`group relative overflow-hidden rounded-sm border border-line bg-surface ${RATIOS[ratio]} ${className}`}
        role="img"
        aria-label={photoAlt ?? `AV Fitness Gym photograph — ${awaiting}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover grayscale brightness-[0.94] contrast-[1.04] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0 group-hover:brightness-[1.05] group-hover:saturate-[1.1] group-focus-visible:scale-[1.05] group-focus-visible:grayscale-0 group-focus-visible:brightness-[1.05] group-focus-visible:saturate-[1.1] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
        />
        {/* Soft bottom vignette — depth on dark crops */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/45 to-transparent"
        />
      </figure>
    );
  }

  /* ------------------------ Watermark placeholder ------------------------ */
  return (
    <figure
      className={`relative flex items-center justify-center overflow-hidden rounded-sm border border-line bg-surface ${RATIOS[ratio]} ${className}`}
      role="img"
      aria-label={`Placeholder — ${awaiting} (photograph not yet supplied)`}
    >
      {/* Subtle vertical fold shading echoes the hero atmosphere */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(115deg, #1c1c1c 0%, #202020 45%, #242424 100%)",
        }}
      />
      {/* Watermark emblem — the one honest brand asset */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={siteFacts.logoPath}
        alt=""
        aria-hidden="true"
        className="w-14 opacity-[0.14] grayscale"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-line/70 bg-ink/70 px-4 py-2.5 backdrop-blur-[2px]">
        <span className="label-utility !text-silver">{label}</span>
        <span className="truncate text-[11px] text-muted">{awaiting}</span>
      </figcaption>
    </figure>
  );
}

