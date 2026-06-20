/**
 * Skill content for the Skills Visualization section.
 * Levels (1-5) and descriptions are starter content — adjust the levels
 * to reflect your real proficiency, and personalize the descriptions
 * with your own experience. "Related projects" tagged "Add a project
 * name" are explicit placeholders; "This Portfolio" is left in wherever
 * it's actually true (this site is built with that tech).
 */

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  /** 1-5, placeholder — adjust to reflect your real proficiency. */
  level: number;
  description: string;
  relatedProjects: string[];
}

export const levelLabels: Record<number, string> = {
  1: "Beginner",
  2: "Familiar",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

export const skillCategories: SkillCategory[] = ["Frontend", "Backend", "Database", "Tools"];

export const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 4,
    description: "Used for building accessible, component-driven interfaces.",
    relatedProjects: ["This Portfolio", "Add another project"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    level: 4,
    description: "App Router, server components, and edge-ready routing for production apps.",
    relatedProjects: ["This Portfolio", "Add another project"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    level: 4,
    description: "Typed everything by default — fewer runtime surprises, easier refactors.",
    relatedProjects: ["This Portfolio", "Add another project"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: 4,
    description: "Utility-first styling for fast, consistent UI without fighting a stylesheet.",
    relatedProjects: ["This Portfolio", "Add another project"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    level: 3,
    description: "Add a sentence about how you use Node in your backend work.",
    relatedProjects: ["Add a project name"],
  },
  {
    id: "express",
    name: "Express",
    category: "Backend",
    level: 3,
    description: "Add a sentence about the kind of APIs you've built with Express.",
    relatedProjects: ["Add a project name"],
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "Backend",
    level: 3,
    description: "Add a sentence about how you design and document your APIs.",
    relatedProjects: ["Add a project name"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    level: 3,
    description: "Add a sentence about your experience with relational schema design.",
    relatedProjects: ["Add a project name"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    level: 2,
    description: "Add a sentence about when you reach for a document store over SQL.",
    relatedProjects: ["Add a project name"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Tools",
    level: 3,
    description: "Add a sentence about how you containerize and ship your projects.",
    relatedProjects: ["Add a project name"],
  },
  {
    id: "git",
    name: "Git",
    category: "Tools",
    level: 4,
    description: "Branching, rebasing, and PR workflows for working with a team or solo.",
    relatedProjects: ["This Portfolio", "Add another project"],
  },
  {
    id: "ci-cd",
    name: "CI/CD",
    category: "Tools",
    level: 2,
    description: "Add a sentence about your experience automating builds and deploys.",
    relatedProjects: ["Add a project name"],
  },
];
