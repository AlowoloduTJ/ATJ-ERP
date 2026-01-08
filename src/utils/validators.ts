/**
 * Input validation utilities
 * Provides type-safe validation functions for user inputs
 */

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== "string" || email.length === 0) {
    return false;
  }
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates password strength
 * Minimum 8 characters, at least one letter and one number
 */
export function isValidPassword(password: string): boolean {
  if (typeof password !== "string") {
    return false;
  }
  if (password.length < 8) {
    return false;
  }
  // At least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
}

/**
 * Sanitizes string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") {
    return "";
  }
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 10000); // Limit length
}

/**
 * Validates that a value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validates login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export function validateLoginCredentials(
  data: unknown
): data is LoginCredentials {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;
  const email = obj.email;
  const password = obj.password;

  if (!isNonEmptyString(email) || !isValidEmail(email)) {
    return false;
  }

  if (!isNonEmptyString(password)) {
    return false;
  }

  return true;
}
