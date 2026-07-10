"use client";

import { useEffect, useState } from "react";

/**
 * True when the viewport is at or below `breakpoint`. Used to scale back
 * 3D rendering quality (device pixel ratio, shadow map resolution) on
 * smaller/likely-lower-powered devices.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
