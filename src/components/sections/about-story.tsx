"use client";

import { BookOpen, Target, GraduationCap } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { personalStory, careerObjectives, education } from "@/data/about";

export function AboutStory() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <BentoCard
        title="My Story"
        icon={<BookOpen size={16} />}
        eyebrow="PERSONAL"
        className="min-h-[260px] lg:col-span-2"
      >
        <div className="space-y-3">
          {personalStory.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </BentoCard>

      <div className="flex flex-col gap-6">
        <BentoCard title="Career Objectives" icon={<Target size={16} />} eyebrow="GOALS">
          <ul className="space-y-2">
            {careerObjectives.map((goal, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-signal">
                  →
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </BentoCard>

        <BentoCard title="Education" icon={<GraduationCap size={16} />} eyebrow="ACADEMIC">
          <p className="font-display text-base font-bold text-ink">{education.school}</p>
          <p className="mt-1 text-sm text-steel">{education.degree}</p>
          <p className="text-mono-label mt-2 text-steel">{education.period}</p>
          <p className="mt-3 text-sm text-steel">{education.description}</p>
        </BentoCard>
      </div>
    </div>
  );
}
