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

import { createServerClient } from "@supabase/ssr";
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
 * This client:
 * - Reads cookies to get user session
 * - Automatically handles authentication
 * - Works with Next.js App Router server components
 * 
 * Usage in Server Components:
 * ```tsx
 * import { createServerClient } from "@/lib/supabase/server"
 * 
 * const supabase = createServerClient()
 * const { data } = await supabase.from('users').select()
 * ```
 * 
 * Usage in API Routes:
 * ```tsx
 * import { createServerClient } from "@/lib/supabase/server"
 * 
 * export async function GET() {
 *   const supabase = createServerClient()
 *   const { data } = await supabase.from('users').select()
 *   return Response.json(data)
 * }
 * ```
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
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
