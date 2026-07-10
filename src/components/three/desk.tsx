"use client";

import { useMemo } from "react";
import { useConfiguratorStore } from "@/lib/configurator-store";
import { createWoodTexture, createCarbonTexture } from "@/components/three/procedural-textures";
import { useLerpedColor } from "@/components/three/use-lerped-color";
import type { DeskMaterial } from "@/types";

interface DeskSpec {
  color: string;
  roughness: number;
  metalness: number;
  texture: "wood" | "carbon" | null;
  transmission: number;
}

const DESK_SPECS: Record<DeskMaterial, DeskSpec> = {
  Wood: { color: "#8a5a34", roughness: 0.7, metalness: 0.05, texture: "wood", transmission: 0 },
  Carbon: { color: "#23262b", roughness: 0.35, metalness: 0.6, texture: "carbon", transmission: 0 },
  Glass: { color: "#bcd6e0", roughness: 0.05, metalness: 0, texture: null, transmission: 0.9 },
};

const LEG_POSITIONS: [number, number][] = [
  [-2.7, -1.4],
  [2.7, -1.4],
  [-2.7, 1.4],
  [2.7, 1.4],
];

export function Desk() {
  const deskMaterial = useConfiguratorStore((s) => s.desk);
  const spec = DESK_SPECS[deskMaterial];
  const color = useLerpedColor(spec.color);

  // Generated once on mount, then swapped between (not regenerated per selection).
  const woodTexture = useMemo(() => createWoodTexture(), []);
  const carbonTexture = useMemo(() => createCarbonTexture(), []);
  const map = spec.texture === "wood" ? woodTexture : spec.texture === "carbon" ? carbonTexture : null;

  return (
    <group>
      {/* desktop surface — top face sits at y = 0, the reference plane everything else stacks on */}
      <mesh position={[0, -0.075, 0]} receiveShadow castShadow>
        <boxGeometry args={[6, 0.15, 3]} />
        <meshPhysicalMaterial
          color={color}
          map={map}
          roughness={spec.roughness}
          metalness={spec.metalness}
          transmission={spec.transmission}
          thickness={spec.transmission > 0 ? 0.4 : 0}
          ior={spec.transmission > 0 ? 1.4 : 1}
        />
      </mesh>

      {/* legs */}
      {LEG_POSITIONS.map(([x, z], i) => (
        <mesh key={i} position={[x, -0.825, z]} castShadow>
          <boxGeometry args={[0.12, 1.5, 0.12]} />
          <meshStandardMaterial color="#2a2c2f" roughness={0.5} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
