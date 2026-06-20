"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  /** Grid placement (col-span/row-span utilities) — passed in by the grid layout. */
  className?: string;
  /** Small mono label in the top-left, e.g. "01" or a category tag. */
  eyebrow?: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  /** Wraps the card in a link when provided (e.g. the Featured Project card). */
  href?: string;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Four small corner ticks, reinforcing the instrument-panel motif on glass surfaces. */
function CornerTicks() {
  const base = "absolute h-2 w-2 border-line-strong/70 transition-colors group-hover:border-signal/70";
  return (
    <>
      <span aria-hidden className={cn(base, "left-3 top-3 border-l border-t")} />
      <span aria-hidden className={cn(base, "right-3 top-3 border-r border-t")} />
      <span aria-hidden className={cn(base, "bottom-3 left-3 border-b border-l")} />
      <span aria-hidden className={cn(base, "bottom-3 right-3 border-b border-r")} />
    </>
  );
}

export function BentoCard({ className, eyebrow, title, icon, children, href }: BentoCardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      whileHover={{ y: -4 }}
      className={cn("group relative min-h-[200px]", className)}
    >
      <Wrapper
        {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-md border border-line-strong/60 p-5",
          "bg-paper/60 backdrop-blur-md transition-colors duration-300",
          "shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)] group-hover:border-signal/50",
          "group-hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.18)]"
        )}
      >
        {/* glass sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bone/10 via-transparent to-transparent"
        />
        <CornerTicks />

        <div className="relative z-10 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-signal">{icon}</span>}
            <h3 className="font-display text-base font-bold text-ink">{title}</h3>
          </div>
          {eyebrow && <span className="text-mono-label text-steel">{eyebrow}</span>}
        </div>

        <div className="relative z-10 flex-1 text-sm text-steel">{children}</div>
      </Wrapper>
    </motion.div>
  );
}
