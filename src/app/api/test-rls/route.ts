/**
 * Test RLS API Route
 * 
 * This route demonstrates how to use the Supabase client with Clerk authentication
 * to test Row Level Security (RLS) policies.
 * 
 * Endpoints:
 * - GET /api/test-rls - List all tasks for the current user
 * - POST /api/test-rls - Create a new task for the current user
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = await createSupabaseClient();

    // Fetch tasks for the current user
    // RLS policy ensures only the user's own tasks are returned
    const { data, error } = await supabase
      .from("user_tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      userId,
      tasks: data || [],
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, status } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseClient();

    // Insert a new task
    // The user_id will be automatically set from auth.jwt()->>'sub'
    // RLS policy ensures the user_id matches the current user
    const { data, error } = await supabase
      .from("user_tasks")
      .insert({
        name,
        description: description || null,
        status: status || "pending",
        // user_id is automatically set by the DEFAULT (auth.jwt()->>'sub')
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      userId,
      task: data,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
