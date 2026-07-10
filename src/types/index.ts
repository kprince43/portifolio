export type SocialPlatform = "github" | "linkedin" | "instagram" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface NavLink {
  index: string;
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  url: string;
  email: string;
  version: string;
  githubUsername: string;
  resumeUrl: string;
  nav: NavLink[];
  socials: SocialLink[];
}
