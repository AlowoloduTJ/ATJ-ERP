/**
 * Test Server Actions
 * Simple actions for testing database connection without authentication
 * 
 * ⚠️ These are for testing only - remove or secure in production
 */

"use server";

import { createServerClient } from "@/lib/supabase/server";
import { withErrorHandling, type ActionResult } from "./base";

/**
 * Test database connection (no auth required)
 */
export async function testConnection(): Promise<ActionResult<{ connected: boolean; message: string }>> {
  return withErrorHandling(async () => {
    // Check environment variables first
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        connected: false,
        message: `Missing Supabase environment variables. URL: ${!!supabaseUrl}, Key: ${!!supabaseAnonKey}`,
      };
    }

    try {
      const supabase = await createServerClient();
      
      // Try a simple query to test connection
      const { data, error } = await supabase
        .from("suppliers")
        .select("count")
        .limit(1);

      if (error) {
        // Check if it's an auth error or connection error
        if (error.message.includes("JWT") || error.message.includes("auth")) {
          return {
            connected: true,
            message: "Database connected but authentication required. This is normal if RLS is enabled.",
          };
        }
        
        // Check if table doesn't exist
        if (error.message.includes("does not exist") || error.code === "42P01") {
          return {
            connected: false,
            message: "Table 'suppliers' does not exist. Please apply your database schema in Supabase SQL Editor.",
          };
        }
        
        throw new Error(`Database error: ${error.message} (Code: ${error.code || "unknown"})`);
      }

      return {
        connected: true,
        message: "Database connection successful!",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      console.error("testConnection error:", { message, stack });
      
      return {
        connected: false,
        message: `Connection failed: ${message}`,
      };
    }
  });
}

/**
 * Test create supplier (no auth required for testing)
 * ⚠️ Remove auth check for initial testing only
 */
export async function testCreateSupplier(
  input: { name: string; contact_person?: string; email?: string }
): Promise<ActionResult<{ id: string }>> {
  return withErrorHandling(async () => {
    if (!input.name) {
      throw new Error("Name is required");
    }

    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("suppliers")
      .insert({
        name: input.name,
        contact_person: input.contact_person || null,
        email: input.email || null,
      })
      .select("id")
      .single();

    if (error) {
      // Provide helpful error messages
      if (error.message.includes("JWT") || error.message.includes("auth")) {
        throw new Error("Authentication required. Please sign in or disable RLS for testing.");
      }
      if (error.message.includes("does not exist")) {
        throw new Error("Table 'suppliers' does not exist. Please apply your database schema.");
      }
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data) {
      throw new Error("Failed to create supplier: No data returned");
    }

    return { id: data.id };
  });
}

/**
 * Test list suppliers (no auth required for testing)
 */
export async function testListSuppliers(): Promise<ActionResult<any[]>> {
  return withErrorHandling(async () => {
    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      if (error.message.includes("JWT") || error.message.includes("auth")) {
        throw new Error("Authentication required. Please sign in or disable RLS for testing.");
      }
      if (error.message.includes("does not exist")) {
        throw new Error("Table 'suppliers' does not exist. Please apply your database schema.");
      }
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  });
}
