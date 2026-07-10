"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site";
import { SOCIAL_ICONS } from "@/lib/social-icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-graphite">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="font-display text-2xl font-black text-white">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-white/50">{siteConfig.role}</p>
            <div className="mt-4 flex items-center gap-2">
              <motion.span
                aria-hidden
                className="h-2 w-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span className="text-sm text-white/50">Available for new opportunities</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {siteConfig.socials.map(social => {
              const Icon = SOCIAL_ICONS[social.platform] ?? Mail;
              const isExternal = social.platform !== "email";
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-signal/50 hover:text-signal"
                >
                  <Icon size={16} aria-hidden />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 pt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/30">
            &copy; {year} Kwizera Prince. All rights reserved.
          </p>
          <p className="text-sm text-white/30">
            Designed and developed by Kwizera Prince.
          </p>
        </div>
      </Container>
    </footer>
  );
}
