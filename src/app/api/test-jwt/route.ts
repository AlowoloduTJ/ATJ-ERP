import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Ensure this route is dynamic to prevent build-time execution errors
export const dynamic = 'force-dynamic';

/**
 * Test endpoint to verify JWT template configuration
 * 
 * This endpoint allows you to inspect the JWT token structure
 * to ensure the 'supabase' template is configured correctly.
 * 
 * Usage:
 * 1. Sign in to your application
 * 2. Visit: /api/test-jwt
 * 3. Review the token structure
 */
export async function GET() {
  try {
    const { userId, getToken } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Request token with 'supabase' template
    const token = await getToken({ template: 'supabase' });

    if (!token) {
      return NextResponse.json(
        {
          error: "No token generated",
          message: "Make sure the 'supabase' JWT template exists in Clerk Dashboard",
          userId,
        },
        { status: 500 }
      );
    }

    // Decode token to inspect claims (for testing only)
    // In production, you should verify the token signature
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      const payload = JSON.parse(
        Buffer.from(parts[1], 'base64url').toString('utf-8')
      );

      return NextResponse.json({
        success: true,
        message: "JWT template is working correctly",
        userId,
        tokenPreview: {
          sub: payload.sub,
          email: payload.email,
          role: payload.role,
          aud: payload.aud,
          iat: payload.iat ? new Date(payload.iat * 1000).toISOString() : null,
          exp: payload.exp ? new Date(payload.exp * 1000).toISOString() : null,
          metadata: payload.metadata,
        },
        fullPayload: payload, // For debugging - remove in production
      });
    } catch (decodeError) {
      return NextResponse.json(
        {
          error: "Failed to decode token",
          message: decodeError instanceof Error ? decodeError.message : String(decodeError),
          tokenLength: token.length,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("JWT test error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
