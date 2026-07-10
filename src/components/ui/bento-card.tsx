"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
interface BentoCardProps { title: string; icon?: React.ReactNode; eyebrow?: string; href?: string; className?: string; children: React.ReactNode; }
export function BentoCard({ title, icon, eyebrow, href, className, children }: BentoCardProps) {
  const inner = (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} whileHover={{ y: -3, boxShadow: "0 16px 40px -12px rgba(0,0,0,0.2)" }} transition={{ duration: 0.4, ease: EASE_OUT }} className={cn("relative flex flex-col gap-3 overflow-hidden rounded-sm border border-line-strong bg-paper/60 p-5 backdrop-blur-md transition-colors hover:border-signal/40", href && "cursor-pointer", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-steel">{icon}<span className="text-mono-label">{eyebrow}</span></div>
      </div>
      <p className="font-display text-base font-bold text-ink">{title}</p>
      <div className="flex-1 text-sm text-steel">{children}</div>
    </motion.div>
  );
  if (href) return <a href={href} target="_blank" rel="noreferrer">{inner}</a>;
  return inner;
}
