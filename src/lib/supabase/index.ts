/**
 * Supabase Client Exports
 * 
 * Centralized exports for all Supabase clients
 * 
 * @see https://supabase.com/docs/reference/javascript/introduction
 */

// Client-side client (for "use client" components)
export { useSupabaseClient, createBrowserClient } from "./client";

// Server-side client (for Server Components and API Routes)
export { createServerClient, createAdminClient } from "./server";

// Middleware client (for Next.js middleware)
export { createMiddlewareClient } from "./middleware";
