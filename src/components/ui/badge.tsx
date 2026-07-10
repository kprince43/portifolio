import { cn } from "@/lib/utils";
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-mono-label inline-flex items-center rounded-sm border border-line-strong px-2 py-1 text-steel", className)}>{children}</span>;
}
