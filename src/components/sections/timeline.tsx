"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { timeline, type TimelineMilestone } from "@/data/about";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function MilestoneNode({ item, index }: { item: TimelineMilestone; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT }}
      className="relative flex gap-4 pl-8 md:flex-1 md:flex-col md:gap-3 md:pl-0"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0.5 h-3 w-3 rounded-full border-2 border-signal bg-paper md:relative md:left-auto md:top-auto md:mb-1"
      />
      <div className="md:max-w-[200px]">
        <p className="text-mono-label text-signal">{item.period}</p>
        <p className="mt-1 font-display text-base font-bold text-ink">{item.title}</p>
        <p className="mt-1 text-sm text-steel">{item.description}</p>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 55%"],
  });

  return (
    <div ref={containerRef} className="relative">
      {/* mobile: vertical track, left-aligned */}
      <div aria-hidden className="absolute left-[5px] top-1 bottom-1 w-px bg-line md:hidden" />
      <motion.div
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute left-[5px] top-1 bottom-1 w-px origin-top bg-signal md:hidden"
      />

      {/* desktop: horizontal track, aligned with the dot row */}
      <div aria-hidden className="absolute left-0 right-0 top-[5px] hidden h-px bg-line md:block" />
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-signal md:block"
      />

      <div className="relative flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-4">
        {timeline.map((item, i) => (
          <MilestoneNode key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
