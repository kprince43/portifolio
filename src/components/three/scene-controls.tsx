"use client";

import { OrbitControls } from "@react-three/drei";

interface SceneControlsProps {
  autoRotate?: boolean;
}

/**
 * Orbit controls tuned for a product-viewer feel: damped motion, a
 * limited distance/angle range so you can't orbit underneath or fly
 * off into the distance, and no panning (keeps the subject centered).
 * drei's defaults already handle touch sensibly — one-finger rotate,
 * two-finger pinch-zoom — so they're left as-is for mobile.
 */
export function SceneControls({ autoRotate = false }: SceneControlsProps) {
  return (
    <OrbitControls
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={3}
      maxDistance={8}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 1.6}
      autoRotate={autoRotate}
      autoRotateSpeed={0.6}
    />
  );
}
