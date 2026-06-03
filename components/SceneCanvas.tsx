"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generates smooth floaty particles that move slowly with scroll parallax
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1; // z-axis spread
      spd[i] = 0.15 + Math.random() * 0.35;
    }
    return [pos, spd];
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;
    
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 1;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    const time = clock.getElapsedTime();
    const posAttr = points.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      const initialY = positions[yIdx];
      // Slow background float + push with scroll
      posArray[yIdx] = initialY + Math.sin(time * 0.18 + i) * 0.12 - progress * 1.8 * speeds[i];
    }
    posAttr.needsUpdate = true;
    points.rotation.y = time * 0.012;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8a35c"
        size={0.035}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Controls three.js camera position/rotation relative to scroll depth
function ScrollControlledCamera() {
  useFrame((state) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 1;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Slowly dolly forward on scroll (decrease Z)
    const targetZ = 5.2 - progress * 1.8;

    // Piecewise camera panning paths to keep the composition dynamic
    let targetX = 0;
    let targetY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    if (progress < 0.2) {
      const t = progress / 0.2;
      targetX = THREE.MathUtils.lerp(0, -0.35, t);
      targetY = THREE.MathUtils.lerp(0, 0.12, t);
      targetRotY = THREE.MathUtils.lerp(0, 0.04, t);
    } else if (progress < 0.4) {
      const t = (progress - 0.2) / 0.2;
      targetX = THREE.MathUtils.lerp(-0.35, 0.35, t);
      targetY = THREE.MathUtils.lerp(0.12, -0.12, t);
      targetRotY = THREE.MathUtils.lerp(0.04, -0.04, t);
    } else if (progress < 0.6) {
      const t = (progress - 0.4) / 0.2;
      targetX = THREE.MathUtils.lerp(0.35, 0, t);
      targetY = THREE.MathUtils.lerp(-0.12, 0.2, t);
      targetRotY = THREE.MathUtils.lerp(-0.04, 0.01, t);
    } else if (progress < 0.8) {
      const t = (progress - 0.6) / 0.2;
      targetX = THREE.MathUtils.lerp(0, -0.3, t);
      targetY = THREE.MathUtils.lerp(0.2, -0.15, t);
      targetRotY = THREE.MathUtils.lerp(0.01, 0.05, t);
      targetRotX = THREE.MathUtils.lerp(0, -0.02, t);
    } else {
      const t = (progress - 0.8) / 0.2;
      targetX = THREE.MathUtils.lerp(-0.3, 0, t);
      targetY = THREE.MathUtils.lerp(-0.15, 0, t);
      targetRotY = THREE.MathUtils.lerp(0.05, 0, t);
      targetRotX = THREE.MathUtils.lerp(-0.02, 0, t);
    }

    // Gentle cursor parallax
    const pointer = state.pointer;
    targetX += pointer.x * 0.12;
    targetY += pointer.y * 0.08;
    targetRotY += pointer.x * 0.025;
    targetRotX += -pointer.y * 0.018;

    // Dampen using linear interpolation
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);

    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, targetRotY, 0.05);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotX, 0.05);
  });

  return null;
}

export default function SceneCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-75" aria-hidden="true">
      <Canvas
        fallback={
          <div className="absolute right-[8vw] top-[28vh] h-44 w-64 border border-champagne/20" />
        }
        camera={{ position: [0, 0, 5.2], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.0} />
        <pointLight position={[-4, 2, 3]} intensity={0.6} />
        
        <FloatingParticles />
        <ScrollControlledCamera />
      </Canvas>
    </div>
  );
}
