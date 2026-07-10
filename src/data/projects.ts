export type ProjectCategory = "Full-Stack" | "Frontend" | "Backend" | "Tools";

export interface ProjectMetric { label: string; value: string; }

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  githubHref?: string;
  liveHref?: string;
  image?: string;
  images?: string[];
  overview?: string;
  challenges?: string;
  solutions?: string;
  metrics?: ProjectMetric[];
}

export const projectCategories: ProjectCategory[] = ["Full-Stack", "Frontend", "Backend", "Tools"];

const github = "https://github.com/kprince43";

export const projects: Project[] = [
  {
    id: "scheduler-tracking-system",
    title: "Scheduler Tracking System",
    description: "A web application to help users manage schedules, track activities, and visualize progress through an interactive dashboard.",
    category: "Full-Stack",
    technologies: ["JavaScript", "React", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    githubHref: github,
    overview: "Built a centralized platform for tracking scheduled tasks and generating insights from user activity.",
    challenges: "Designing a database structure that could efficiently store and retrieve scheduling data at scale.",
    solutions: "Implemented a PostgreSQL database with optimized relationships and REST API endpoints for fast data access.",
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "An online shopping platform tailored for the Rwandan market, allowing users to browse products, manage carts, and place orders.",
    category: "Full-Stack",
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "JavaScript"],
    githubHref: github,
    overview: "Developed a scalable e-commerce solution with a responsive UI and robust backend services.",
    challenges: "Managing product inventory and user interactions efficiently under concurrent requests.",
    solutions: "Created a structured backend API and database design to support product management and order workflows.",
  },
  {
    id: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    description: "A responsive portfolio website showcasing projects, skills, and professional growth through modern web technologies.",
    category: "Frontend",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    githubHref: github,
    overview: "Designed and developed a personal brand website focused on user experience and performance.",
  },
];
