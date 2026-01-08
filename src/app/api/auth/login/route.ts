import { NextRequest, NextResponse } from "next/server";
import { validateLoginCredentials, sanitizeString } from "@/utils/validators";

/**
 * Login API route handler
 * Validates input and handles authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Validate credentials structure and format
    if (!validateLoginCredentials(body)) {
      return NextResponse.json(
        { error: "Invalid email or password format" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const email = sanitizeString(body.email);
    const password = body.password; // Don't sanitize password (needed as-is for hashing)

    // TODO: Implement actual authentication logic
    // - Hash password using bcrypt or similar
    // - Query database for user
    // - Verify password hash
    // - Generate JWT token
    // - Return token and user data

    // For now, return a mock response (REMOVE IN PRODUCTION)
    if (email && password) {
      return NextResponse.json({
        token: "mock-jwt-token", // TODO: Generate real JWT
        user: {
          id: "1",
          email, // Use sanitized email
          name: "Admin User",
          role: "admin",
          permissions: ["*"],
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    // Log error for debugging (don't expose internal details to client)
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
