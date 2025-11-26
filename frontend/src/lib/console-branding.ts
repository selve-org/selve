/**
 * SELVE Console Branding
 * 
 * Displays ASCII art and branding in the browser console.
 * Only runs once per page load in production.
 */

const SELVE_ASCII = `
███████╗███████╗██╗░░░░░██╗░░░██╗███████╗
██╔════╝██╔════╝██║░░░░░██║░░░██║██╔════╝
███████╗█████╗░░██║░░░░░╚██╗░██╔╝█████╗░░
╚════██║██╔══╝░░██║░░░░░░╚████╔╝░██╔══╝░░
███████║███████╗███████╗░░╚██╔╝░░███████╗
╚══════╝╚══════╝╚══════╝░░░╚═╝░░░╚══════╝
`;

const SUBTITLE = "        ✨ Discover Your True Self ✨";
const TAGLINE = "\n   Self-Exploration • Learning • Validation • Evolution";
const URL = "\n                        https://selve.me";

// Track if we've already shown the branding
let hasShown = false;

export function showConsoleBranding(): void {
  // Only show once per session
  if (hasShown) return;
  if (typeof window === "undefined") return;
  
  hasShown = true;

  // Main ASCII art with gradient styling
  console.log(
    `%c${SELVE_ASCII}`,
    "color: #a855f7; font-family: monospace; font-size: 12px; font-weight: bold;"
  );

  // Subtitle with purple styling  
  console.log(
    `%c${SUBTITLE}`,
    "color: #c084fc; font-family: monospace; font-size: 14px; font-weight: bold;"
  );

  // Tagline
  console.log(
    `%c${TAGLINE}`,
    "color: #9ca3af; font-family: monospace; font-size: 11px;"
  );

  // URL
  console.log(
    `%c${URL}`,
    "color: #6b7280; font-family: monospace; font-size: 10px;"
  );

  // Spacer
  console.log("");
}
