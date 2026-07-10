import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SubDivider } from "@/components/ui/sub-divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Hero } from "@/components/sections/hero";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { AboutStory } from "@/components/sections/about-story";
import { Timeline } from "@/components/sections/timeline";
import { SkillsSection } from "@/components/sections/skills-section";
import { GithubDashboard } from "@/components/sections/github-dashboard";
import { BentoGrid } from "@/components/sections/bento-grid";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="work" className="border-b border-line py-24">
        <Container>
          <SectionHeading eyebrow="01 — WORK" title="Selected projects" description="A few things I've built — filter by category or search by name, description, or stack." className="mb-12" />
          <ScrollReveal><ProjectsShowcase /></ScrollReveal>
        </Container>
      </section>
      <section id="about" className="border-b border-line py-24">
        <Container>
          <SectionHeading eyebrow="02 — ABOUT" title="The story so far" description="How I got into building things, what I'm working toward, and the milestones along the way." className="mb-12" />
          <AboutStory />
          <SubDivider label="// TIMELINE" className="mt-16" />
          <Timeline />
          <SubDivider label="// SKILLS" className="mt-20" />
          <SkillsSection />
          <SubDivider label="// GITHUB" className="mt-20" />
          <ScrollReveal><GithubDashboard /></ScrollReveal>
          <SubDivider label="// SNAPSHOT" className="mt-20" />
          <BentoGrid />
        </Container>
      </section>
      <section id="contact" className="py-24">
        <Container>
          <SectionHeading eyebrow="03 — CONTACT" title="Let's build something" description="Have a project in mind, a role to discuss, or just want to say hi? Send a message below." className="mb-12" />
          <ScrollReveal>
            <div className="max-w-2xl">
              <ContactForm />
              <p className="text-mono-label mt-8 text-steel/70">
                PREFER EMAIL DIRECTLY?{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-steel underline-offset-4 hover:text-signal hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
