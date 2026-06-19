import type { SiteConfig } from "@/types";

/**
 * Single source of truth for site copy and structural data.
 * Update here once Phase 2+ content (projects, repos, configurator)
 * is wired in — components should never hardcode this data directly.
 */
export const siteConfig: SiteConfig = {
  name: "Your Name",
  role: "Creative Developer",
  tagline: "Building interfaces with precision and a little bit of motion.",
  url: "https://example.com",
  email: "hello@example.com",
  version: "v0.1.0",
  nav: [
    { index: "00", label: "Index", href: "/" },
    { index: "01", label: "Work", href: "/#work" },
    { index: "02", label: "About", href: "/#about" },
    { index: "03", label: "Contact", href: "/#contact" },
  ],
  socials: [
    { platform: "github", label: "GitHub", code: "GH", href: "https://github.com" },
    { platform: "linkedin", label: "LinkedIn", code: "IN", href: "https://linkedin.com" },
    { platform: "x", label: "X / Twitter", code: "X", href: "https://x.com" },
    { platform: "email", label: "Email", code: "@", href: "mailto:hello@example.com" },
  ],
};
