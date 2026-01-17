/**
 * Simple in-memory rate limiter
 * Best-effort IP-based rate limiting for spam protection
 * 
 * Note: This is a basic implementation. For production at scale,
 * consider using Redis or a dedicated rate limiting service.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limit data
const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP

// Clean up old entries periodically to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

let cleanupTimer: NodeJS.Timeout | null = null;

function startCleanup() {
  if (cleanupTimer) return;
  
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);
  
  // Don't keep the process alive just for cleanup
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }
}

/**
 * Check if a request should be rate limited
 * @param identifier - Usually the IP address
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
} {
  startCleanup();
  
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  // No existing entry or expired entry
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetInMs: RATE_LIMIT_WINDOW_MS,
    };
  }
  
  // Check if limit exceeded
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: entry.resetTime - now,
    };
  }
  
  // Increment count
  entry.count += 1;
  
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetInMs: entry.resetTime - now,
  };
}

/**
 * Get the client IP address from request headers
 * Handles various proxy scenarios
 */
export function getClientIP(request: Request): string {
  // Try various headers that proxies might set
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }
  
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }
  
  // Fallback - in development this might be localhost
  return "127.0.0.1";
}
