"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { visualTokens } from "@/lib/visual-tokens";

export default function SignalViewport({ src, label, onReady, onError, onClose }: {
  src: string;
  label: string;
  onReady: () => void;
  onError: () => void;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const handlers = useRef({ onReady, onError, onClose });
  useEffect(() => { handlers.current = { onReady, onError, onClose }; }, [onReady, onError, onClose]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      handlers.current.onError();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    node.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(4.4, 3.1, 5.2);
    camera.lookAt(0, 0, 0);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.7;
    room.dispose();
    scene.add(new THREE.HemisphereLight(visualTokens.surface, visualTokens.lightCool, 1));
    const key = new THREE.DirectionalLight(visualTokens.surface, 2);
    key.position.set(5, 6, 4);
    scene.add(key);
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);
    const render = () => { if (!disposed) renderer.render(scene, camera); };
    const resize = new ResizeObserver(() => {
      const { width, height } = node.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    });
    resize.observe(node);
    new GLTFLoader().load(src, (gltf) => {
      if (disposed) {
        gltf.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
          }
        });
        return;
      }
      const bounds = new THREE.Box3().setFromObject(gltf.scene);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const scale = 3.3 / Math.max(size.x, size.y, size.z);
      gltf.scene.position.sub(center);
      const holder = new THREE.Group();
      holder.add(gltf.scene);
      holder.scale.setScalar(scale);
      modelRoot.add(holder);
      render();
      handlers.current.onReady();
      node.focus({ preventScroll: true });
    }, undefined, () => { if (!disposed) handlers.current.onError(); });
    let dragging = false;
    let previousX = 0;
    const down = (event: PointerEvent) => {
      dragging = true;
      previousX = event.clientX;
      node.setPointerCapture(event.pointerId);
      node.focus({ preventScroll: true });
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      modelRoot.rotation.y += (event.clientX - previousX) * 0.008;
      previousX = event.clientX;
      render();
    };
    const up = () => { dragging = false; };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") handlers.current.onClose();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        modelRoot.rotation.y += event.key === "ArrowLeft" ? -0.18 : 0.18;
        render();
      }
    };
    const lost = (event: Event) => { event.preventDefault(); handlers.current.onError(); };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    node.addEventListener("pointerdown", down);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
    node.addEventListener("pointercancel", up);
    node.addEventListener("keydown", keyboard);
    return () => {
      disposed = true;
      resize.disconnect();
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      node.removeEventListener("pointercancel", up);
      node.removeEventListener("keydown", keyboard);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
        }
      });
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [src]);
  return <div ref={root} role="img" aria-label={label} tabIndex={0} className="signal-webgl" />;
}
