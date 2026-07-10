"use client";
import { motion, useReducedMotion } from "framer-motion";
const EASE = [0.16, 1, 0.3, 1] as const;
export function ScrollReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const rm = useReducedMotion();
  return (
    <motion.div initial={rm ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}
