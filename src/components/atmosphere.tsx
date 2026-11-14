/* ============================================================================
   Atmosphere — the hero's dimly-lit backdrop.
   Owner direction (2026-11-07): remove the vertical moving light lines.
   The animated canvas with its seven drifting light folds is retired;
   what remains is a quiet, fully static backdrop:
     - flat dark-gray base (surface-brand-gradient at the same 0.5 blend)
     - a soft top "key light" spilling from above (broad, horizontal)
     - a faint lower-right focal bloom with a restrained ember note
     - a vignette to keep foreground text contrast high
   Pure CSS layers — no JavaScript, no animation, nothing that can band
   into vertical lines.
   ============================================================================ */

export function Atmosphere({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Flat dark-gray base — same blend the canvas version used */}
      <div
        className="atmosphere-fallback absolute inset-0 surface-brand-gradient"
        style={{ opacity: 0.5 }}
      />
      {/* Top key light — soft platinum light spilling from above, like a
          skylight over the gym floor. Broad radial, no line structure. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% -15%, rgba(203, 211, 221, 0.09), rgba(184, 190, 198, 0.035) 45%, transparent 70%)",
        }}
      />
      {/* Lower-right focal bloom — faint ember warmth, broad and horizontal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 86% 104%, rgba(184, 50, 60, 0.12), rgba(72, 72, 74, 0.08) 45%, transparent 72%)",
        }}
      />
      {/* Vignette — keeps foreground text contrast high on the dark base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 10%, rgba(18, 18, 18, 0) 40%, rgba(18, 18, 18, 0.55) 100%)",
        }}
      />
    </div>
  );
}
