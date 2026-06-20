import { cn } from "@/lib/utils";

/**
 * A small subsection label used inside a larger section — e.g. dividing
 * "About" into Story / Timeline / Snapshot without stacking multiple
 * full SectionHeadings on top of each other.
 */
export function SubDivider({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("mb-10 flex items-center gap-3", className)}>
      <span className="text-mono-label whitespace-nowrap text-signal">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
