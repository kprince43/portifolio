"use client";
import { cn } from "@/lib/utils";
export function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("text-mono-label rounded-sm border px-3 py-1.5 transition-colors", active ? "border-signal bg-signal text-paper" : "border-line-strong text-steel hover:border-signal hover:text-signal")}>
      {label}
    </button>
  );
}
