import type { SiteConfig } from "@/types";

/**
 * Single source of truth for site copy and structural data.
 * Update here once Phase 2+ content (projects, repos, configurator)
 * is wired in — components should never hardcode this data directly.
 */
export const siteConfig: SiteConfig = {
  name: "Kwizera Prince",
  role: "Full-Stack Engineer",
  tagline: "Building interfaces with precision and a little bit of motion.",
  url: "https://example.com",
  email: "kwizeraprince4real@gmail.com",
  version: "v0.2.0",
  // Drop your actual PDF into /public/resume.pdf — this link points there.
  resumeUrl: "/resume.pdf",
  nav: [
    { index: "00", label: "Index", href: "/" },
    { index: "01", label: "Work", href: "/#work" },
    { index: "02", label: "About", href: "/#about" },
    { index: "03", label: "Contact", href: "/#contact" },
  ],
  socials: [
    { platform: "github", label: "GitHub", code: "GH", href: "https://github.com/kprince43" },
    {
      platform: "linkedin",
      label: "LinkedIn",
      code: "IN",
      href: "https://www.linkedin.com/in/prince-kwizera-1b3a75405",
    },
    { platform: "email", label: "Email", code: "@", href: "mailto:kwizeraprince4real@gmail.com" },
  ],
};
