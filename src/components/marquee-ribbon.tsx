/* ============================================================================
   MarqueeRibbon — a slow horizontal ticker of brand words (cool pass).
   Pure CSS animation, zero JS: the track holds two identical copies and
   translates exactly -50% for a seamless loop.

   - pauses on hover / keyboard focus (group utility)
   - prefers-reduced-motion: the animation stops entirely (globals.css)
     and the words simply rest in place
   - decorative by design — the whole ribbon is aria-hidden because the
     tagline already lives in the hero <h1> and the footer
   ============================================================================ */

interface MarqueeRibbonProps {
  items: readonly string[];
  className?: string;
}

export function MarqueeRibbon({ items, className = "" }: MarqueeRibbonProps) {
  const copy = (key: string) => (
    <div key={key} className="flex items-center gap-10 pr-10">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.34em] text-silver/55">
            {item}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-silver/35" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={`group overflow-hidden border-y border-line bg-ink py-4 ${className}`}
    >
      <div className="marquee-fade">
        <div className="marquee-track group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]">
          {copy("a")}
          {copy("b")}
        </div>
      </div>
    </div>
  );
}
