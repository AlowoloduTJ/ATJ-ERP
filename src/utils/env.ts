/**
 * Environment variable validation and access
 * Ensures all required environment variables are present and valid
 */

/**
 * Validates and retrieves environment variables
 */
class EnvValidator {
  private readonly requiredVars: string[] = [];
  private readonly optionalVars: Record<string, string> = {};

  /**
   * Get a required environment variable
   */
  getRequired(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
  }

  /**
   * Get an optional environment variable with default
   */
  getOptional(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }

  /**
   * Get a public (client-side accessible) environment variable
   */
  getPublic(key: string, defaultValue: string): string {
    const fullKey = `NEXT_PUBLIC_${key}`;
    return process.env[fullKey] || defaultValue;
  }
}

export const env = new EnvValidator();

/**
 * Validated environment variables
 * Access these instead of process.env directly
 */
export const config = {
  // API Configuration
  apiUrl: env.getPublic("API_URL", "/api"),

  // Supabase Configuration
  // Public (client-side accessible) - Safe to expose
  supabaseUrl: env.getPublic("SUPABASE_URL", ""),
  supabaseAnonKey: env.getPublic("SUPABASE_ANON_KEY", ""),

  // Server-only (not exposed to browser) - Keep secret!
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",

  // Add other environment variables here as needed
  // Example:
  // databaseUrl: env.getRequired("DATABASE_URL"),
  // jwtSecret: env.getRequired("JWT_SECRET"),
} as const;
