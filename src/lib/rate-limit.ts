/* ----------------------------------------------------------------------------
   Minimal in-memory rate limiter (plan §12: "apply rate limits … to
   authentication, forms, and payment-related endpoints").

   Good enough for a single-instance deployment (the dev site / one VPS).
   If the app is ever horizontally scaled, swap the Map for Redis — the
   call signature stays the same.
   ---------------------------------------------------------------------------- */

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

function prune(now: number, windowMs: number, bucket: Bucket) {
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
}

export interface RateLimitResult {
  ok: boolean;
  retryAfterSec: number;
}

/** Sliding-window limit. Returns ok=false once `max` hits occur inside `windowMs`. */
export function rateLimit(
  key: string,
  max: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  prune(now, windowMs, bucket);

  if (bucket.hits.length >= max) {
    const oldest = bucket.hits[0] ?? now;
    buckets.set(key, bucket);
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Opportunistic cleanup so the map cannot grow unbounded in long-lived
  // processes (dev servers).
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      prune(now, windowMs, b);
      if (b.hits.length === 0) buckets.delete(k);
    }
  }

  return { ok: true, retryAfterSec: 0 };
}

/** Best-effort client IP for rate-limit keys (trust nothing security-critical from it). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "local";
}
