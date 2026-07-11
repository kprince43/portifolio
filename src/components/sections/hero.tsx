"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Download, MapPin, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { Magnetic } from "@/components/ui/magnetic";
import { siteConfig } from "@/data/site";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ─── Tech node graph ────────────────────────────────────────────────── */
interface TechNode {
  id: string;
  label: string;
  icon: string;
  x: number; /* 0-100 percent of SVG width */
  y: number;
  primary?: boolean;
}

const NODES: TechNode[] = [
  { id: "react",      label: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",          x: 50,  y: 20, primary: true },
  { id: "node",       label: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",         x: 20,  y: 48 },
  { id: "postgres",   label: "PostgreSQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", x: 80,  y: 48 },
  { id: "js",         label: "JavaScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", x: 35,  y: 78 },
  { id: "tailwind",   label: "Tailwind",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",x: 65, y: 78 },
  { id: "express",    label: "Express",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",       x: 50,  y: 55 },
];

const EDGES: [string, string][] = [
  ["react", "node"], ["react", "postgres"], ["react", "express"],
  ["node", "express"], ["node", "js"], ["express", "postgres"],
  ["express", "js"], ["express", "tailwind"], ["js", "tailwind"],
  ["postgres", "tailwind"],
];

function TechGraph({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const prefersReducedMotion = useReducedMotion();
  const W = 480;
  const H = 380;

  function nodePos(node: TechNode) {
    const baseX = (node.x / 100) * W;
    const baseY = (node.y / 100) * H;
    if (prefersReducedMotion) return { x: baseX, y: baseY };
    const dx = (mouseX - 0.5) * 18;
    const dy = (mouseY - 0.5) * 12;
    const depth = node.primary ? 1.4 : 1;
    return { x: baseX + dx * depth, y: baseY + dy * depth };
  }

  const positions = Object.fromEntries(NODES.map(n => [n.id, nodePos(n)]));

  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg
        width={W}
        height={H}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,77,28,0.4)" />
            <stop offset="100%" stopColor="rgba(255,77,28,0.05)" />
          </linearGradient>
        </defs>
        {EDGES.map(([from, to], i) => {
          const a = positions[from];
          const b = positions[to];
          if (!a || !b) return null;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="url(#edgeGrad)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.06, ease: EASE_OUT }}
            />
          );
        })}
      </svg>

      {NODES.map((node, i) => {
        const pos = positions[node.id];
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE_OUT }}
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="group flex flex-col items-center gap-1.5"
            >
              <div
                className={`flex items-center justify-center rounded-xl border backdrop-blur-md transition-colors duration-300 ${
                  node.primary
                    ? "h-16 w-16 border-signal/40 bg-signal/10 shadow-[0_0_24px_rgba(255,77,28,0.25)]"
                    : "h-12 w-12 border-white/10 bg-white/5 group-hover:border-signal/30"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={node.icon}
                  alt={node.label}
                  width={node.primary ? 36 : 26}
                  height={node.primary ? 36 : 26}
                  className={node.id === "express" ? "invert" : ""}
                />
              </div>
              <span className={`text-xs font-medium ${node.primary ? "text-white" : "text-white/60"}`}>
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Social icons ───────────────────────────────────────────────────── */
const SOCIAL_ICON_MAP = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
} as const;

/* ─── Hero ───────────────────────────────────────────────────────────── */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalized mouse position 0-1 for parallax
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const unsubX = springX.on("change", x => setMouse(m => ({ ...m, x })));
    const unsubY = springY.on("change", y => setMouse(m => ({ ...m, y: y })));
    return () => { unsubX(); unsubY(); };
  }, [springX, springY]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    rawX.set(0.5);
    rawY.set(0.5);
  }

  return (
    <section
      id="top"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden bg-graphite"
    >
      {/* subtle animated gradient background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,77,28,0.07) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(97,218,251,0.04) 0%, transparent 60%)",
        }}
      />

      {/* grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col justify-center px-6 py-24 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-4 sm:gap-8 lg:gap-16 lg:grid-cols-2">

          {/* ── LEFT: content ── */}
          <div className="z-10">

            {/* location badge */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-white/50"
            >
              <MapPin size={12} aria-hidden />
              Kigali, Rwanda · Open to remote
            </motion.div>

            {/* name */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              className="font-display text-6xl font-black leading-[0.93] text-white sm:text-7xl lg:text-[5.5rem]"
            >
              {siteConfig.name.split(" ").map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </motion.h1>

            {/* role */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT }}
              className="mt-4"
            >
              <span className="inline-block rounded-md bg-signal px-4 py-1.5 font-display text-sm font-bold tracking-widest text-white">
                {siteConfig.role.toUpperCase()}
              </span>
            </motion.div>

            {/* intro */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: EASE_OUT }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55"
            >
              I build full-stack web applications that solve real problems — from
              clean, responsive interfaces to reliable backend systems. Currently
              studying Software Engineering at AUCA and actively working on projects.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASE_OUT }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Magnetic>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Download size={15} aria-hidden />
                  Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/8"
                >
                  Get in touch
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </Magnetic>
            </motion.div>

            {/* socials */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52, ease: EASE_OUT }}
              className="mt-10 flex items-center gap-3"
            >
              {siteConfig.socials
                .filter(s => s.platform !== "email")
                .map(social => {
                  const Icon = SOCIAL_ICON_MAP[social.platform as keyof typeof SOCIAL_ICON_MAP];
                  if (!Icon) return null;
                  return (
                    <Magnetic key={social.platform} strength={0.25}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 backdrop-blur-sm transition-colors hover:border-signal/50 hover:text-signal"
                      >
                        <Icon size={16} aria-hidden />
                      </a>
                    </Magnetic>
                  );
                })}
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Send email"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 backdrop-blur-sm transition-colors hover:border-signal/50 hover:text-signal"
                >
                  <Mail size={16} aria-hidden />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* ── RIGHT / BOTTOM: tech node visualization ── */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
            className="flex items-center justify-center"
          >
            <div className="relative scale-[0.65] sm:scale-75 lg:scale-100">
              {/* glow behind the graph */}
              <div
                aria-hidden
                className="absolute inset-0 -m-8 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,77,28,0.08) 0%, transparent 70%)" }}
              />
              <TechGraph mouseX={mouse.x} mouseY={mouse.y} />
            </div>
          </motion.div>

        </div>

        {/* scroll cue */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/25"
          >
            <span className="text-[10px] font-medium tracking-widest">SCROLL</span>
            <span className="h-8 w-px bg-gradient-to-b from-white/25 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
