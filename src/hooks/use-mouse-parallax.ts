"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Tracks the mouse position relative to the bounding box of the returned
 * `ref`'s element, normalized to roughly -0.5..0.5 on each axis and
 * spring-smoothed. Attach `ref` to a relatively-positioned container,
 * then derive per-element offsets from `x`/`y` with `useTransform` so
 * each floating element can move at its own depth.
 *
 * No-ops when the user prefers reduced motion — values stay at 0.
 */
export function useMouseParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    function handleMove(event: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set((event.clientX - rect.left) / rect.width - 0.5);
      rawY.set((event.clientY - rect.top) / rect.height - 0.5);
    }

    function handleLeave() {
      rawX.set(0);
      rawY.set(0);
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReducedMotion, rawX, rawY]);

  return { ref, x, y, prefersReducedMotion: Boolean(prefersReducedMotion) };
}
