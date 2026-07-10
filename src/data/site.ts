import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Kwizera Prince",
  role: "Full-Stack Engineer",
  tagline: "I build modern web applications — from clean interfaces to powerful backends. Focused on performance, scalability, and real-world impact.",
  url: "https://example.com",
  email: "kwizeraprince4real@gmail.com",
  version: "v1.0.0",
  githubUsername: "kprince43",
  resumeUrl: "/resume.pdf",
  nav: [
    { index: "00", label: "Index", href: "/" },
    { index: "01", label: "Work",  href: "/#work" },
    { index: "02", label: "About", href: "/#about" },
    { index: "03", label: "Contact", href: "/#contact" },
  ],
  socials: [
    { platform: "github",    label: "GitHub",    href: "https://github.com/kprince43" },
    { platform: "linkedin",  label: "LinkedIn",  href: "https://www.linkedin.com/in/prince-kwizera-1b3a75405" },
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/kwizera_prince_" },
    { platform: "email",     label: "Email",     href: "mailto:kwizeraprince4real@gmail.com" },
  ],
};
