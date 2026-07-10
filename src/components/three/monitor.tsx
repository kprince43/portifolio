"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, MeshStandardMaterial } from "three";
import { useConfiguratorStore } from "@/lib/configurator-store";
import { useLerpedColor } from "@/components/three/use-lerped-color";
import type { MonitorTheme } from "@/types";

interface MonitorSpec {
  screen: string;
  bezel: string;
  intensity: number;
  pulse: boolean;
}

const MONITOR_SPECS: Record<MonitorTheme, MonitorSpec> = {
  Dark: { screen: "#3a4148", bezel: "#1a1d21", intensity: 0.5, pulse: false },
  Light: { screen: "#e7e9e4", bezel: "#cfd0c9", intensity: 0.35, pulse: false },
  Cyber: { screen: "#19e6c8", bezel: "#111418", intensity: 1.3, pulse: true },
};

export function Monitor() {
  const theme = useConfiguratorStore((s) => s.monitor);
  const spec = MONITOR_SPECS[theme];

  const screenColor = useLerpedColor(spec.screen);
  const bezelColor = useLerpedColor(spec.bezel);
  const screenRef = useRef<Mesh>(null);
  const intensityRef = useRef(spec.intensity);

  useFrame((state) => {
    const target = spec.pulse ? spec.intensity + Math.sin(state.clock.elapsedTime * 3) * 0.3 : spec.intensity;
    intensityRef.current += (target - intensityRef.current) * 0.1;
    const material = screenRef.current?.material as MeshStandardMaterial | undefined;
    if (material) material.emissiveIntensity = intensityRef.current;
  });

  return (
    <group position={[0, 0, -1.1]}>
      {/* stand */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.08, 24]} />
        <meshStandardMaterial color="#2a2c2f" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color="#2a2c2f" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* housing */}
      <mesh position={[0, 1.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 1.15, 0.08]} />
        <meshStandardMaterial color={bezelColor} roughness={0.6} metalness={0.2} />
      </mesh>

      {/* screen */}
      <mesh ref={screenRef} position={[0, 1.03, 0.045]}>
        <planeGeometry args={[1.85, 1.0]} />
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={spec.intensity} />
      </mesh>
    </group>
  );
}
