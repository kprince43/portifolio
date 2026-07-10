"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function h() { setVisible(window.scrollY > 600); }
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.2 }} className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-paper/90 text-ink shadow-lg backdrop-blur-sm transition-colors hover:border-signal hover:text-signal">
          <ArrowUp size={16} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
