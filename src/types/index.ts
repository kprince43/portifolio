/**
 * Shared types for site-wide structural data.
 * Keep this file the single source of truth for shapes used by
 * navigation, footer, and (in later phases) project / repo data.
 */

export interface NavLink {
  /** Mono index shown next to the label, e.g. "00", "01" — purely visual. */
  index: string;
  label: string;
  href: string;
}

export type SocialPlatform = "github" | "linkedin" | "x" | "email" | "dribbble";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Short mono code rendered in the footer "jack", e.g. "GH", "IN". */
  code: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  url: string;
  email: string;
  version: string;
  resumeUrl: string;
  nav: NavLink[];
  socials: SocialLink[];
}

export type Theme = "light" | "dark" | "system";
