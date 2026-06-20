import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SubDivider } from "@/components/ui/sub-divider";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { AboutStory } from "@/components/sections/about-story";
import { Timeline } from "@/components/sections/timeline";
import { SkillsSection } from "@/components/sections/skills-section";
import { BentoGrid } from "@/components/sections/bento-grid";
import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero />

      {/* WORK (placeholder) */}
      <section id="work" className="border-b border-line py-24">
        <Container>
          <SectionHeading
            eyebrow="01 — WORK"
            title="Selected projects"
            description="Project cards and the asymmetrical grid land in an upcoming phase. This section is wired into the nav and scroll-tracking now so it's ready to receive that content."
          />
        </Container>
      </section>

      {/* ABOUT — story, timeline, then the quick-facts bento grid */}
      <section id="about" className="border-b border-line py-24">
        <Container>
          <SectionHeading
            eyebrow="02 — ABOUT"
            title="The story so far"
            description="How I got into building things, what I'm working toward, and the milestones along the way."
            className="mb-12"
          />

          <AboutStory />

          <SubDivider label="// TIMELINE" className="mt-16" />
          <Timeline />

          <SubDivider label="// SKILLS" className="mt-20" />
          <SkillsSection />

          <SubDivider label="// SNAPSHOT" className="mt-20" />
          <BentoGrid />
        </Container>
      </section>

      {/* CONTACT (placeholder) */}
      <section id="contact" className="py-24">
        <Container>
          <SectionHeading
            eyebrow="03 — CONTACT"
            title="Let's build something"
            description="A contact form and final CTA arrive alongside the rest of the page content."
          />
          <div className="mt-8">
            <Button href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
