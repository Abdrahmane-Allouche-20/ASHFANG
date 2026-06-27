"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.03;
    ref.current.rotation.x += dt * 0.012;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#67e8f9"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.14;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Icosahedron ref={ref} args={[1.7, 5]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        emissive="#6d28d9"
        emissiveIntensity={0.55}
        roughness={0.15}
        metalness={0.9}
        distort={0.38}
        speed={1.8}
      />
    </Icosahedron>
  );
}

function Shell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y -= dt * 0.05;
    ref.current.rotation.z += dt * 0.02;
  });
  return (
    <Icosahedron ref={ref} args={[2.7, 1]}>
      <meshBasicMaterial wireframe color="#22d3ee" transparent opacity={0.13} />
    </Icosahedron>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.45, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.3, 0.04);
  });
  return <group ref={group}>{children}</group>;
}

export default function Scene() {
  const [count, setCount] = useState(2400);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCount(reduced ? 700 : mobile ? 1000 : 2400);
    setDpr(Math.min(window.devicePixelRatio, mobile ? 1.2 : 1.8));
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={70} color="#8b5cf6" />
      <pointLight position={[-6, -3, 2]} intensity={55} color="#22d3ee" />
      <Rig>
        <Core />
        <Shell />
        <Particles count={count} />
      </Rig>
      <EffectComposer>
        <Bloom intensity={1.15} luminanceThreshold={0.18} luminanceSmoothing={0.45} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
