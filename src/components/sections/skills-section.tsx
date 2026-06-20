"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { skills, skillCategories, levelLabels, type Skill, type SkillCategory } from "@/data/skills";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Discrete calibration ticks, not a continuous bar — filled count = level. */
function LevelTicks({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Level ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn("h-3 w-1 rounded-[1px]", i < level ? "bg-signal" : "bg-line-strong")}
        />
      ))}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "text-mono-label rounded-sm border px-3 py-1.5 transition-colors",
        active
          ? "border-signal bg-signal text-paper"
          : "border-line-strong text-steel hover:border-signal hover:text-signal"
      )}
    >
      {label}
    </button>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} — press for details`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
      }}
      className="relative h-56 cursor-pointer outline-none [perspective:1200px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-sm border border-line-strong bg-paper/70 p-5 backdrop-blur-md [backface-visibility:hidden]">
          <div>
            <p className="text-mono-label text-steel">{skill.category}</p>
            <p className="mt-2 font-display text-lg font-bold text-ink">{skill.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <LevelTicks level={skill.level} />
            <span className="text-mono-label text-steel">{levelLabels[skill.level]}</span>
          </div>
        </div>

        {/* back */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-sm border border-signal/50 bg-paper/90 p-5 backdrop-blur-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <p className="text-mono-label text-signal">{skill.name}</p>
            <p className="mt-2 text-sm text-steel">{skill.description}</p>
          </div>
          <div>
            <p className="text-mono-label mb-2 text-steel">RELATED</p>
            <div className="flex flex-wrap gap-1.5">
              {skill.relatedProjects.map((project) => (
                <Badge key={project}>{project}</Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");

  const filtered = activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterPill label="All" active={activeCategory === "All"} onClick={() => setActiveCategory("All")} />
        {skillCategories.map((category) => (
          <FilterPill
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="text-mono-label mt-6 text-steel/70">HOVER OR TAP A CARD TO SEE DETAILS</p>
    </div>
  );
}
