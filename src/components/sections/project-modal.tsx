"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { ScreenshotPlaceholder } from "@/components/ui/screenshot-placeholder";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function Carousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const hasMultiple = images.length > 1;
  function go(dir: 1 | -1) { setDirection(dir); setIndex((i) => (i + dir + images.length) % images.length); }
  return (
    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-line/40">
      <AnimatePresence initial={false} mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: direction === 1 ? 60 : -60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction === 1 ? -60 : 60 }} transition={{ duration: 0.35, ease: EASE_OUT }} className="absolute inset-0">
          {images[index] ? <Image src={images[index]} alt={`${title} screenshot ${index + 1}`} fill className="object-cover" /> : <ScreenshotPlaceholder />}
        </motion.div>
      </AnimatePresence>
      {hasMultiple && (<>
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm border border-line-strong bg-paper/80 text-ink backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"><ChevronLeft size={16} /></button>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm border border-line-strong bg-paper/80 text-ink backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"><ChevronRight size={16} /></button>
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (<button key={i} type="button" aria-label={`Go to image ${i + 1}`} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }} className={cn("h-1.5 w-4 rounded-full border transition-colors", i === index ? "border-signal bg-signal" : "border-line-strong bg-paper/60")} />))}
        </div>
      </>)}
    </div>
  );
}

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", handler); };
  }, [project, onClose]);

  const images = project?.images?.length ? project.images : project?.image ? [project.image] : [];
  return (
    <AnimatePresence>
      {project && (
        <motion.div role="dialog" aria-modal="true" aria-label={`${project.title} details`} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <motion.div aria-hidden onClick={onClose} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
          <motion.div key={project.id} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.97 }} transition={{ duration: 0.35, ease: EASE_OUT }} className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-line-strong bg-paper shadow-2xl">
            <button type="button" onClick={onClose} aria-label="Close project details" className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-sm border border-line-strong bg-paper/80 text-ink backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"><X size={16} /></button>
            <div className="overflow-y-auto">
              <Carousel images={images} title={project.title} />
              <div className="p-6 md:p-8">
                <p className="text-mono-label text-signal">{project.category}</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">{project.title}</h2>
                <div className="mt-4 flex flex-wrap gap-1.5">{project.technologies.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
                {project.overview && <section className="mt-6"><p className="text-mono-label text-steel">OVERVIEW</p><p className="mt-2 text-sm leading-relaxed text-steel">{project.overview}</p></section>}
                {project.challenges && <section className="mt-6"><p className="text-mono-label text-steel">CHALLENGES</p><p className="mt-2 text-sm leading-relaxed text-steel">{project.challenges}</p></section>}
                {project.solutions && <section className="mt-6"><p className="text-mono-label text-steel">SOLUTIONS</p><p className="mt-2 text-sm leading-relaxed text-steel">{project.solutions}</p></section>}
                <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                  {project.githubHref && <a href={project.githubHref} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-steel transition-colors hover:text-signal"><FaGithub size={14} aria-hidden />Code</a>}
                  {project.liveHref && <a href={project.liveHref} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-signal">Live Demo<ArrowUpRight size={14} aria-hidden /></a>}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
