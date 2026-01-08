/**
 * Supabase Client for Middleware
 * 
 * This client is used in Next.js middleware for:
 * - Authentication checks
 * - Session refresh
 * - Route protection
 * 
 * @see https://supabase.com/docs/guides/auth/auth-helpers/nextjs#middleware
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/utils/env";

const supabaseUrl = config.supabaseUrl;
const supabaseAnonKey = config.supabaseAnonKey;

/**
 * Creates a Supabase client for use in Next.js middleware
 * 
 * Usage in middleware.ts:
 * ```tsx
 * import { createMiddlewareClient } from "@/lib/supabase/middleware"
 * 
 * export async function middleware(request: NextRequest) {
 *   const supabase = createMiddlewareClient(request)
 *   const { data: { session } } = await supabase.auth.getSession()
 *   // ... your logic
 * }
 * ```
 */
export function createMiddlewareClient(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  return { supabase, response };
}
