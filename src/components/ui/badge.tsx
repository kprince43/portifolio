import { cn } from "@/lib/utils";

/**
 * Small mono-set label, styled like a part number or spec tag.
 * Used for tech-stack chips, status flags, and category markers.
 */
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "text-mono-label inline-flex items-center rounded-sm border border-line-strong px-2 py-1 text-steel",
        className
      )}
    >
      {children}
    </span>
  );
}
