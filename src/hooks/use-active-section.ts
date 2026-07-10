"use client";
import { useEffect, useState } from "react";
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      const v = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (v?.target.id) setActiveId(v.target.id);
    }, { rootMargin: "-20% 0px -60% 0px", threshold: [0,0.25,0.5,0.75,1] });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return activeId;
}
