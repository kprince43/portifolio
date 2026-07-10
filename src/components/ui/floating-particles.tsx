"use client";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
interface Particle { id: number; left: number; size: number; duration: number; delay: number; }
function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({ id: i, left: Math.random() * 100, size: 2 + Math.random() * 3, duration: 14 + Math.random() * 10, delay: Math.random() * 10 }));
}
export function FloatingParticles({ count = 24 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const particles = useMemo(() => generateParticles(count), [count]);
  if (!mounted || prefersReducedMotion) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      {particles.map((p) => (
        <motion.span key={p.id} className="absolute rounded-full bg-signal/30" style={{ left: `${p.left}%`, width: p.size, height: p.size, bottom: -20 }} animate={{ y: ["0%", "-120vh"], opacity: [0, 0.6, 0] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
}
