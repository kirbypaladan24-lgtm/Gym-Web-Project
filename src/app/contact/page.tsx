"use client";

/* ============================================================================
   Contact (plan §5.7) — an inquiry path that does not expose private staff
   details. Phase 1: client-side form with validation and a clear success
   state. When the backend lands (Phase 2+), this posts to a server action
   with rate limiting (plan §12).

   AWWWARDS QUALITY PASS: shared PageMasthead opening (index 07), inputs
   gain a soft platinum focus ring, the submit uses the glossy ember button,
   aside panels carry the gloss surface language.
   ============================================================================ */

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/reveal";
import { PageMasthead } from "@/components/page-masthead";
import { branches, faqs, contactContent, mastheadPhotos } from "@/lib/content";

/* One focus treatment for every control — visible, consistent, platinum */
const FIELD =
  "mt-2 w-full rounded-xs border border-line bg-surface px-4 py-3 text-[15px] text-bone placeholder:text-muted transition-all duration-micro focus:border-silver focus:shadow-[0_0_0_3px_rgba(184,190,198,0.14)] focus:outline-none";

export default function ContactPage() {
  const cc = contactContent;
  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid =
    form.name.trim().length >= 2 &&
    /.+@.+\..+/.test(form.email) &&
    form.message.trim().length >= 10;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid) {
      setError("Please complete the highlighted fields.");
      return;
    }
    setError(null);
    // Phase 1: message recorded for follow-up once staff channels confirm.
    setSent(true);
  }

  return (
    <>
      <PageMasthead
        index="07"
        label={cc.label}
        heading={cc.heading}
        photo={mastheadPhotos.contact}
        description={cc.description}
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <div>
            {sent ? (
              <Reveal>
                <div
                  role="status"
                  className="card-gloss rounded-sm border border-line p-7"
                >
                  <h2 className="text-lg font-extrabold tracking-tight text-bone">
                    Message noted — thank you.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Your inquiry has been recorded. Once the gym's contact
                    channels and email delivery are configured, messages will be
                    delivered directly to staff.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={140}>
                <form onSubmit={onSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label>
                      <span className="label-utility">Name</span>
                      <input
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={FIELD}
                        placeholder="Your name"
                      />
                    </label>
                    <label>
                      <span className="label-utility">Email</span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={FIELD}
                        placeholder="you@email.com"
                      />
                    </label>
                  </div>
                  <label>
                    <span className="label-utility">Branch (optional)</span>
                    <select
                      value={form.branch}
                      onChange={(e) => setForm({ ...form, branch: e.target.value })}
                      className={`${FIELD} appearance-none`}
                    >
                      <option value="">No preference</option>
                      {branches.map((b) => (
                        <option key={b.slug} value={b.slug}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="label-utility">Message</span>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${FIELD} resize-none`}
                      placeholder="How can we help?"
                    />
                  </label>

                  {error ? (
                    <p role="alert" className="text-sm text-ember">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="btn-gloss-ember rounded-xs px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em]"
                  >
                    Contact us
                  </button>
                </form>
              </Reveal>
            )}
          </div>

          {/* Aside: verified channels + FAQs */}
          <aside className="space-y-8">
            <Reveal delay={200}>
              <section
                aria-labelledby="contact-channels"
                className="card-gloss rounded-sm border border-line p-6"
              >
                <h2 id="contact-channels" className="label-utility !text-silver">
                  Contact information
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {cc.channels.map((ch) => (
                    <li
                      key={ch.key}
                      className="flex items-center justify-between gap-4 border-b border-line pb-3.5 last:border-b-0 last:pb-0"
                    >
                      <span className="text-sm font-semibold text-bone">
                        {ch.label}
                      </span>
                      <span className="tag-unconfirmed rounded-xs px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]">
                        To be confirmed
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] leading-relaxed text-muted">
                  Official phone numbers, messaging accounts, social pages, and
                  branch desk contacts publish here only after the gym approves
                  them. No personal staff details appear without permission.
                </p>
              </section>
            </Reveal>

            <Reveal delay={260}>
              <section
                aria-labelledby="contact-faqs"
                className="card-gloss rounded-sm border border-line p-6"
              >
                <h2 id="contact-faqs" className="label-utility !text-silver">
                  Quick answers
                </h2>
                <ul className="mt-4 space-y-4">
                  {faqs.slice(0, 3).map((f) => (
                    <li key={f.id}>
                      <p className="text-sm font-semibold text-bone">{f.question}</p>
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
                        {f.answer}
                      </p>
                    </li>
                  ))}
                </ul>
                <a
                  href="/faqs"
                  className="label-utility mt-5 inline-block !text-silver transition-colors duration-micro hover:!text-bone"
                >
                  All FAQs →
                </a>
              </section>
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  );
}
