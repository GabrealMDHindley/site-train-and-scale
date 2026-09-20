"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type * as THREE from "three";

/** A small faceted seal + orbiting ring — the guarantee as a physical badge. */
function Badge({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion || !group.current) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    if (ring.current) ring.current.rotation.z -= delta * 0.5;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#0d1b33"
          roughness={0.2}
          metalness={0.85}
          emissive="#4f8ff7"
          emissiveIntensity={0.6}
          flatShading
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.5, 0.015, 8, 96]} />
        <meshBasicMaterial color="#c5e6fd" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function GuaranteeScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.2], fov: 38 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} color="#4f8ff7" intensity={40} />
      <pointLight position={[-3, -2, -2]} color="#c5e6fd" intensity={12} />
      <Badge reducedMotion={reducedMotion} />
    </Canvas>
  );
}
