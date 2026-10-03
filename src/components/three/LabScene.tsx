"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { visualTokens } from "@/lib/visual-tokens";

type SceneQuality = "full" | "reduced";

function SystemGraph() {
  const { nodes, edges } = useMemo(() => {
    const nodes: [number, number][] = [
      [-2.1, 0.62], [-1.45, 1.02], [-0.72, 0.5], [0.02, 0.86],
      [0.78, 0.34], [1.48, 0.92], [2.12, 0.48], [-1.7, -0.48],
      [-0.82, -0.74], [0.08, -0.36], [0.92, -0.74], [1.72, -0.38],
    ];
    const pairs = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 6], [2, 8], [3, 9], [4, 10]];
    return {
      nodes,
      edges: new Float32Array(pairs.flatMap(([a, b]) => [...nodes[a], 0, ...nodes[b], 0])),
    };
  }, []);

  return (
    <group position={[0, 2.62, -2.13]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={visualTokens.screenLine} transparent opacity={0.64} />
      </lineSegments>
      {nodes.map(([x, y], index) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.006]}>
          <circleGeometry args={[index % 5 === 0 ? 0.055 : 0.035, 18]} />
          <meshBasicMaterial color={index % 5 === 0 ? visualTokens.signal : visualTokens.screenLine} />
        </mesh>
      ))}
    </group>
  );
}

function AuthoredLabModel({ reducedMotion }: { reducedMotion: boolean }) {
  const gltf = useGLTF("/models/home-lab-scene-model-01.glb");
  const elapsed = useRef(0);
  const { scene, statusMaterials } = useMemo(() => {
    const clone = gltf.scene.clone(true);
    const status: THREE.MeshStandardMaterial[] = [];
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      if (Array.isArray(object.material)) object.material = object.material.map((material) => material.clone());
      else object.material = object.material.clone();
      const meshMaterials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of meshMaterials) {
        if (material.name === "status-orange" && material instanceof THREE.MeshStandardMaterial) status.push(material);
      }
    });
    return { scene: clone, statusMaterials: status };
  }, [gltf.scene]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    elapsed.current += delta;
    statusMaterials.forEach((material, index) => {
      const start = 1.2 + index * 0.24;
      material.emissiveIntensity = elapsed.current > start
        ? 1.2 + Math.sin(elapsed.current * 1.8 + index) * 0.24
        : 0.08;
    });
  });

  return <primitive object={scene} scale={0.88} position={[0, -0.02, 0]} />;
}

function CameraRig({ interactive, reducedMotion }: { interactive: boolean; reducedMotion: boolean }) {
  const elapsed = useRef(0);
  useFrame(({ camera, pointer }, delta) => {
    if (reducedMotion) {
      camera.position.set(7.7, 4.35, 8.8);
      camera.lookAt(0, 1.5, -0.45);
      return;
    }
    elapsed.current += delta;
    const pointerX = interactive ? pointer.x * 0.24 : 0;
    const pointerY = interactive ? pointer.y * 0.1 : 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 7.7 + pointerX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 4.35 + pointerY + Math.sin(elapsed.current * 0.16) * 0.06, 0.035);
    camera.lookAt(0, 1.5, -0.45);
  });
  return null;
}

export default function LabScene({
  quality = "full",
  interactive = true,
  reducedMotion = false,
  onContextLost,
}: {
  quality?: SceneQuality;
  interactive?: boolean;
  reducedMotion?: boolean;
  onContextLost?: () => void;
}) {
  const full = quality === "full";
  return (
    <Canvas
      shadows="basic"
      dpr={full ? [1, 1.6] : [1, 1.25]}
      camera={{ position: [7.7, 4.35, 8.8], fov: 36 }}
      gl={{ antialias: full, powerPreference: "high-performance", alpha: false }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onContextLost?.();
        }, { once: true });
      }}
      aria-hidden
    >
      <color attach="background" args={[visualTokens.backgroundDeep]} />
      <fog attach="fog" args={[visualTokens.backgroundDeep, 12, 24]} />
      <ambientLight color={visualTokens.lightAmbient} intensity={1.05} />
      <hemisphereLight args={[visualTokens.surface, visualTokens.brand, 0.78]} />
      <directionalLight
        position={[6, 10, 7]}
        intensity={2.2}
        color={visualTokens.surface}
        castShadow={full}
        shadow-mapSize={[full ? 1024 : 512, full ? 1024 : 512]}
      />
      <directionalLight position={[-5, 5, -4]} intensity={0.42} color={visualTokens.lightCool} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, 0]} receiveShadow>
        <planeGeometry args={[36, 30]} />
        <meshStandardMaterial color={visualTokens.background} roughness={0.92} />
      </mesh>
      <AuthoredLabModel reducedMotion={reducedMotion} />
      <SystemGraph />
      {full ? <ContactShadows position={[0, 0, 0]} opacity={0.32} scale={17} blur={2.5} far={5} /> : null}
      <CameraRig interactive={interactive} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
