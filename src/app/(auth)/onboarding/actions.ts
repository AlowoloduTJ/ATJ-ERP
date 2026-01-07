"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

/**
 * Server Action: Complete Onboarding
 * 
 * Updates the user's publicMetadata to mark onboarding as complete.
 * This is a server action for security (API keys stay server-side).
 * 
 * @returns { success: true } on success
 * @returns { error: string } on failure
 */
export async function completeOnboarding(): Promise<
  { success: true } | { error: string }
> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "User not authenticated" };
    }

    // Update user's publicMetadata to mark onboarding as complete
    await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to complete onboarding",
    };
  }
}
