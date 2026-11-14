"use client";

/* ============================================================================
   Join — membership registration (plan §7 customer journey, Phase 1 form).
   What is REAL here: the step flow (branch → plan → details → review),
   validation, and a clear confirmation with a reference number.
   What is intentionally NOT here: any payment capture. The plan (§7.2)
   forbids wiring payments before the gym's provider is confirmed, so the
   review step states exactly that, and submission records interest only.
   When Phase 3 lands, this form connects to a server action / API route
   with a real payment state machine (§7.3).
   ============================================================================ */

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { WordReveal } from "@/components/word-reveal";
import { branches, membershipPlans, paymentContent } from "@/lib/content";

type Step = 1 | 2 | 3 | 4;

interface FormState {
  branchSlug: string;
  planId: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

const INITIAL: FormState = {
  branchSlug: "",
  planId: "",
  fullName: "",
  email: "",
  phone: "",
  notes: "",
};

function reference(): string {
  // Client-side display reference only — the durable record is created
  // server-side when Phase 3 registration lands.
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `AV-${stamp}${rand}`;
}

export function JoinFlow({ initialPlanId }: { initialPlanId?: string }) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    planId: initialPlanId ?? "",
  });
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const plan = useMemo(
    () => membershipPlans.find((p) => p.id === form.planId),
    [form.planId],
  );
  const branch = useMemo(
    () => branches.find((b) => b.slug === form.branchSlug),
    [form.branchSlug],
  );

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const stepValid =
    step === 1
      ? form.branchSlug !== ""
      : step === 2
        ? form.planId !== ""
        : step === 3
          ? form.fullName.trim().length >= 2 &&
            /.+@.+\..+/.test(form.email) &&
            form.phone.trim().length >= 7
          : true;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submittedRef) return;
    // Phase 1: record interest only. No payment is taken or implied.
    setSubmittedRef(reference());
  }

  /* ------------------------------- Success ------------------------------- */
  if (submittedRef) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
        <p className="label-utility !text-silver">Registration of interest received</p>
        <h1 className="heading-display mt-5 text-4xl text-bone">
          Thanks, {form.fullName.split(" ")[0]}.
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          Your reference is{" "}
          <span className="font-mono text-silver">{submittedRef}</span>. Staff
          will follow up to complete your {plan?.name.toLowerCase() ?? ""}{" "}
          membership at {branch?.name ?? "your chosen branch"} once the
          gym&rsquo;s supported payment methods are confirmed.
        </p>
        <p className="mt-4 text-[13px] leading-relaxed text-muted">
          No payment has been taken. When online payment is enabled, every
          transaction is verified before activation —{" "}
          {paymentContent.activationNote.charAt(0).toLowerCase() +
            paymentContent.activationNote.slice(1)}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn-gloss-ghost rounded-xs px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
          >
            Back to home
          </Link>
          <Link
            href="/tour"
            className="btn-gloss-ember rounded-xs px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
          >
            Take the tour
          </Link>
        </div>
      </div>
    );
  }

  /* -------------------------------- Wizard ------------------------------- */
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <p className="label-utility">Register online</p>
      <WordReveal
        as="h1"
        text="Join the gym."
        delay={0.1}
        className="heading-display mt-4 text-5xl"
        wordClassName="text-metallic-static"
      />

      {/* Stepper */}
      <ol className="mt-10 flex flex-wrap gap-x-2 gap-y-2" aria-label="Steps">
        {["Branch", "Plan", "Your details", "Review"].map((label, i) => {
          const n = (i + 1) as Step;
          const state = n === step ? "current" : n < step ? "done" : "todo";
          return (
            <li key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => n < step && setStep(n)}
                disabled={n > step}
                aria-current={state === "current" ? "step" : undefined}
                className={`flex items-center gap-2 rounded-xs px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-micro ${
                  state === "current"
                    ? "bg-bone text-ink"
                    : state === "done"
                      ? "border border-line-strong text-silver hover:border-silver"
                      : "border border-line text-muted"
                }`}
              >
                <span aria-hidden="true">{n < step ? "✓" : `0${n}`}</span>
                {label}
              </button>
              {i < 3 ? (
                <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
              ) : null}
            </li>
          );
        })}
      </ol>

      <form onSubmit={onSubmit} className="mt-10" noValidate>
        {/* Step 1 — branch */}
        {step === 1 ? (
          <fieldset>
            <legend className="text-lg font-extrabold tracking-tight text-bone">
              Which branch will you train at?
            </legend>
            <p className="mt-2 text-sm text-muted">
              Some memberships may be branch-specific — the gym's rules will be
              stated once confirmed.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {branches.map((b) => (
                <label
                  key={b.slug}
                  className={`flex cursor-pointer flex-col rounded-sm border p-5 transition-colors duration-micro ${
                    form.branchSlug === b.slug
                      ? "border-bone bg-surface-2"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <input
                    type="radio"
                    name="branch"
                    className="sr-only"
                    checked={form.branchSlug === b.slug}
                    onChange={() => set("branchSlug", b.slug)}
                  />
                  <span className="text-lg font-extrabold tracking-tight text-bone">
                    {b.name}
                  </span>
                  <span className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">
                    {b.summary}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {/* Step 2 — plan */}
        {step === 2 ? (
          <fieldset>
            <legend className="text-lg font-extrabold tracking-tight text-bone">
              Choose a membership plan.
            </legend>
            <p className="mt-2 text-sm text-muted">
              Pick the plan that fits your routine — payment is completed
              once the gym&rsquo;s online payment is enabled, or directly at
              your branch.
            </p>
            <div className="mt-6 space-y-4">
              {membershipPlans.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-sm border p-5 transition-colors duration-micro ${
                    form.planId === p.id
                      ? "border-bone bg-surface-2"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    className="sr-only"
                    checked={form.planId === p.id}
                    onChange={() => set("planId", p.id)}
                  />
                  <span>
                    <span className="block text-lg font-extrabold tracking-tight text-bone">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[13px] text-muted">
                      {p.duration} ·{" "}
                      <span className="font-semibold text-silver">{p.price}</span>{" "}
                      {p.priceUnit}
                      {p.total ? (
                        <span> · Total {p.total}</span>
                      ) : null}
                    </span>
                  </span>
                  {p.featured ? (
                    <span className="shrink-0 rounded-xs bg-ember px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-bone">
                      Best value
                    </span>
                  ) : null}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {/* Step 3 — details */}
        {step === 3 ? (
          <fieldset>
            <legend className="text-lg font-extrabold tracking-tight text-bone">
              Your details.
            </legend>
            <p className="mt-2 text-sm text-muted">
              Only what's needed to process your membership — nothing more.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="label-utility">Full name</span>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  className="mt-2 w-full rounded-xs border border-line bg-surface px-4 py-3 text-[15px] text-bone placeholder:text-muted transition-all duration-micro focus:border-silver focus:shadow-[0_0_0_3px_rgba(184,190,198,0.14)] focus:outline-none"
                  placeholder="Juan dela Cruz"
                />
              </label>
              <label>
                <span className="label-utility">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="mt-2 w-full rounded-xs border border-line bg-surface px-4 py-3 text-[15px] text-bone placeholder:text-muted transition-all duration-micro focus:border-silver focus:shadow-[0_0_0_3px_rgba(184,190,198,0.14)] focus:outline-none"
                  placeholder="you@email.com"
                />
              </label>
              <label>
                <span className="label-utility">Mobile number</span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="mt-2 w-full rounded-xs border border-line bg-surface px-4 py-3 text-[15px] text-bone placeholder:text-muted transition-all duration-micro focus:border-silver focus:shadow-[0_0_0_3px_rgba(184,190,198,0.14)] focus:outline-none"
                  placeholder="+63 9XX XXX XXXX"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="label-utility">
                  Anything we should know? (optional)
                </span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  className="mt-2 w-full resize-none rounded-xs border border-line bg-surface px-4 py-3 text-[15px] text-bone placeholder:text-muted transition-all duration-micro focus:border-silver focus:shadow-[0_0_0_3px_rgba(184,190,198,0.14)] focus:outline-none"
                  placeholder="Preferred start date, questions about the branch…"
                />
              </label>
            </div>
          </fieldset>
        ) : null}

        {/* Step 4 — review */}
        {step === 4 ? (
          <fieldset>
            <legend className="text-lg font-extrabold tracking-tight text-bone">
              Review and confirm.
            </legend>
            <dl className="card-gloss mt-6 divide-y divide-line rounded-sm border border-line">
              {[
                ["Branch", branch?.name ?? "—"],
                ["Plan", plan ? `${plan.name} (${plan.duration})` : "—"],
                [
                  "Price",
                  plan
                    ? `${plan.price} ${plan.priceUnit}${plan.total ? ` · total ${plan.total}` : ""}`
                    : "—",
                ],
                ["Name", form.fullName],
                ["Email", form.email],
                ["Mobile", form.phone],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 px-5 py-4">
                  <dt className="label-utility">{k}</dt>
                  <dd className="text-right text-sm font-semibold text-silver">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 rounded-sm border border-dashed border-line-strong bg-surface/50 p-5 text-[13px] leading-relaxed text-muted">
              <strong className="font-semibold text-silver">
                Payment is not enabled yet.
              </strong>{" "}
              Submitting records your registration of interest with the gym —
              no charge is made. When the gym's supported payment methods
              (e.g. GCash, Maya, bank transfer, or a gateway) are confirmed,
              you'll review your selected subscription, choose an available
              payment method, and submit your transaction securely — with
              server-side verification, and membership activation only after
              payment is confirmed.
            </p>
          </fieldset>
        ) : null}

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="btn-gloss-ghost rounded-xs px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button
              type="button"
              disabled={!stepValid}
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="btn-gloss-ember rounded-xs px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              className="btn-gloss-ember rounded-xs px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              Submit registration of interest
            </button>
          )}
        </div>
      </form>
    </div>
  );
}



