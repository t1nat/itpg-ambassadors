import { RATE_LIMIT } from "@/lib/config";
import { RateLimitError } from "@/lib/types";

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a similar distributed store
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Clean up expired entries periodically
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every minute
if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredEntries, 60000);
}

/**
 * Rate limiting options
 */
interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
  keyPrefix?: string;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the client (e.g., IP address)
 * @param options - Rate limiting options
 * @throws RateLimitError if rate limit is exceeded
 */
export function checkRateLimit(identifier: string, options: RateLimitOptions = {}): void {
  const { windowMs = RATE_LIMIT.windowMs, maxRequests = RATE_LIMIT.maxRequests, keyPrefix = "global" } = options;

  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // First request or window has expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return;
  }

  // Window is still active
  entry.count++;

  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    throw new RateLimitError(retryAfter);
  }
}

/**
 * Create a rate limiter with specific options
 */
export function createRateLimiter(options: RateLimitOptions = {}) {
  return (identifier: string) => checkRateLimit(identifier, options);
}

/**
 * Rate limiter for vote endpoints (stricter limits)
 */
export const voteRateLimiter = createRateLimiter({
  maxRequests: RATE_LIMIT.voteMaxRequests,
  keyPrefix: "vote",
});

/**
 * Get remaining requests for an identifier
 */
export function getRateLimitInfo(identifier: string, options: RateLimitOptions = {}): { remaining: number; resetTime: number } | null {
  const { keyPrefix = "global", maxRequests = RATE_LIMIT.maxRequests } = options;
  const key = `${keyPrefix}:${identifier}`;
  const entry = rateLimitStore.get(key);

  if (!entry || Date.now() > entry.resetTime) {
    return null; // No limit info available
  }

  return {
    remaining: Math.max(0, maxRequests - entry.count),
    resetTime: entry.resetTime,
  };
}
