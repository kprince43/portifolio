"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Clean icon-based toggle — sun for light, moon for dark.
 * The icon swaps with a subtle scale + fade rather than sliding text.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : undefined}
      aria-label="Toggle color mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-steel transition-colors hover:border-signal/50 hover:text-signal ${className ?? ""}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            {isDark ? <Moon size={16} aria-hidden /> : <Sun size={16} aria-hidden />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
