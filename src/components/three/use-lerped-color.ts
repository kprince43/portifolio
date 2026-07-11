"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";

/**
 * Returns a THREE.Color that eases toward `targetHex` every frame
 * instead of snapping instantly — gives material swaps a transition
 * feel rather than a jump-cut. The same Color instance is mutated in
 * place and returned across renders, so passing it straight into a
 * material's color/emissive prop keeps animating without needing to
 * re-create the prop each frame.
 */
export function useLerpedColor(targetHex: string, speed = 4) {
  // Intentional: lazy ref initialization is React's own documented pattern
  // for avoiding re-creating an object on every render (see
  // react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents).
  // This rule flags it as a general "no ref reads in render" case, but
  // there's no render output depending on this value — it's pure setup.
  const colorRef = useRef<Color>(undefined);
  if (!colorRef.current) colorRef.current = new Color(targetHex);

  const targetRef = useRef<Color>(undefined);
  if (!targetRef.current) targetRef.current = new Color(targetHex);
  targetRef.current.set(targetHex);

  useFrame((_, delta) => {
    colorRef.current!.lerp(targetRef.current!, Math.min(1, delta * speed));
  });

  // Returning the live Color instance is the point: the material prop
  // keeps referencing the same object, which useFrame mutates each tick
  // without needing a re-render.
  return colorRef.current;
}
