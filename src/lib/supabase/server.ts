/**
 * Supabase Server-Side Client
 * 
 * This client is used in:
 * - Server Components
 * - API Routes (Route Handlers)
 * - Server Actions
 * - Middleware
 * 
 * Security: Uses server-only environment variables (not exposed to browser)
 * 
 * @see https://supabase.com/docs/guides/auth/server-side/creating-a-client
 */

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { config } from "@/utils/env";

// Supabase server configuration
const supabaseUrl = config.supabaseUrl;
const supabaseAnonKey = config.supabaseAnonKey;
const supabaseServiceRoleKey = config.supabaseServiceRoleKey; // Optional, for admin operations

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY"
  );
}

/**
 * Creates a Supabase client for use in Server Components and API Routes
 * 
 * This client uses the 2025 Clerk + Supabase native integration pattern:
 * - Passes Clerk's session token via accessToken() function
 * - Works with Clerk as third-party auth provider in Supabase
 * - No JWT templates needed (native integration handles this)
 * 
 * Usage in Server Components:
 * ```tsx
 * import { createSupabaseClient } from "@/lib/supabase/server"
 * 
 * const supabase = await createSupabaseClient()
 * const { data } = await supabase.from('user_tasks').select()
 * ```
 * 
 * Usage in API Routes:
 * ```tsx
 * import { createSupabaseClient } from "@/lib/supabase/server"
 * 
 * export async function GET() {
 *   const supabase = await createSupabaseClient()
 *   const { data } = await supabase.from('user_tasks').select()
 *   return Response.json(data)
 * }
 * ```
 */
export async function createSupabaseClient() {
  const { getToken } = await auth();
  const clerkToken = await getToken();
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: async (url, options = {}) => {
        const token = clerkToken || await getToken();
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
      },
    },
  });
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use createSupabaseClient() instead
 */
export async function createServerClient() {
  return createSupabaseClient();
}

/**
 * Creates an admin Supabase client with service role key
 * 
 * ⚠️ SECURITY WARNING: This client bypasses Row Level Security (RLS)
 * Only use for:
 * - Admin operations
 * - Server-side operations that need full access
 * - Background jobs
 * 
 * NEVER expose this client to the client-side!
 * 
 * Usage:
 * ```tsx
 * import { createAdminClient } from "@/lib/supabase/server"
 * 
 * const supabase = createAdminClient()
 * // This client has full access, bypasses RLS
 * ```
 */
export function createAdminClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for admin client. This should only be used server-side."
    );
  }

  // Dynamic import to avoid bundling in client
  // Note: This requires @supabase/supabase-js to be installed
  try {
    const { createClient } = require("@supabase/supabase-js");
    
    return createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (error) {
    throw new Error(
      "@supabase/supabase-js is not installed. Run: npm install @supabase/supabase-js @supabase/ssr"
    );
  }
}
