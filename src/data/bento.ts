/**
 * Placeholder content for the bento grid. Everything here is example
 * copy — replace with real bio, skills, history, and project details.
 * GitHub stats are static placeholders until the GitHub-integration
 * phase wires up live data.
 */

export const aboutMe = {
  heading: "A bit about me",
  body: "I'm a full-stack engineer who likes building things end to end — from interface details down to the systems underneath. Currently focused on TypeScript, React/Next.js, and Node.",
};

export const skills: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "REST APIs",
  "Docker",
];

export const techStack: string[] = ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Tailwind", "Git"];

export const experience: { role: string; org: string; period: string }[] = [
  { role: "Software Engineer", org: "Company Name", period: "2024 — Present" },
  { role: "Junior Developer", org: "Previous Company", period: "2022 — 2024" },
];

export const certifications: { name: string; issuer: string; year: string }[] = [
  { name: "Certification Name", issuer: "Issuing Body", year: "2024" },
  { name: "Certification Name", issuer: "Issuing Body", year: "2023" },
];

export const githubStats = {
  repos: 24,
  contributions: 412,
  streak: 18,
  // a short note shown on the card so the placeholder numbers read as
  // intentional rather than as fabricated live data
  note: "Live sync arrives in the GitHub integration phase",
};

export const featuredProject = {
  title: "Project Name",
  description: "A short, punchy description of the project — what it does and the problem it solves.",
  tags: ["Next.js", "TypeScript", "PostgreSQL"],
  liveHref: "#",
  repoHref: "https://github.com/kprince43",
};
