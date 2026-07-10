"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useHasFinePointer } from "@/hooks/use-has-fine-pointer";

export function CursorFollower() {
  const hasFinePointer = useHasFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const active = hasFinePointer && !prefersReducedMotion;
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (!active) return;
    const handleMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const isInteractive = (t: EventTarget | null) => t instanceof HTMLElement && t.closest("a, button, input, textarea, [role='button']");
    const handleOver = (e: MouseEvent) => { if (isInteractive(e.target)) scale.set(1.7); };
    const handleOut = (e: MouseEvent) => { if (isInteractive(e.target)) scale.set(1); };
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    return () => { window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseover", handleOver); window.removeEventListener("mouseout", handleOut); };
  }, [active, x, y, scale]);

  if (!active) return null;
  return (
    <motion.div aria-hidden style={{ x: springX, y: springY, scale: springScale }} className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2">
      <span className="block h-6 w-6 rounded-full border border-signal/60" />
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
    </motion.div>
  );
}
