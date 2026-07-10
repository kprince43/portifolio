"use client";

import { Suspense } from "react";
import { ContactShadows } from "@react-three/drei";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { SceneLights } from "@/components/three/scene-lights";
import { SceneEnvironment } from "@/components/three/scene-environment";
import { SceneControls } from "@/components/three/scene-controls";
import { Desk } from "@/components/three/desk";
import { Monitor } from "@/components/three/monitor";
import { Keyboard } from "@/components/three/keyboard";
import { useConfiguratorStore } from "@/lib/configurator-store";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { BackgroundTheme } from "@/types";

interface BackgroundSpec {
  preset: "lobby" | "studio" | "night";
  showBackground: boolean;
  tint: string;
}

const BACKGROUND_SPECS: Record<BackgroundTheme, BackgroundSpec> = {
  Office: { preset: "lobby", showBackground: false, tint: "#cfc8b8" },
  Studio: { preset: "studio", showBackground: false, tint: "#dcdcdc" },
  Futuristic: { preset: "night", showBackground: true, tint: "#0c0f1c" },
};

/**
 * Default export so next/dynamic can import this module directly.
 * This is the only piece that touches three/@react-three packages —
 * everything else (including the control panel) stays untouched by
 * that bundle weight.
 */
export default function ThreeScene() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const background = useConfiguratorStore((s) => s.background);
  const spec = BACKGROUND_SPECS[background];

  return (
    <SceneCanvas>
      <color attach="background" args={[spec.tint]} />
      <SceneLights />
      <Suspense fallback={null}>
        <SceneEnvironment preset={spec.preset} background={spec.showBackground} />
      </Suspense>

      <Desk />
      <Monitor />
      <Keyboard />

      <ContactShadows
        position={[0, -1.57, 0]}
        opacity={0.45}
        scale={8}
        blur={2.2}
        far={3}
        resolution={512}
        color="#14181c"
      />
      <SceneControls autoRotate={!prefersReducedMotion} />
    </SceneCanvas>
  );
}
