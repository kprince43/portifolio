"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/use-in-view";
import { ConfiguratorControls } from "@/components/sections/configurator-controls";

/**
 * ssr:false is required here — three.js/@react-three/fiber touch
 * browser/WebGL APIs that don't exist on the server, and code-splitting
 * this out keeps the whole 3D bundle off the main page's JS entirely
 * until this component actually mounts.
 */
const ThreeScene = dynamic(() => import("@/components/three/three-scene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-steel">
      <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-signal" />
      <span className="text-mono-label">INITIALIZING SCENE</span>
    </div>
  );
}

export function Configurator() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
      <div
        ref={ref}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-line-strong bg-paper/40 md:aspect-[16/9] lg:aspect-auto lg:h-[480px]"
      >
        {/* Only request the 3D chunk once this section is actually about to be seen. */}
        {inView ? <ThreeScene /> : <SceneFallback />}
        <p className="text-mono-label pointer-events-none absolute bottom-3 left-3 text-steel/70">
          DRAG TO ORBIT · SCROLL TO ZOOM
        </p>
      </div>

      <ConfiguratorControls />
    </div>
  );
}
