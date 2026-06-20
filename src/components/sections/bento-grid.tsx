"use client";

import { User, Sparkles, Briefcase, FolderGit2, Award, Layers, ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import {
  aboutMe,
  skills,
  techStack,
  experience,
  certifications,
  githubStats,
  featuredProject,
} from "@/data/bento";
import { siteConfig } from "@/data/site";

/**
 * Order matters here: with these exact col/row spans, the browser's
 * default (non-dense) grid auto-placement tiles a perfect 4-column x
 * 4-row grid at desktop with zero gaps. Re-ordering or changing a span
 * will reflow everything after it — adjust deliberately.
 */
export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:auto-rows-[190px] lg:gap-6">
      {/* 1. Featured Project — 2x2 */}
      <BentoCard
        title="Featured Project"
        icon={<Sparkles size={16} />}
        eyebrow="01"
        className="md:col-span-2 lg:col-span-2 lg:row-span-2"
      >
        <div className="flex h-full flex-col">
          <div
            aria-hidden
            className="mb-4 flex-1 rounded-sm border border-line bg-[linear-gradient(135deg,var(--color-line)_0%,transparent_60%)]"
            style={{ minHeight: 80 }}
          />
          <p className="font-display text-lg font-bold text-ink">{featuredProject.title}</p>
          <p className="mt-1 text-sm text-steel">{featuredProject.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {featuredProject.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <a
              href={featuredProject.liveHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-signal"
            >
              View Live <ArrowUpRight size={14} />
            </a>
            <a
              href={featuredProject.repoHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-steel transition-colors hover:text-signal"
            >
              Source <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </BentoCard>

      {/* 2. About Me — 2x1 */}
      <BentoCard title="About Me" icon={<User size={16} />} eyebrow="02" className="md:col-span-2 lg:col-span-2">
        <p>{aboutMe.body}</p>
      </BentoCard>

      {/* 3. GitHub Stats — 1x2 */}
      <BentoCard
        title="GitHub Stats"
        icon={<FolderGit2 size={16} />}
        eyebrow="PREVIEW"
        href={siteConfig.socials.find((s) => s.platform === "github")?.href}
        className="md:col-span-1 lg:col-span-1 lg:row-span-2"
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-3">
            <div>
              <p className="font-display text-2xl font-extrabold text-ink">{githubStats.repos}</p>
              <p className="text-mono-label text-steel">REPOSITORIES</p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-ink">{githubStats.contributions}</p>
              <p className="text-mono-label text-steel">CONTRIBUTIONS</p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-ink">{githubStats.streak}</p>
              <p className="text-mono-label text-steel">DAY STREAK</p>
            </div>
          </div>
          <p className="text-mono-label mt-3 text-steel/70">{githubStats.note}</p>
        </div>
      </BentoCard>

      {/* 4. Skills — 1x2 */}
      <BentoCard title="Skills" icon={<Layers size={16} />} eyebrow="03" className="md:col-span-1 lg:col-span-1 lg:row-span-2">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </BentoCard>

      {/* 5. Experience — 2x1 */}
      <BentoCard
        title="Experience"
        icon={<Briefcase size={16} />}
        eyebrow="04"
        className="md:col-span-2 lg:col-span-2"
      >
        <ul className="divide-y divide-line">
          {experience.map((item, i) => (
            <li key={i} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-ink">{item.role}</p>
                <p className="text-sm text-steel">{item.org}</p>
              </div>
              <span className="text-mono-label whitespace-nowrap text-steel">{item.period}</span>
            </li>
          ))}
        </ul>
      </BentoCard>

      {/* 6. Tech Stack — 2x1 */}
      <BentoCard title="Tech Stack" icon={<Layers size={16} />} eyebrow="05" className="md:col-span-2 lg:col-span-2">
        <p className="font-mono text-sm leading-relaxed text-ink">{techStack.join(" / ")}</p>
      </BentoCard>

      {/* 7. Certifications — 2x1 */}
      <BentoCard
        title="Certifications"
        icon={<Award size={16} />}
        eyebrow="06"
        className="md:col-span-2 lg:col-span-2"
      >
        <ul className="divide-y divide-line">
          {certifications.map((cert, i) => (
            <li key={i} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-ink">{cert.name}</p>
                <p className="text-sm text-steel">{cert.issuer}</p>
              </div>
              <span className="text-mono-label text-steel">{cert.year}</span>
            </li>
          ))}
        </ul>
      </BentoCard>
    </div>
  );
}
