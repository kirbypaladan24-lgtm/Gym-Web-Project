import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

/* One modern, highly legible sans family (plan §3.4) — strong heading
   weights, comfortable body text, no unrelated families. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AV Fitness Gym — Your space. Your strength. Your progress.",
    template: "%s · AV Fitness Gym",
  },
  description:
    "AV Fitness Gym — a comfortable, modern gym with two branches. Explore memberships, equipment, and the 360° virtual tour online before your first visit. Est. 2025.",
  keywords: ["AV Fitness Gym", "gym", "fitness", "membership", "virtual tour"],
  openGraph: {
    title: "AV Fitness Gym",
    description:
      "Your space. Your strength. Your progress. — explore the gym's branches, equipment, and memberships online before your first visit.",
    type: "website",
    siteName: "AV Fitness Gym",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {/* Lenis smooth scroll — the site's sole smooth-scroll engine.
            Reduced motion / no JS: native scrolling, untouched. */}
        <SmoothScroll />
        {/* Flex column keeps the footer pinned to the bottom on short pages
            and naturally pushed on long ones. */}
        <div className="flex min-h-screen flex-col bg-deep">
          <SiteHeader />
          {/* Header offset: fixed 64px bar */}
          <main className="flex-1 pt-16">{children}</main>
          <SiteFooter />
        </div>
        {/* Filmic grain — one near-invisible noise layer over everything
            (premium pass: kills gradient banding, adds cinema texture).
            Decorative only: aria-hidden, pointer-events: none. */}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}

