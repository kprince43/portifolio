"use client";

import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

interface SceneCanvasProps {
  children: ReactNode;
}

/**
 * The shared <Canvas> shell every 3D scene in this project should use.
 * Camera, renderer, and pixel-ratio settings live here once so the real
 * configurator (a later phase) doesn't have to re-derive them.
 *
 * dpr is capped at 1.75 instead of the device's full pixel ratio — on a
 * 3x-density phone that's the difference between rendering ~1x and ~3x
 * the pixels, for a viewport this size the visual gain isn't worth it.
 */
export function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [4, 2.5, 5], fov: 40 }}
    >
      {children}
    </Canvas>
  );
}
