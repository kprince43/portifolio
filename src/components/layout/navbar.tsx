"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const sectionIds = siteConfig.nav.map((link) => link.href.replace("/#", "").replace("/", "") || "top");
  const activeId = useActiveSection(sectionIds);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="border-b border-line bg-paper/90 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between">
          {/* mark */}
          <Link href="/" className="flex items-center gap-2 font-display text-sm font-extrabold tracking-tight text-ink">
            <span className="flex h-8 w-8 items-center justify-center border border-line-strong text-xs text-mono-label">
              {siteConfig.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((link) => {
              const id = link.href.replace("/#", "").replace("/", "") || "top";
              const isActive = id === activeId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                    isActive ? "text-ink" : "text-steel hover:text-ink"
                  )}
                >
                  <span className="text-mono-label text-signal">{link.index}</span>
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px bg-signal transition-opacity",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <Button size="sm" variant="outline" href={`mailto:${siteConfig.email}`}>
              Contact
            </Button>
          </div>

          {/* mobile trigger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center border border-line-strong md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </Container>
      </div>
      <div className="tick-rule" />

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 border-b border-line bg-paper md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {siteConfig.nav.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 border-b border-line py-3 text-base text-ink"
                >
                  <span className="text-mono-label text-signal">{link.index}</span>
                  {link.label}
                </motion.a>
              ))}
              <div className="flex items-center justify-between pt-4">
                <ThemeToggle />
                <Button size="sm" variant="outline" href={`mailto:${siteConfig.email}`}>
                  Contact
                </Button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
