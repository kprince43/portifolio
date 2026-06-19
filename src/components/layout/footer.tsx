"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="tick-rule" />
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* spec block */}
          <div className="space-y-1">
            <p className="font-display text-xl font-extrabold text-ink">{siteConfig.name}</p>
            <p className="text-sm text-steel">{siteConfig.role}</p>
            <p className="text-mono-label mt-3 flex items-center gap-2 text-steel">
              <motion.span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-signal"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              STATUS: AVAILABLE FOR WORK
            </p>
          </div>

          {/* social jacks */}
          <div className="flex flex-wrap gap-2">
            {siteConfig.socials.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="text-mono-label flex h-11 w-11 items-center justify-center border border-line-strong text-steel transition-colors hover:border-signal hover:text-signal"
              >
                {social.code}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-mono-label text-steel md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </span>
          <span>{siteConfig.version} — BUILT WITH NEXT.JS</span>
        </div>
      </Container>
    </footer>
  );
}
