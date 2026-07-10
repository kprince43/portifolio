export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  description: string;
  relatedProjects: string[];
}

export const levelLabels: Record<number, string> = {
  1: "Beginner", 2: "Familiar", 3: "Proficient", 4: "Advanced", 5: "Expert",
};

export const skillCategories: SkillCategory[] = ["Frontend", "Backend", "Database", "Tools"];

const ALL = ["Scheduler Tracking System", "E-Commerce Platform", "Personal Portfolio Website"];

export const skills: Skill[] = [
  { id: "html5",      name: "HTML5",        category: "Frontend",  level: 3, description: "Semantic, accessible markup as the foundation for every interface I build.", relatedProjects: ALL },
  { id: "css3",       name: "CSS3",         category: "Frontend",  level: 3, description: "Responsive layouts and styling, mostly through Tailwind but comfortable writing by hand.", relatedProjects: ALL },
  { id: "javascript", name: "JavaScript",   category: "Frontend",  level: 3, description: "The language behind almost everything I build, from UI logic to backend services.", relatedProjects: ALL },
  { id: "react",      name: "React",        category: "Frontend",  level: 3, description: "Component-driven UIs for the dashboards and platforms I've built.", relatedProjects: ALL },
  { id: "tailwind",   name: "Tailwind CSS", category: "Frontend",  level: 3, description: "My default for fast, consistent styling without leaving the markup.", relatedProjects: ALL },
  { id: "nodejs",     name: "Node.js",      category: "Backend",   level: 3, description: "Backend services and APIs — the runtime behind my full-stack projects.", relatedProjects: ["Scheduler Tracking System", "E-Commerce Platform"] },
  { id: "express",    name: "Express.js",   category: "Backend",   level: 3, description: "Structuring REST APIs and routing for the backend of my full-stack apps.", relatedProjects: ["Scheduler Tracking System"] },
  { id: "postgresql", name: "PostgreSQL",   category: "Database",  level: 3, description: "Relational schema design for projects that need structured, queryable data.", relatedProjects: ["Scheduler Tracking System", "E-Commerce Platform"] },
  { id: "git",        name: "Git",          category: "Tools",     level: 2, description: "Version control for every project I build.", relatedProjects: ["Used across all projects"] },
  { id: "github",     name: "GitHub",       category: "Tools",     level: 2, description: "Where my projects live — repos, issues, and version history.", relatedProjects: ["Used across all projects"] },
  { id: "vscode",     name: "VS Code",      category: "Tools",     level: 3, description: "My daily editor, set up for a fast React/Node workflow.", relatedProjects: ["Used across all projects"] },
];
