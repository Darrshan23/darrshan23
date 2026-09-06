"use client";

import { MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function CoreNode() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.06;

      const { pointer } = state;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        meshRef.current.rotation.y + pointer.x * 0.4,
        0.015
      );
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.08;
      wireRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group position={[2.7, 0.35, -2.6]}>
      <Icosahedron ref={meshRef} args={[0.85, 4]}>
        <MeshDistortMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.6}
          distort={0.4}
          speed={1.4}
          transparent
          opacity={0.6}
        />
      </Icosahedron>
      <Icosahedron ref={wireRef} args={[1.15, 1]}>
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.35} />
      </Icosahedron>
      <pointLight color="#00e5ff" intensity={3} distance={5} position={[0, 0, 1]} />
    </group>
  );
}
