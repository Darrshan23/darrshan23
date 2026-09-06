"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CYAN = new THREE.Color("#00e5ff");
const VIOLET = new THREE.Color("#7c3aed");

export function ParticleNetwork({
  count = 140,
  maxDist = 2.6,
  spread = 9,
}: {
  count?: number;
  maxDist?: number;
  spread?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.65;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6;

      velocities[i * 3] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;

      const c = Math.random() > 0.72 ? VIOLET : CYAN;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, velocities, colors };
  }, [count, spread]);

  const maxSegments = count * count;
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(maxSegments * 2 * 3), 3)
    );
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(maxSegments * 2 * 3), 3)
    );
    geo.setDrawRange(0, 0);
    return geo;
  }, [maxSegments]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const posAttr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const half = spread / 2;
    const halfY = (spread * 0.65) / 2;
    const halfZ = (spread * 0.6) / 2;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      if (arr[i * 3] > half || arr[i * 3] < -half) velocities[i * 3] *= -1;
      if (arr[i * 3 + 1] > halfY || arr[i * 3 + 1] < -halfY) velocities[i * 3 + 1] *= -1;
      if (arr[i * 3 + 2] > halfZ || arr[i * 3 + 2] < -halfZ) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // Rebuild connection segments (small N, cheap enough per-frame at this scale)
    const linePos = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
    const lineColor = lineGeometry.getAttribute("color") as THREE.BufferAttribute;
    const lArr = linePos.array as Float32Array;
    const cArr = lineColor.array as Float32Array;
    let segIdx = 0;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          const alpha = 1 - dist / maxDist;
          lArr[segIdx * 6] = arr[i * 3];
          lArr[segIdx * 6 + 1] = arr[i * 3 + 1];
          lArr[segIdx * 6 + 2] = arr[i * 3 + 2];
          lArr[segIdx * 6 + 3] = arr[j * 3];
          lArr[segIdx * 6 + 4] = arr[j * 3 + 1];
          lArr[segIdx * 6 + 5] = arr[j * 3 + 2];

          cArr[segIdx * 6] = 0;
          cArr[segIdx * 6 + 1] = alpha * 0.9;
          cArr[segIdx * 6 + 2] = alpha;
          cArr[segIdx * 6 + 3] = 0;
          cArr[segIdx * 6 + 4] = alpha * 0.9;
          cArr[segIdx * 6 + 5] = alpha;

          segIdx++;
        }
      }
    }
    lineGeometry.setDrawRange(0, segIdx * 2);
    linePos.needsUpdate = true;
    lineColor.needsUpdate = true;

    // Gentle parallax toward pointer
    if (groupRef.current) {
      const { pointer } = state;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.25,
        0.03
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.15,
        0.03
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.35} depthWrite={false} />
      </lineSegments>
    </group>
  );
}
