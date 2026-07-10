"use client";
import { User, Sparkles, Briefcase, Layers, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import { aboutMe, skills, techStack, experience, featuredProject } from "@/data/bento";
import { siteConfig } from "@/data/site";
import { useGithubStats } from "@/hooks/use-github-stats";
export function BentoGrid() {
  const { data: github, loading: githubLoading } = useGithubStats(siteConfig.githubUsername);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <BentoCard title="About Me" icon={<User size={16} />} eyebrow="01" className="md:col-span-2 lg:col-span-2 lg:row-span-1">
        <p className="text-sm text-steel">{aboutMe.body}</p>
      </BentoCard>
      <BentoCard title="Skills" icon={<Sparkles size={16} />} eyebrow="02" className="md:col-span-1 lg:col-span-1">
        <div className="flex flex-wrap gap-1.5">{skills.map(s => <Badge key={s}>{s}</Badge>)}</div>
      </BentoCard>
      <BentoCard title="GitHub Stats" icon={<FaGithub size={16} />} eyebrow="LIVE" href={siteConfig.socials.find(s => s.platform === "github")?.href} className="md:col-span-1 lg:col-span-1 lg:row-span-2">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-3">
            <div><p className="font-display text-2xl font-extrabold text-ink">{githubLoading || !github ? "—" : github.user.public_repos}</p><p className="text-mono-label text-steel">REPOSITORIES</p></div>
            <div><p className="font-display text-2xl font-extrabold text-ink">{githubLoading || !github ? "—" : github.totalStars}</p><p className="text-mono-label text-steel">TOTAL STARS</p></div>
            <div><p className="font-display text-2xl font-extrabold text-ink">{githubLoading || !github ? "—" : github.user.followers}</p><p className="text-mono-label text-steel">FOLLOWERS</p></div>
          </div>
          <p className="text-mono-label mt-3 text-steel/70">{githubLoading ? "SYNCING…" : !github ? "OFFLINE" : "SYNCED FROM GITHUB"}</p>
        </div>
      </BentoCard>
      <BentoCard title="Experience" icon={<Briefcase size={16} />} eyebrow="03" className="md:col-span-1 lg:col-span-1">
        <ul className="divide-y divide-line">{experience.map((e, i) => <li key={i} className="py-2 first:pt-0 last:pb-0"><p className="text-sm font-medium text-ink">{e.role}</p><p className="text-sm text-steel">{e.org}</p><p className="text-mono-label text-steel/70">{e.period}</p></li>)}</ul>
      </BentoCard>
      <BentoCard title="Featured Project" icon={<ArrowUpRight size={16} />} eyebrow="04" href={featuredProject.repoHref} className="md:col-span-2 lg:col-span-2">
        <p className="font-display text-lg font-bold text-ink">{featuredProject.title}</p>
        <p className="mt-1 text-sm text-steel">{featuredProject.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{featuredProject.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
      </BentoCard>
      <BentoCard title="Tech Stack" icon={<Layers size={16} />} eyebrow="05" className="md:col-span-2 lg:col-span-4">
        <p className="font-mono text-sm leading-relaxed text-ink">{techStack.join(" / ")}</p>
      </BentoCard>
    </div>
  );
}
