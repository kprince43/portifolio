import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Render a different element, e.g. "section" for page sections. */
  as?: "div" | "section" | "header" | "footer" | "main";
}

/**
 * The single layout wrapper every section should use. Centralizing the
 * max-width and gutter here means Phase 2's asymmetrical grid can be
 * built as variants inside this container without re-deriving spacing.
 */
export function Container({ children, className, as = "div" }: ContainerProps) {
  const Tag = as;
  return (
    <Tag className={cn("mx-auto w-full max-w-[var(--container-max)] px-6 md:px-10 lg:px-16", className)}>
      {children}
    </Tag>
  );
}
