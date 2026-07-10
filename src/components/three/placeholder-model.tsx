"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

interface PlaceholderModelProps {
  rotate?: boolean;
}

/**
 * Stand-in geometry for this foundation phase — swap this out for the
 * real configurable model once that phase arrives. Deliberately simple
 * (two primitives, no textures) to keep this lightweight.
 */
export function PlaceholderModel({ rotate = true }: PlaceholderModelProps) {
  const coreRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!rotate) return;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.3;
    if (ringRef.current) ringRef.current.rotation.x += delta * 0.15;
  });

  return (
    <group position={[0, 0.6, 0]}>
      <mesh ref={coreRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ff4d1c" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh ref={ringRef} castShadow rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.8, 0.05, 16, 100]} />
        <meshStandardMaterial color="#14181c" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}
