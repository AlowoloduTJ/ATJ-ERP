import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing environment variables",
          details: {
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseAnonKey,
            url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "missing",
          },
        },
        { status: 500 }
      );
    }

    // Try to create Supabase client
    let supabase;
    try {
      supabase = await createServerClient();
    } catch (clientError) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create Supabase client",
          details: clientError instanceof Error ? clientError.message : String(clientError),
        },
        { status: 500 }
      );
    }

    // Try a simple query
    const { data, error } = await supabase
      .from("suppliers")
      .select("count")
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Database query failed",
          details: {
            message: error.message,
            code: error.code,
            hint: error.hint,
            isTableMissing: error.message.includes("does not exist"),
            isAuthError: error.message.includes("JWT") || error.message.includes("auth"),
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Connection successful!",
      data: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
