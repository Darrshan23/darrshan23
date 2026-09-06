"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import { CoreNode } from "@/components/hero/CoreNode";
import { ParticleNetwork } from "@/components/hero/ParticleNetwork";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroScene() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return null;

  return (
    <Canvas
      dpr={isMobile ? [1, 1.3] : [1, 2]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#050a12", 5, 12]} />
        <ambientLight intensity={0.4} />
        <ParticleNetwork count={isMobile ? 26 : 65} />
        <CoreNode />
        {!isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.2} darkness={0.9} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
