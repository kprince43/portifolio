"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

/**
 * A two-position calibration switch, not a sun/moon icon —
 * reinforces the instrument-panel motif used in the nav and footer.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : undefined}
      aria-label="Toggle color mode"
      onClick={toggle}
      className={cn(
        "relative flex h-7 w-[88px] items-center justify-between rounded-sm border border-line-strong px-2",
        "text-mono-label text-steel transition-colors",
        className
      )}
    >
      <span className={cn("z-10 transition-colors", !isDark && "text-ink")}>DAY</span>
      <span className={cn("z-10 transition-colors", isDark && "text-ink")}>NGT</span>

      {mounted && (
        <motion.span
          aria-hidden
          className="absolute top-0.5 bottom-0.5 w-[40px] rounded-sm bg-signal/15 border border-signal"
          initial={false}
          animate={{ left: isDark ? "46px" : "2px" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}
