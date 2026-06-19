"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Use this to gate any UI that depends on theme/localStorage to avoid
 * server/client markup mismatches (e.g. the theme toggle icon).
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentional: this is the standard hydration-mismatch guard pattern —
    // syncing render state with the client's existence, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}
