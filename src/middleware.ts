import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Define protected routes that require authentication
 * These routes will redirect unauthenticated users to /sign-in
 */
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/warehouse(.*)",
  "/production(.*)",
  "/ledger(.*)",
  "/hr(.*)",
  "/audit(.*)",
  "/admin(.*)",
]);

/**
 * Define onboarding route
 * This route is accessible to authenticated users who haven't completed onboarding
 */
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

/**
 * Clerk Middleware
 * 
 * This middleware:
 * - Checks if user is authenticated for protected routes
 * - Redirects unauthenticated users to /sign-in with redirect_url parameter
 * - Checks onboarding status for authenticated users
 * - Redirects authenticated users without completed onboarding to /onboarding
 * - Allows authenticated users to access protected routes after onboarding
 * - Allows public routes (/, /sign-in, /sign-up) to be accessed without authentication
 */
export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // If user is not authenticated and trying to access a protected route
  if (!userId && isProtectedRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // If user is authenticated, check onboarding status
  if (userId) {
    // Extract onboarding status from session claims
    // The custom claim maps user.public_metadata to metadata in the JWT
    const onboardingComplete = (
      sessionClaims?.metadata as { onboardingComplete?: boolean }
    )?.onboardingComplete;

    // If user hasn't completed onboarding and is trying to access a protected route
    // (but not the onboarding page itself), redirect to onboarding
    if (
      !onboardingComplete &&
      isProtectedRoute(req) &&
      !isOnboardingRoute(req)
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  return NextResponse.next();
});

/**
 * Middleware configuration
 * 
 * Matches all routes except:
 * - Next.js internals (_next)
 * - Static files (images, fonts, etc.)
 * - Always runs for API routes
 */
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
