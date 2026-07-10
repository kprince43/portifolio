"use client";

/**
 * Shared three-point-ish lighting rig: a shadow-casting key light, a cool
 * fill light from the opposite side, and a low ambient base so shadows
 * don't go fully black. Shadow map kept at 1024 (not 2048+) — plenty
 * sharp at this viewport size, noticeably cheaper to render.
 */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.3} color="#a9c7ff" />
    </>
  );
}
