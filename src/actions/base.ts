/**
 * Base Server Actions Utilities
 * Common error handling and validation utilities
 */

import { createServerClient } from "@/lib/supabase/server";

export type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Wraps a server action with error handling
 */
export async function withErrorHandling<T>(
  action: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await action();
    return { success: true, data };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Validates that a user is authenticated
 */
export async function requireAuth() {
  const supabase = await createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("Unauthorized: Please sign in");
  }
  
  return { user, supabase };
}

/**
 * Validates required fields
 */
export function validateRequired<T extends Record<string, unknown>>(
  data: T,
  fields: (keyof T)[]
): void {
  const missing = fields.filter((field) => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
}
