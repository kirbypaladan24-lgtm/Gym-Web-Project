import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { PageMasthead } from "@/components/page-masthead";
import {
  membershipPlans,
  membershipContent,
  paymentContent,
  faqs,
  mastheadPhotos,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Memberships",
  description:
    "AV Fitness Gym membership rates — day passes, 1-month plans (upfront or auto-debit), and 3-, 6-, and 12-month commitments. Register online in minutes.",
};

const JOIN_FAQS = faqs.filter((f) =>
  ["faq-pricing", "faq-payment"].includes(f.id),
);

/* ============================================================================
   Memberships — subscription-style pricing page.
   Layout follows the owner-supplied rate-sheet UI (2026-11-07): six equal
   plan cards in a 3-column grid — centered plan name and price, checkmark
   inclusions, full-width CTA — with the 12-month plan highlighted as the
   best value. Rendering stays in the site palette: plain dark-gray gloss
   surfaces, platinum-chrome prices, and restrained ember reserved for the
   highlighted card (border, checks, button) — ember is never spread across
   all six cards (brand rule: key actions only).
   Rates come from the gym's own rate sheet (src/lib/content.ts).

   AWWWARDS QUALITY PASS: shared PageMasthead opening (index 03); section
   headings rise word by word. The card grid layout is untouched.
   ============================================================================ */

/* Circular check mark — silver on standard cards, ember on the featured
   card (mirrors the reference's accent-colored checks). */
