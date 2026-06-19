import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Mono eyebrow above the title, e.g. "01 — WORK". Pass only when order is meaningful. */
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="text-mono-label mb-3 text-signal">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-ink">{title}</h2>
      {description && <p className="mt-4 text-steel font-body leading-relaxed">{description}</p>}
    </div>
  );
}
