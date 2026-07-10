import { cn } from "@/lib/utils";
interface ContainerProps { children: React.ReactNode; className?: string; as?: "div"|"section"|"header"|"footer"|"main"; }
export function Container({ children, className, as = "div" }: ContainerProps) {
  const Tag = as;
  return <Tag className={cn("mx-auto w-full max-w-[var(--container-max)] px-6 md:px-10 lg:px-16", className)}>{children}</Tag>;
}
