/**
 * Supabase Client-Side Client
 * 
 * This client is used in:
 * - Client Components ("use client")
 * - Browser environments
 * - Client-side hooks and utilities
 * 
 * This client uses the 2025 Clerk + Supabase native integration pattern:
 * - Passes Clerk's session token via accessToken() function
 * - Works with Clerk as third-party auth provider in Supabase
 * - No JWT templates needed (native integration handles this)
 * 
 * Security: Uses NEXT_PUBLIC_ variables (exposed to browser)
 * 
 * @see https://supabase.com/docs/reference/javascript/creating-a-client
 */

"use client";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import { useMemo } from "react";
import { config } from "@/utils/env";

// Supabase client configuration
const supabaseUrl = config.supabaseUrl;
const supabaseAnonKey = config.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

/**
 * Hook to create a Supabase client for use in client components
 * 
 * This client:
 * - Passes Clerk's session token to Supabase
 * - Works with Clerk as third-party auth provider
 * - Automatically handles authentication state
 * 
 * Usage in Client Components:
 * ```tsx
 * "use client"
 * import { useSupabaseClient } from "@/lib/supabase/client"
 * 
 * function MyComponent() {
 *   const supabase = useSupabaseClient()
 *   const { data } = await supabase.from('user_tasks').select()
 * }
 * ```
 */
export function useSupabaseClient() {
  const { session } = useSession();
  
  return useMemo(() => {
    return createSupabaseClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        accessToken: async () => (await session?.getToken()) ?? null,
      }
    );
  }, [session]);
}

/**
 * Legacy function for backward compatibility
 * Creates a client without Clerk token (for public data access)
 * @deprecated Use useSupabaseClient() hook instead for authenticated requests
 */
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
