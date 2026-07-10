"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
export function SectionHeading({ eyebrow, title, description, className }: { eyebrow?: string; title: string; description?: string; className?: string }) {
  const rm = useReducedMotion();
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <motion.p initial={rm ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-mono-label mb-3 text-signal">{eyebrow}</motion.p>}
      <motion.h2 initial={rm ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl lg:text-5xl text-ink">{title}</motion.h2>
      {description && <motion.p initial={rm ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }} className="mt-4 text-steel font-body leading-relaxed">{description}</motion.p>}
    </div>
  );
}
