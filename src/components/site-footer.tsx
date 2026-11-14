/* ============================================================================
   Site footer (approved captions §11) — sticks to the bottom on short
   pages, pushed down naturally on long ones (root layout provides the
   flex column). Quiet and editorial: brand block with the tagline, quick
   links, additional links (pending pages), legal line.

   PREMIUM SHINE PASS:
   - luminous hairline along the top edge (light bloom at center)
   - platinum metallic tagline
   - subtle platinum rim light on the emblem field
   ============================================================================ */

import Link from "next/link";
import { siteFacts } from "@/lib/content";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/branches", label: "Branches" },
  { href: "/equipment", label: "Equipment" },
  { href: "/tour", label: "Virtual tour" },
  { href: "/memberships", label: "Membership" },
  { href: "/announcements", label: "Announcements" },
  { href: "/contact", label: "Contact us" },
] as const;

/* Policies the gym has not published yet — listed (captions §11) but
   honestly marked pending instead of dead links. */
const ADDITIONAL_LINKS = [
  "Privacy policy",
  "Terms & conditions",
  "Membership policies",
] as const;

export function SiteFooter() {
  return (
    <footer className="relative mt-auto bg-ink">
      {/* Luminous top hairline — light under a door */}
      <div className="hairline-glow" aria-hidden="true" />

      {/* Soft light bloom above the brand block */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 0%, rgba(184,190,198,0.05), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:grid-cols-[1.15fr_1fr_1fr] lg:gap-20">
        {/* Brand block */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xs bg-bone shadow-[0_0_0_1px_rgba(184,190,198,0.35),0_4px_14px_-4px_rgba(0,0,0,0.7)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteFacts.logoPath}
                alt="AV Fitness Gym emblem"
                width={44}
                height={44}
                className="h-full w-full object-contain p-1"
              />
            </span>
            <div className="leading-tight">
              <p className="text-[15px] font-extrabold tracking-tight">
                AV FITNESS GYM
              </p>
              <p className="label-utility mt-1">Est. {siteFacts.established}</p>
            </div>
          </div>

          <p className="heading-display mt-7 max-w-xs text-2xl text-metallic-static">
            {siteFacts.tagline}
          </p>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            A comfortable, modern gym with two branches. Explore the
            branches, equipment, and memberships online before your first
            visit.
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h2 className="label-utility text-silver">Quick links</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-muted transition-colors duration-micro hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Additional links — pending until the gym publishes each policy */}
        <nav aria-label="Additional links">
          <h2 className="label-utility text-silver">Additional links</h2>
          <ul className="mt-5 space-y-3">
            {ADDITIONAL_LINKS.map((label) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-4 bg-line-strong"
                />
                <span className="text-sm text-muted">{label}</span>
                <span className="tag-unconfirmed rounded-xs px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                  Pending
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xs text-[12px] leading-relaxed text-muted">
            Each policy page publishes only after the gym reviews and
            approves its text.
          </p>
        </nav>
      </div>

      {/* Giant ghost wordmark (cool pass) — the brand as architecture */}
      <div aria-hidden="true" className="overflow-hidden border-t border-line">
        <p className="heading-display mx-auto max-w-7xl px-5 pb-4 pt-10 text-[clamp(2.6rem,9.4vw,8.8rem)] leading-[0.92] tracking-[0.02em] text-outline-faint sm:px-8">
          AV FITNESS GYM
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {siteFacts.name}. All rights
            reserved.
          </p>
          <p className="label-utility">
            Website in preparation — content published as it is verified
          </p>
        </div>
      </div>
    </footer>
  );
}
