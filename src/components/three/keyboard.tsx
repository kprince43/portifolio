"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, InstancedMesh, Object3D } from "three";
import { useConfiguratorStore } from "@/lib/configurator-store";
import { useLerpedColor } from "@/components/three/use-lerped-color";
import type { KeyboardTheme } from "@/types";

interface KeyboardSpec {
  base: string;
  key: string;
  rgb: boolean;
}

const KEYBOARD_SPECS: Record<KeyboardTheme, KeyboardSpec> = {
  Black: { base: "#1c1f22", key: "#2c2f33", rgb: false },
  White: { base: "#f1efe8", key: "#ffffff", rgb: false },
  RGB: { base: "#16181b", key: "#222222", rgb: true },
};

const COLS = 14;
const ROWS = 4;
const KEY_SIZE = 0.1;
const GAP = 0.035;
const STEP = KEY_SIZE + GAP;

const dummy = new Object3D();

export function Keyboard() {
  const theme = useConfiguratorStore((s) => s.keyboard);
  const spec = KEYBOARD_SPECS[theme];

  const baseColor = useLerpedColor(spec.base);
  const keyColor = useLerpedColor(spec.key);
  const meshRef = useRef<InstancedMesh>(null);
  const tempColor = useMemo(() => new Color(), []);

  const positions = useMemo(() => {
    const list: [number, number][] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = (col - (COLS - 1) / 2) * STEP;
        const z = (row - (ROWS - 1) / 2) * STEP;
        list.push([x, z]);
      }
    }
    return list;
  }, []);

  // Lay out instance positions once on mount.
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    positions.forEach(([x, z], i) => {
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (spec.rgb) {
      const t = state.clock.elapsedTime;
      positions.forEach(([x], i) => {
        const hue = (((x + t * 0.6) % 2) + 2) % 2 / 2;
        tempColor.setHSL(hue, 0.8, 0.55);
        mesh.setColorAt(i, tempColor);
      });
    } else {
      positions.forEach((_, i) => {
        mesh.setColorAt(i, keyColor);
      });
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group position={[0, 0.02, 0.9]} rotation={[-0.05, 0, 0]}>
      {/* base plate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[COLS * STEP + 0.1, 0.04, ROWS * STEP + 0.1]} />
        <meshStandardMaterial color={baseColor} roughness={0.6} metalness={0.2} />
      </mesh>

      {/* keys — single instanced mesh, one draw call regardless of key count */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]} position={[0, 0.045, 0]} castShadow>
        <boxGeometry args={[KEY_SIZE, 0.03, KEY_SIZE]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
      </instancedMesh>
    </group>
  );
}