function PlanCheck({ featured = false }: { featured?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
        featured ? "bg-ember" : "bg-silver"
      }`}
    >
      <svg
        viewBox="0 0 12 12"
        className={`h-2.5 w-2.5 ${featured ? "text-bone" : "text-ink"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        aria-hidden="true"
      >
        <path
          d="M1.8 6.4 4.6 9 10.2 3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function MembershipsPage() {
  const mc = membershipContent;
  const pc = paymentContent;

  return (
    <>
      {/* ------------------------------ Page head ------------------------------ */}
      <PageMasthead
        index="03"
        label={mc.label}
        heading={mc.heading}
        description={mc.description}
        photo={mastheadPhotos.memberships}
      >
        <Reveal delay={280}>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            {mc.intro}
          </p>
        </Reveal>
      </PageMasthead>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

      {/* --------------------------- Plan rate grid --------------------------- */}
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {membershipPlans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 70} className="h-full">
            <div className="relative h-full">
              {plan.featured ? (
                <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xs bg-ember px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bone shadow-[0_6px_18px_-6px_rgba(184,50,60,0.75)]">
                  Best value
                </span>
              ) : null}
              <article
                className={`sheen-hover card-gloss flex h-full flex-col rounded-lg p-7 ${
                  plan.featured
                    ? "border border-ember/60 shadow-[0_0_44px_-14px_rgba(184,50,60,0.5)]"
                    : "border border-line shadow-beautiful-sm"
                }`}
              >
                <h2 className="text-center text-xl font-extrabold tracking-tight text-bone">
                  {plan.name}
                </h2>

                <p className="mt-5 flex items-baseline justify-center gap-1.5">
                  <span className="text-[40px] font-extrabold leading-none tracking-tight text-metallic-static">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-muted">
                    {plan.priceUnit}
                  </span>
                </p>

                <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
                  {plan.total ? (
                    <li className="flex items-start gap-3 text-sm text-muted">
                      <PlanCheck featured={plan.featured} />
                      <span>
                        Total:{" "}
                        <span
                          className={`font-semibold ${
                            plan.featured ? "text-ember-bright" : "text-silver"
                          }`}
                        >
                          {plan.total}
                        </span>
                      </span>
                    </li>
                  ) : null}
                  {plan.inclusions.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <PlanCheck featured={plan.featured} />
                      {inc}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/memberships/join?plan=${plan.id}`}
                  className={`mt-8 rounded-xs px-4 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.14em] ${
                    plan.featured ? "btn-gloss-ember" : "btn-gloss-ghost"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <p className="mt-8 text-center text-[13px] leading-relaxed text-muted">
          Rates follow the gym&rsquo;s provided rate sheet. Branch eligibility,
          renewals, and payment methods are confirmed with staff at
          registration.
        </p>
      </Reveal>

      {/* Online payment — how it will work (captions §7) */}
      <Reveal delay={100}>
        <section
          aria-labelledby="payment-explainer"
          className="mt-14 rounded-sm border border-line bg-surface p-7 sm:p-9"
        >
          <p className="label-utility">Online payment</p>
          <WordReveal
            as="h2"
            id="payment-explainer"
            text={pc.heading}
            delay={0.06}
            className="heading-display mt-4 max-w-xl text-3xl text-bone sm:text-4xl"
          />
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-silver">
            {pc.description}
          </p>

          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
            {(
              [
                ["pending", pc.statuses.pending],
                ["successful", pc.statuses.successful],
                ["failed", pc.statuses.failed],
              ] as const
            ).map(([key, status]) => (
              <div key={key} className="bg-charcoal/95 p-6">
                <div className="flex items-center gap-2.5">
                  {/* Quiet status marks — no traffic-light color pairing
                      until payments go live: hollow = pending, filled =
                      confirmed, ember = failed. */}
                  <span
                    aria-hidden="true"
                    className={
                      key === "pending"
                        ? "h-1.5 w-1.5 rounded-full outline outline-1 outline-silver"
                        : key === "successful"
                          ? "h-1.5 w-1.5 rounded-full bg-bone"
                          : "h-1.5 w-1.5 rounded-full bg-ember"
                    }
                  />
                  <h3 className="label-utility !text-bone">{status.label}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {status.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-sm border border-dashed border-line-strong bg-deep/40 p-5 text-[13px] leading-relaxed text-muted">
            <strong className="font-semibold text-silver">Important:</strong>{" "}
            {pc.activationNote} Online payment is not enabled yet — it
            activates once the gym&rsquo;s supported payment methods are
            confirmed, with server-side verification on every transaction.
          </p>
        </section>
      </Reveal>

      {/* Registration call (captions §6) */}
      <Reveal delay={80}>
        <section
          aria-labelledby="registration-call"
          className="surface-brand-gradient mt-14 rounded-sm border border-line p-9 text-center sm:p-12"
        >
          <WordReveal
            as="h2"
            id="registration-call"
            text={mc.registration.heading}
            delay={0.06}
            className="heading-display mx-auto max-w-xl text-3xl text-bone sm:text-4xl"
          />
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-silver">
            {mc.registration.text}
          </p>
          <div className="mt-8">
            <Link
              href="/memberships/join"
              className="btn-gloss-ember inline-block rounded-xs px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
            >
              {mc.registration.cta}
            </Link>
          </div>
        </section>
      </Reveal>

      {/* Terms honesty note */}
      <Reveal delay={60}>
        <section
          id="membership-terms"
          aria-labelledby="membership-terms-title"
          className="mt-14 scroll-mt-24 rounded-sm border border-dashed border-line-strong bg-surface/50 p-7"
        >
          <h2 id="membership-terms-title" className="label-utility !text-silver">
            Terms &amp; policies — pending
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            Plan rates above follow the rate sheet provided by the gym.
            Registration requirements, renewal rules, cancellation and refund
            policies, membership transferability between branches, and any
            applicable fees will be published here in plain language once the
            gym confirms them. Online payment activates only after the
            gym&rsquo;s supported payment methods are confirmed.
          </p>
        </section>
      </Reveal>

      {/* Related FAQs */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {JOIN_FAQS.map((f, i) => (
          <Reveal key={f.id} delay={i * 70}>
            <section aria-labelledby={f.id} className="border-t border-line pt-6">
              <h2 id={f.id} className="text-lg font-extrabold tracking-tight text-bone">
                {f.question}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.answer}</p>
            </section>
          </Reveal>
        ))}
      </div>
      </div>
    </>
  );
}

