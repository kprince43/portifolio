"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { FilterPill } from "@/components/ui/filter-pill";
import { ScreenshotPlaceholder } from "@/components/ui/screenshot-placeholder";
import { ProjectModal } from "@/components/sections/project-modal";
import { projects, projectCategories, type Project, type ProjectCategory } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: EASE }} className="group flex flex-col overflow-hidden rounded-sm border border-line-strong bg-paper/70 backdrop-blur-md transition-shadow hover:border-signal/50 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]">
      <button type="button" onClick={onOpen} aria-label={`View details for ${project.title}`} className="relative aspect-video w-full overflow-hidden border-b border-line-strong text-left">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
          {project.image ? <Image src={project.image} alt={project.title} fill className="object-cover" /> : <ScreenshotPlaceholder />}
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
          <span className="text-mono-label rounded-sm border border-paper/40 bg-paper/10 px-3 py-1.5 text-paper backdrop-blur-sm">VIEW DETAILS</span>
        </div>
        <span className="text-mono-label absolute right-3 top-3 rounded-sm border border-line-strong bg-paper/80 px-2 py-1 text-steel backdrop-blur-sm">{project.category}</span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-steel">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map(tech => <Badge key={tech}>{tech}</Badge>)}
        </div>
        <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
          {project.githubHref && <a href={project.githubHref} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-steel transition-colors hover:text-signal"><FaGithub size={14} aria-hidden />Code</a>}
          {project.liveHref && <a href={project.liveHref} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-signal">Live Demo<ArrowUpRight size={14} aria-hidden /></a>}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(p => {
      const cat = activeCategory === "All" || p.category === activeCategory;
      const search = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q));
      return cat && search;
    });
  }, [activeCategory, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterPill label="All" active={activeCategory === "All"} onClick={() => setActiveCategory("All")} />
          {projectCategories.map(cat => <FilterPill key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />)}
        </div>
        <div className="relative w-full md:w-64">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects…" className="w-full rounded-sm border border-line-strong bg-paper/50 py-2 pl-9 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-steel focus:border-signal" />
        </div>
      </div>
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map(p => <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />)}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <p className="text-mono-label mt-10 text-center text-steel">NO PROJECTS MATCH THAT SEARCH</p>}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
