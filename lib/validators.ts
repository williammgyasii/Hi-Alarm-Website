import { z } from "zod";

/**
 * Waitlist submission validation schema
 */
export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  name: z
    .string()
    .max(100, "Name is too long")
    .optional()
    .transform((val) => val?.trim() || undefined),
  // Honeypot field - should always be empty
  company: z
    .string()
    .max(0, "Invalid submission")
    .optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

/**
 * Validate waitlist input and return result
 */
export function validateWaitlistInput(data: unknown): {
  success: boolean;
  data?: WaitlistInput;
  error?: string;
} {
  const result = waitlistSchema.safeParse(data);
  
  if (!result.success) {
    const firstError = result.error.issues[0];
    return {
      success: false,
      error: firstError?.message || "Invalid input",
    };
  }
  
  // Check honeypot - if company field has any value, it's likely a bot
  if (result.data.company && result.data.company.length > 0) {
    return {
      success: false,
      error: "Invalid submission",
    };
  }
  
  return {
    success: true,
    data: result.data,
  };
}
