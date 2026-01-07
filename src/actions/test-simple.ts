/**
 * Simple test action without Supabase to verify server actions work
 */

"use server";

export async function testSimple(): Promise<{ success: boolean; message: string }> {
  try {
    return {
      success: true,
      message: "Server actions are working!",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
