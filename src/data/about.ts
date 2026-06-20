/**
 * Placeholder content for the About section. Replace every value here
 * with your real story, goals, education, and milestones — none of this
 * should ship as-is.
 */

export const personalStory = {
  paragraphs: [
    "Replace this with how you got started in programming — the moment, the curiosity, or the problem that pulled you in.",
    "Add a second paragraph about what you've built or learned since then, and the kind of work that energizes you now.",
  ],
};

export const careerObjectives: string[] = [
  "Add a short-term goal you're currently working toward.",
  "Add a medium-term goal — a skill, role, or domain you want to grow into.",
  "Add a long-term ambition for where you want your career to go.",
];

export const education = {
  school: "University Name",
  degree: "Degree / Field of Study",
  period: "0000 — 0000",
  description: "Add a short note about your focus, thesis, or relevant coursework.",
};

export interface TimelineMilestone {
  id: string;
  period: string;
  title: string;
  description: string;
}

export const timeline: TimelineMilestone[] = [
  {
    id: "started",
    period: "Add Year",
    title: "Started Programming",
    description: "Add what got you started — a language, a course, a curiosity.",
  },
  {
    id: "first-project",
    period: "Add Year",
    title: "First Project",
    description: "Add a short description of the first thing you built.",
  },
  {
    id: "university",
    period: "Add Years",
    title: "University Journey",
    description: "Add a note about your degree path and key milestones along the way.",
  },
  {
    id: "current",
    period: "Now",
    title: "Current Focus",
    description: "Add what you're focused on building or learning right now.",
  },
  {
    id: "future",
    period: "Next",
    title: "Future Goals",
    description: "Add where you want to take your skills and career next.",
  },
];
