/**
 * A small in-memory, IP-based rate limiter. It resets when the serverless
 * instance restarts, which is fine as a light spam brake on a small site.
 */
const hits = new Map<string, number[]>();

export function rateLimit(ip: string, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(ip, recent);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep memory bounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (!times.some((t) => now - t < windowMs)) hits.delete(key);
  }
  return { ok: true, retryAfter: 0 };
}
