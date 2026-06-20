"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Splits text into words and reveals each by sliding up out of a mask. */
function RevealLine({
  text,
  delay = 0,
  className,
  reduceMotion,
}: {
  text: string;
  delay?: number;
  className?: string;
  reduceMotion: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduceMotion ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.07, ease: EASE_OUT }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** A small instrument-readout card that drifts gently and reacts to the mouse. */
function FloatingCard({
  parallaxX,
  parallaxY,
  depth,
  delay,
  className,
  children,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  depth: number;
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(parallaxX, (v) => v * depth);
  const y = useTransform(parallaxY, (v) => v * depth);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      className={cn(
        "hidden lg:flex flex-col gap-1 rounded-sm border border-line-strong bg-paper/80 px-4 py-3 backdrop-blur-sm",
        "shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)]",
        className
      )}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5 + depth / 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const { ref, x, y, prefersReducedMotion } = useMouseParallax<HTMLDivElement>();

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen overflow-hidden border-b border-line"
    >
      {/* faint giant index mark — background depth cue, ties to nav's 00/01/02 numbering */}
      <motion.span
        aria-hidden
        style={{
          x: useTransform(x, (v) => v * 8),
          y: useTransform(y, (v) => v * 8),
        }}
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[28vw] font-black leading-none text-ink/[0.035] sm:text-[22vw]"
      >
        02
      </motion.span>

      <div className="relative mx-auto flex h-full min-h-screen w-full max-w-[1600px] flex-col justify-center px-6 py-28 md:px-10 lg:px-16">
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-mono-label mb-6 flex items-center gap-2 text-signal"
        >
          <motion.span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-signal"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          SYSTEM ONLINE — AVAILABLE FOR WORK
        </motion.p>

        <h1 className="max-w-5xl font-display text-[13vw] font-black leading-[0.95] text-ink sm:text-[10vw] lg:text-[7.5vw]">
          <RevealLine text={siteConfig.name} reduceMotion={Boolean(prefersReducedMotion)} />
        </h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-mono-label mt-5 text-steel"
        >
          {siteConfig.role.toUpperCase()}
        </motion.p>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-steel"
        >
          I design and build full-stack products — from interface down to
          infrastructure — with an eye for performance, motion, and detail
          that holds up under scrutiny.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button href={siteConfig.resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </Button>
          <Button variant="outline" href="#contact">
            Contact Me
          </Button>
        </motion.div>
      </div>

      {/* floating instrument cards — kept along the right edge so they never
          collide with the left-aligned text column or CTA buttons below it */}
      <FloatingCard parallaxX={x} parallaxY={y} depth={22} delay={0.9} className="absolute right-12 top-28">
        <p className="text-mono-label text-steel">STACK</p>
        <p className="mt-1 text-sm text-ink">TS · Next.js · Node</p>
      </FloatingCard>

      <FloatingCard parallaxX={x} parallaxY={y} depth={16} delay={1.0} className="absolute right-16 top-1/2 -translate-y-1/2">
        <a
          href={siteConfig.socials.find((s) => s.platform === "github")?.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2"
        >
          <span className="flex h-6 w-6 items-center justify-center border border-line-strong text-mono-label text-steel">
            GH
          </span>
          <span className="text-sm text-ink">@kprince43</span>
        </a>
      </FloatingCard>

      <FloatingCard parallaxX={x} parallaxY={y} depth={28} delay={1.1} className="absolute bottom-24 right-12">
        <a
          href={siteConfig.socials.find((s) => s.platform === "linkedin")?.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2"
        >
          <span className="flex h-6 w-6 items-center justify-center border border-line-strong text-mono-label text-steel">
            IN
          </span>
          <span className="text-sm text-ink">Connect on LinkedIn</span>
        </a>
      </FloatingCard>

      {/* scroll cue */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-steel"
        >
          <span className="text-mono-label">SCROLL</span>
          <span className="h-8 w-px bg-line-strong" />
        </motion.div>
      </motion.div>
    </section>
  );
}
