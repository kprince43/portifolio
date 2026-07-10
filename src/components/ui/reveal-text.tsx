"use client";
import { motion, useReducedMotion } from "framer-motion";
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
interface RevealTextProps { text: string; className?: string; delay?: number; trigger?: "mount" | "scroll"; }
export function RevealText({ text, className, delay = 0, trigger = "scroll" }: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const motionProps = trigger === "mount" ? { animate: { y: 0 } } : { whileInView: { y: 0 }, viewport: { once: true, margin: "-80px" } };
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" initial={prefersReducedMotion ? false : { y: "110%" }} {...motionProps} transition={{ duration: 0.7, delay: delay + i * 0.05, ease: EASE_OUT }}>
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
