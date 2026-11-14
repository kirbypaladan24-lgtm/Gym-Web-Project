"use client";

/* ============================================================================
   Site header — simple, easy to understand navigation (plan §3.3).
   - Desktop: quiet top bar, uppercase utility links, ember CTA.
   - Mobile: menu button reveals a full-screen overlay (keyboard friendly,
     Escape closes).

   PREMIUM SHINE PASS:
   - platinum metallic wordmark (brand silver family)
   - luminous hairline under the bar (light bloom at center)
   - active link carries a soft light underline
   - "Join now" is a glossy ember button (btn-gloss-ember)
   - the bar deepens + gains elevation once the page scrolls
   ============================================================================ */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteFacts } from "@/lib/content";

const NAV = [
  { href: "/branches", label: "Branches" },
  { href: "/equipment", label: "Equipment" },
  { href: "/memberships", label: "Memberships" },
  { href: "/tour", label: "Virtual tour" },
  { href: "/announcements", label: "Updates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Elevation once the page scrolls (premium material response)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock scroll while the overlay is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-[background-color,box-shadow] duration-state ${
        scrolled ? "bg-ink/95 shadow-beautiful-sm" : "bg-ink/80"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${siteFacts.name} — home`}
        >
          {/* The supplied black-and-white emblem, shown on a small white
              field so it stays untouched (plan §3: never recolor the logo).
              A faint platinum rim light frames the field. */}
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xs bg-bone shadow-[0_0_0_1px_rgba(184,190,198,0.35),0_4px_14px_-4px_rgba(0,0,0,0.7)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteFacts.logoPath}
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-contain p-[3px]"
            />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[15px] font-extrabold tracking-tight text-metallic-static">
              AV Fitness Gym
            </span>
            <span className="label-utility mt-1">Est. {siteFacts.established}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`label-utility relative transition-colors duration-micro hover:text-bone ${
                  active ? "text-bone" : ""
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-silver to-transparent"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/memberships/join"
            className="btn-gloss-ember hidden rounded-xs px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] sm:inline-block"
          >
            Join now
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xs border border-line"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              className={`block h-[1.5px] w-5 bg-bone transition-transform duration-state ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-bone transition-opacity duration-state ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-bone transition-transform duration-state ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Luminous hairline — soft light bloom at the center */}
      <div className="hairline-glow" aria-hidden="true" />

      {/* Mobile overlay */}
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-16 z-40 flex flex-col bg-ink/98 px-6 pb-10 pt-6 backdrop-blur-md lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line py-4 text-2xl font-extrabold tracking-tight text-bone"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/memberships/join"
            className="btn-gloss-ember mt-8 rounded-xs px-4 py-4 text-center text-sm font-bold uppercase tracking-[0.14em]"
          >
            Join now
          </Link>
          <p className="label-utility mt-8">Est. {siteFacts.established} · Two branches</p>
        </div>
      ) : null}
    </header>
  );
}
