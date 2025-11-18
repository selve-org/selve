import { customAlphabet } from 'nanoid';

/**
 * Generate a secure invite code using NanoID
 * 
 * Uses 28 characters from a URL-safe alphabet (A-Za-z0-9_-)
 * This provides ~10^49 possible combinations, making brute-force attacks
 * computationally infeasible.
 * 
 * @returns A 28-character invite code (e.g., "kX9mZ_4pQ2rT8vN3jH6sL1wY5bC0")
 */
export function generateInviteCode(): string {
  // URL-safe alphabet (no special chars that need URL encoding)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  const nanoid = customAlphabet(alphabet, 28);
  
  return nanoid();
}

/**
 * Validate invite code format
 * Must be exactly 28 characters from the allowed alphabet
 */
export function isValidInviteCode(code: string): boolean {
  if (code.length !== 28) return false;
  
  const validChars = /^[A-Za-z0-9_-]+$/;
  return validChars.test(code);
}
