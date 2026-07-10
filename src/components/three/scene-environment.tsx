"use client";

import { Environment } from "@react-three/drei";
import type { ComponentProps } from "react";

type EnvironmentPreset = ComponentProps<typeof Environment>["preset"];

interface SceneEnvironmentProps {
  preset?: EnvironmentPreset;
  background?: boolean;
}

/**
 * HDRI-based ambient lighting and reflections. drei fetches this asset
 * at runtime, so the caller wraps this in <Suspense>. background={false}
 * (the default) keeps the HDRI invisible — it only feeds reflections,
 * it doesn't add a skybox behind the scene. Parameterized so any scene
 * (including the configurator's Background option) can swap presets.
 */
export function SceneEnvironment({ preset = "city", background = false }: SceneEnvironmentProps) {
  return <Environment preset={preset} background={background} />;
}
