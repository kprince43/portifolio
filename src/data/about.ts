export const personalStory = {
  paragraphs: [
    "I am Kwizera Prince, a Software Engineering student at Adventist University of Central Africa (AUCA) with a strong interest in backend development and full-stack web applications. I enjoy building practical software solutions that solve real-world problems.",
    "My experience includes developing web applications using React, Node.js, PostgreSQL, and Tailwind CSS. I am passionate about learning new technologies, collaborating with others, and creating reliable software systems.",
  ],
};

export const careerObjectives: string[] = [
  "Gain practical experience by building production-quality full-stack applications and contributing to real-world projects.",
  "Work as a full-stack or backend software developer, building scalable systems and modern web applications.",
  "Become a highly skilled software engineer and contribute to impactful technology solutions while mentoring other aspiring developers.",
];

export const education = {
  school: "Adventist University of Central Africa (AUCA)",
  degree: "Software Engineering",
  period: "2025 — Present",
  description: "Focused on full-stack development, with particular interest in backend systems and scalable architecture.",
};

export interface TimelineMilestone {
  id: string;
  period: string;
  title: string;
  description: string;
}

export const timeline: TimelineMilestone[] = [
  { id: "started",      period: "2024",          title: "Started Programming",   description: "Began learning programming and exploring web development fundamentals." },
  { id: "first-project",period: "2024",          title: "First Project",          description: "Built my first web development projects using HTML, CSS, and JavaScript." },
  { id: "university",   period: "2025 — Present", title: "University Journey",    description: "Studying Software Engineering at AUCA, deepening full-stack skills." },
  { id: "current",      period: "Now",            title: "Current Focus",          description: "Full-stack development with React, Node.js, and PostgreSQL." },
  { id: "future",       period: "Next",           title: "Future Goal",            description: "Professional software engineer specializing in backend and scalable systems." },
];
