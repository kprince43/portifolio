import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

const stack = ["TypeScript", "Next.js", "Tailwind", "Framer Motion", "Three.js", "Git"];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section id="top" className="border-b border-line">
        <Container className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20">
          <p className="text-mono-label mb-6 text-signal">PORTFOLIO — CALIBRATED 2026</p>
          <h1 className="max-w-4xl text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-steel">
            {siteConfig.name} — {siteConfig.role}. This is the foundation layer: layout, theme,
            and components. Work, about, and contact sections arrive in the next build phase.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="#work">View Work</Button>
            <Button variant="outline" href={`mailto:${siteConfig.email}`}>
              Get in Touch
            </Button>
          </div>
        </Container>
      </section>

      {/* WORK (placeholder) */}
      <section id="work" className="border-b border-line py-24">
        <Container>
          <SectionHeading
            eyebrow="01 — WORK"
            title="Selected projects"
            description="Project cards and the asymmetrical grid land in Phase 2. This section is wired into the nav and scroll-tracking now so it's ready to receive that content."
          />
        </Container>
      </section>

      {/* ABOUT (placeholder) */}
      <section id="about" className="border-b border-line py-24">
        <Container>
          <SectionHeading
            eyebrow="02 — ABOUT"
            title="Background & approach"
            description="Bio, GitHub activity, and timeline content will be added once the data layer for repos and skills is built out."
          />
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
