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
        <ambientLight intensity={0.4} />
        <ParticleNetwork count={isMobile ? 55 : 140} />
        <CoreNode />
        {!isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.65}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.15} darkness={0.85} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
