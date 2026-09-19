"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Three ascending peaks, left → right, rhyming with the logo's stacked
// chevron mark and the brand idea itself: train, then scale (climb).
function ridgeHeight(x: number, z: number): number {
  const base = Math.sin(x * 0.9) * 0.05 + Math.sin(x * 2.3 + 1) * 0.02;
  const zFalloff = 1 - Math.min(Math.abs(z) * 0.16, 0.9);
  const peakA = Math.exp(-((x + 2.3) ** 2) / 2.4) * 0.55 * zFalloff;
  const peakB = Math.exp(-(x ** 2) / 2.2) * 0.85 * zFalloff;
  const peakC = Math.exp(-((x - 2.1) ** 2) / 2.0) * 1.2 * zFalloff;
  return Math.max(0, base + peakA + peakB + peakC);
}

function WireframePeaks() {
  const geometry = useMemo(() => {
    const width = 9;
    const depth = 4.5;
    const segX = 46;
    const segZ = 18;
    const geo = new THREE.PlaneGeometry(width, depth, segX, segZ);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, ridgeHeight(x, z));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={[0.3, -0.55, 0]}>
      <meshBasicMaterial
        color="#4f8ff7"
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

const PARTICLE_COUNT = 520;

function AssemblingPoints({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const startedAt = useRef<number | null>(null);
  // Random start/target positions are generated once after mount (not during
  // render) so the component body stays pure — see react-hooks/purity.
  const dataRef = useRef<{ targets: Float32Array; starts: Float32Array } | null>(null);

  const colors = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const accent = new THREE.Color("#c5e6fd");
    const accentDeep = new THREE.Color("#4f8ff7");
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = i % 3 !== 0 ? accentDeep : accent;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return colors;
  }, []);

  useEffect(() => {
    const targets = new Float32Array(PARTICLE_COUNT * 3);
    const starts = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const onRidge = i % 3 !== 0;
      let x: number, z: number, y: number;
      if (onRidge) {
        x = (Math.random() - 0.5) * 9;
        z = (Math.random() - 0.5) * 4.5;
        y = ridgeHeight(x, z) + Math.random() * 0.05;
      } else {
        // ambient sky particles above the range
        x = (Math.random() - 0.5) * 10;
        z = (Math.random() - 0.5) * 6;
        y = 0.6 + Math.random() * 2.4;
      }
      targets[i * 3] = x + 0.3;
      targets[i * 3 + 1] = y - 0.55;
      targets[i * 3 + 2] = z;

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      const dist = 4 + Math.random() * 3;
      starts[i * 3] = targets[i * 3] + dir.x * dist;
      starts[i * 3 + 1] = targets[i * 3 + 1] + dir.y * dist;
      starts[i * 3 + 2] = targets[i * 3 + 2] + dir.z * dist;
    }

    dataRef.current = { targets, starts };
    const posAttr = pointsRef.current?.geometry.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (posAttr) {
      (posAttr.array as Float32Array).set(starts);
      posAttr.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    const geom = pointsRef.current?.geometry;
    const data = dataRef.current;
    if (!geom || !data) return;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const { targets, starts } = data;

    if (reducedMotion) {
      posAttr.array.set(targets);
      posAttr.needsUpdate = true;
      return;
    }

    if (startedAt.current === null) startedAt.current = state.clock.elapsedTime;
    const t = Math.min((state.clock.elapsedTime - startedAt.current) / 2.2, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let axis = 0; axis < 3; axis++) {
        const idx = i * 3 + axis;
        posAttr.array[idx] =
          starts[idx] + (targets[idx] - starts[idx]) * eased;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(PARTICLE_COUNT * 3), 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function Rig({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const p = progressRef.current;
    if (!reducedMotion) {
      group.current.rotation.y = p * 0.55 + Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
    }
    state.camera.position.y = 1.1 + p * 0.9;
    state.camera.lookAt(0.3, 0.1, 0);
  });
  return null;
}

export default function HeroScene({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.1, 6.2], fov: 40 }}
    >
      <color attach="background" args={["#05070a"]} />
      <fog attach="fog" args={["#05070a", 6, 12]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 4, 5]} color="#4f8ff7" intensity={60} />
      <pointLight position={[-4, 2, -3]} color="#c5e6fd" intensity={20} />
      <group>
        <WireframePeaks />
        <AssemblingPoints reducedMotion={reducedMotion} />
      </group>
      <Rig progressRef={progressRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
