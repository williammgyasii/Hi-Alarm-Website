import { NextRequest, NextResponse } from "next/server";
import { validateWaitlistInput } from "@/lib/validators";
import { checkRateLimit, getClientIP } from "@/lib/rateLimit";
import { addToWaitlist, isDevMode } from "@/lib/firebaseAdmin";

/**
 * POST /api/waitlist
 * Add a new entry to the waitlist
 */
export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const clientIP = getClientIP(request);
  
  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIP);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { 
        ok: false, 
        message: "Too many requests. Please try again in a minute." 
      },
      { 
        status: 429,
        headers: {
          "Retry-After": Math.ceil(rateLimitResult.resetInMs / 1000).toString(),
        },
      }
    );
  }

  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate input
  const validation = validateWaitlistInput(body);
  if (!validation.success || !validation.data) {
    return NextResponse.json(
      { ok: false, message: validation.error || "Invalid input." },
      { status: 400 }
    );
  }

  // Check honeypot (double-check on server)
  if (validation.data.company) {
    // Return success to not give feedback to bots
    return NextResponse.json({ ok: true });
  }

  // Get user agent for analytics
  const userAgent = request.headers.get("user-agent") || undefined;

  // Add to waitlist
  const result = await addToWaitlist({
    email: validation.data.email,
    name: validation.data.name,
    userAgent,
  });

  // Log in dev mode
  if (isDevMode()) {
    console.log(`[DEV MODE] Waitlist API called - Email: ${validation.data.email}`);
  }

  // Return response
  if (result.ok) {
    return NextResponse.json({ ok: true });
  } else {
    // Check if it's a duplicate error
    if (result.message?.includes("already on the waitlist")) {
      return NextResponse.json(
        { ok: false, message: result.message },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { ok: false, message: result.message || "Something went wrong." },
      { status: 500 }
    );
  }
}

/**
 * Handle other methods
 */
export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed." },
    { status: 405 }
  );
}
