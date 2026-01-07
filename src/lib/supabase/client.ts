/**
 * Supabase Client-Side Client
 * 
 * This client is used in:
 * - Client Components ("use client")
 * - Browser environments
 * - Client-side hooks and utilities
 * 
 * Security: Uses NEXT_PUBLIC_ variables (exposed to browser)
 * 
 * @see https://supabase.com/docs/reference/javascript/creating-a-client
 */

import { createBrowserClient } from "@supabase/ssr";
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
 * Creates a Supabase client for use in client components
 * 
 * This client:
 * - Automatically handles authentication state
 * - Manages cookies for session persistence
 * - Works with Next.js App Router
 * 
 * Usage in Client Components:
 * ```tsx
 * "use client"
 * import { createClient } from "@/lib/supabase/client"
 * 
 * const supabase = createClient()
 * const { data } = await supabase.from('users').select()
 * ```
 */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
