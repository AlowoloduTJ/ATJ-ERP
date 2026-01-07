import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Onboarding Layout (Server Component)
 * 
 * This layout:
 * - Checks if user is authenticated (redirects to /sign-in if not)
 * - Checks if onboarding is already complete (redirects to /dashboard if yes)
 * - Only allows access to onboarding page if user is authenticated but hasn't completed onboarding
 */
export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();

  // If not authenticated, redirect to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  // Check if onboarding is already complete
  // The custom claim maps user.public_metadata to metadata in the JWT
  const onboardingComplete = (
    sessionClaims?.metadata as { onboardingComplete?: boolean }
  )?.onboardingComplete;

  // If onboarding is complete, redirect to dashboard
  if (onboardingComplete) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
