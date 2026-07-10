"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const sectionIds = ["top", "work", "about", "contact"];
  const activeId = useActiveSection(sectionIds);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="border-b border-white/8 bg-graphite/95 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">

          {/* mark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-sm font-extrabold tracking-tight text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-white">
              KP
            </span>
            <span className="hidden sm:inline text-white/90">{siteConfig.name}</span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center md:flex">
            {siteConfig.nav.map(link => {
              const id = link.href.replace("/#", "").replace("/", "") || "top";
              const isActive = id === activeId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-white/50 hover:text-white/90"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-px h-px bg-signal"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact Me
            </a>
          </div>

          {/* mobile trigger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </Container>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 border-b border-white/8 bg-graphite/98 backdrop-blur-md md:hidden"
          >
            <Container className="flex flex-col py-4">
              {siteConfig.nav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 border-b border-white/5 py-3 text-base font-medium text-white/80 hover:text-white"
                  >
                    <span className="text-mono-label text-signal/70">{link.index}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center justify-between pt-4">
                <ThemeToggle />
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-white"
                >
                  Contact Me
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
