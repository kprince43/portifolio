"use client";
import { useEffect, useState } from "react";
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    function h(e: MediaQueryListEvent) { setMatches(e.matches); }
    mql.addEventListener("change", h);
    return () => mql.removeEventListener("change", h);
  }, [query]);
  return matches;
}
