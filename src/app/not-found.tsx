import Link from "next/link";
import { WordReveal } from "@/components/word-reveal";

/* 404 — an authored dead end, not a broken one (build-awwwards-quality-sites
   skill §6: every state is designed, including the exits). Chrome display
   type, a soft top bloom echoing the mastheads, one ember CTA home. */

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center px-5 text-center sm:px-8">
      {/* Soft top light bloom — keeps the page connected to the site's light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56"
        style={{
          background:
            "radial-gradient(62% 100% at 50% 0%, rgba(203, 211, 221, 0.07), transparent 70%)",
        }}
      />
      <p className="label-utility relative">Error 404</p>
      <p
        aria-hidden="true"
        className="heading-display relative mt-4 text-[clamp(6rem,22vw,11rem)] leading-none text-outline"
      >
        404
      </p>
      <WordReveal
        as="h1"
        text={"This page isn't\npart of the gym."}
        delay={0.15}
        className="heading-display relative mt-6 text-4xl text-bone sm:text-5xl"
      />
      <p className="relative mt-6 text-base leading-relaxed text-muted">
        The address may have changed, or the page hasn&apos;t been published yet.
      </p>
      <Link
        href="/"
        className="btn-gloss-ember relative mt-10 rounded-xs px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
      >
        Back to home
      </Link>
    </div>
  );
}
