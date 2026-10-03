import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

class NodeFileReader {
  result = null;
  onloadend = null;
  onerror = null;

  readAsArrayBuffer(blob) {
    blob.arrayBuffer()
      .then((buffer) => {
        this.result = buffer;
        this.onloadend?.({ target: this });
      })
      .catch((error) => this.onerror?.(error));
  }

  readAsDataURL(blob) {
    blob.arrayBuffer()
      .then((buffer) => {
        const base64 = Buffer.from(buffer).toString("base64");
        this.result = `data:${blob.type};base64,${base64}`;
        this.onloadend?.({ target: this });
      })
      .catch((error) => this.onerror?.(error));
  }
}

globalThis.FileReader = NodeFileReader;

const palette = {
  white: 0xf2f3f5,
  silver: 0xb9c0c9,
  darkSilver: 0x778291,
  navy: 0x102a43,
  navyDark: 0x081727,
  orange: 0xff6b2c,
  glass: 0xdce6ef,
};

const materials = {
  ceramic: new THREE.MeshStandardMaterial({ name: "ceramic-white", color: palette.white, roughness: 0.46, metalness: 0.06 }),
  silver: new THREE.MeshStandardMaterial({ name: "brushed-silver", color: palette.silver, roughness: 0.28, metalness: 0.82 }),
  darkSilver: new THREE.MeshStandardMaterial({ name: "dark-silver", color: palette.darkSilver, roughness: 0.32, metalness: 0.72 }),
  navy: new THREE.MeshStandardMaterial({ name: "anodized-navy", color: palette.navy, roughness: 0.34, metalness: 0.44 }),
  screen: new THREE.MeshStandardMaterial({ name: "screen-navy", color: palette.navyDark, roughness: 0.24, metalness: 0.18, emissive: palette.navyDark, emissiveIntensity: 0.45 }),
  orange: new THREE.MeshStandardMaterial({ name: "status-orange", color: palette.orange, roughness: 0.25, metalness: 0.25, emissive: palette.orange, emissiveIntensity: 1.1 }),
  glass: new THREE.MeshPhysicalMaterial({ name: "frosted-glass", color: palette.glass, roughness: 0.2, metalness: 0.05, transparent: true, opacity: 0.72 }),
};

function roundedBox(parent, name, size, position, material, radius = 0.06, rotation = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(size[0], size[1], size[2], 4, radius), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  parent.add(mesh);
  return mesh;
}

function cylinder(parent, name, radius, depth, position, material, rotation = [0, 0, 0], segments = 32) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, segments), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  parent.add(mesh);
  return mesh;
}

function sphere(parent, name, radius, position, material, segments = 28) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, Math.max(16, segments / 2)), material);
  mesh.name = name;
  mesh.position.set(...position);
  parent.add(mesh);
  return mesh;
}

function createWorkbench(root) {
  const group = new THREE.Group();
  group.name = "workstation";
  roundedBox(group, "bench-top", [5.5, 0.16, 2.15], [0, 1.08, 0], materials.ceramic, 0.07);
  roundedBox(group, "bench-core", [3.3, 0.42, 1.2], [0, 0.82, 0.06], materials.navy, 0.08);
  for (const x of [-2.35, 2.35]) {
    roundedBox(group, `bench-leg-${x}`, [0.18, 1.08, 1.65], [x, 0.52, 0], materials.silver, 0.045);
    roundedBox(group, `bench-foot-${x}`, [0.72, 0.09, 1.82], [x, 0.045, 0], materials.darkSilver, 0.035);
  }
  for (const [x, yaw] of [[-0.72, 0.13], [0.72, -0.13]]) {
    const monitor = new THREE.Group();
    monitor.position.set(x, 1.72, -0.16);
    monitor.rotation.y = yaw;
    roundedBox(monitor, "monitor-frame", [1.2, 0.77, 0.065], [0, 0, 0], materials.navy, 0.055);
    roundedBox(monitor, "monitor-panel", [1.08, 0.65, 0.016], [0, 0, 0.041], materials.glass, 0.035);
    roundedBox(monitor, "monitor-line-a", [0.5, 0.035, 0.012], [-0.18, 0.13, 0.054], materials.navy, 0.012);
    roundedBox(monitor, "monitor-line-b", [0.34, 0.035, 0.012], [-0.26, 0.02, 0.054], materials.orange, 0.012);
    roundedBox(monitor, "monitor-line-c", [0.62, 0.035, 0.012], [-0.12, -0.1, 0.054], materials.darkSilver, 0.012);
    cylinder(monitor, "monitor-neck", 0.045, 0.38, [0, -0.55, 0], materials.silver);
    roundedBox(monitor, "monitor-base", [0.52, 0.045, 0.3], [0, -0.75, 0.06], materials.silver, 0.025);
    group.add(monitor);
  }
  roundedBox(group, "compute-module", [0.42, 0.72, 0.62], [1.72, 1.48, 0.1], materials.navy, 0.07);
  roundedBox(group, "compute-vent", [0.12, 0.42, 0.016], [1.72, 1.5, 0.42], materials.darkSilver, 0.015);
  sphere(group, "compute-status", 0.036, [1.72, 1.72, 0.43], materials.orange, 20);
  root.add(group);
}

function createRobotArm(root) {
  const group = new THREE.Group();
  group.name = "robotic-arm";
  group.position.set(-3.0, 0, 0.28);
  cylinder(group, "arm-base", 0.42, 0.24, [0, 0.12, 0], materials.darkSilver);
  cylinder(group, "arm-turntable", 0.29, 0.22, [0, 0.34, 0], materials.navy);
  sphere(group, "arm-joint-01", 0.2, [0, 0.5, 0], materials.silver);
  roundedBox(group, "arm-link-01", [0.25, 1.18, 0.29], [-0.22, 1.08, 0], materials.ceramic, 0.11, [0, 0, -0.36]);
  sphere(group, "arm-joint-02", 0.21, [-0.43, 1.64, 0], materials.navy);
  roundedBox(group, "arm-link-02", [0.22, 1.02, 0.26], [-0.12, 2.04, 0], materials.ceramic, 0.1, [0, 0, 0.7]);
  sphere(group, "arm-joint-03", 0.17, [0.2, 2.42, 0], materials.silver);
  roundedBox(group, "arm-wrist", [0.18, 0.58, 0.2], [0.42, 2.62, 0], materials.darkSilver, 0.08, [0, 0, 0.82]);
  sphere(group, "arm-status", 0.045, [-0.53, 1.64, 0.17], materials.orange, 20);
  const palm = new THREE.Group();
  palm.name = "dexterous-hand";
  palm.position.set(0.72, 2.86, 0);
  palm.rotation.z = -0.17;
  roundedBox(palm, "hand-palm", [0.34, 0.4, 0.16], [0, 0, 0], materials.ceramic, 0.07);
  for (let i = 0; i < 4; i += 1) {
    const z = -0.12 + i * 0.08;
    roundedBox(palm, `finger-${i}-a`, [0.11, 0.28, 0.065], [0.02 + i * 0.025, 0.32, z], materials.silver, 0.03, [0, 0, -0.08 + i * 0.035]);
    roundedBox(palm, `finger-${i}-b`, [0.09, 0.24, 0.055], [0.08 + i * 0.035, 0.55, z], materials.ceramic, 0.025, [0, 0, -0.2 + i * 0.04]);
  }
  roundedBox(palm, "thumb", [0.1, 0.34, 0.075], [-0.2, 0.14, 0.02], materials.silver, 0.03, [0.3, 0.2, 0.82]);
  group.add(palm);
  root.add(group);
}

function createInstrumentCluster(root) {
  const group = new THREE.Group();
  group.name = "embedded-instrument-cluster";
  group.position.set(3.05, 0, 0.16);
  roundedBox(group, "instrument-shell", [1.15, 1.06, 0.8], [0, 0.56, 0], materials.silver, 0.12);
  roundedBox(group, "instrument-face", [0.9, 0.66, 0.035], [0, 0.66, 0.42], materials.navy, 0.05);
  roundedBox(group, "instrument-screen", [0.56, 0.28, 0.018], [-0.1, 0.78, 0.445], materials.screen, 0.025);
  roundedBox(group, "instrument-signal", [0.34, 0.025, 0.012], [-0.16, 0.78, 0.457], materials.orange, 0.01, [0, 0, -0.08]);
  for (const x of [-0.28, 0, 0.28]) cylinder(group, `instrument-dial-${x}`, 0.07, 0.045, [x, 0.4, 0.45], materials.darkSilver, [Math.PI / 2, 0, 0], 24);
  sphere(group, "instrument-status", 0.035, [0.43, 0.29, 0.45], materials.orange, 18);

  const board = new THREE.Group();
  board.name = "concept-control-board";
  board.position.set(-0.95, 1.05, 0.06);
  board.rotation.set(-0.16, 0.12, -0.22);
  roundedBox(board, "board-substrate", [1.0, 0.055, 0.68], [0, 0, 0], materials.navy, 0.045);
  roundedBox(board, "board-main-chip", [0.28, 0.075, 0.24], [0.08, 0.07, 0], materials.screen, 0.025);
  for (const [x, z, w] of [[-0.3, -0.18, 0.22], [-0.28, 0.14, 0.18], [0.34, -0.16, 0.16], [0.34, 0.18, 0.22]]) {
    roundedBox(board, `board-component-${x}-${z}`, [w, 0.07, 0.1], [x, 0.065, z], materials.silver, 0.018);
  }
  for (let i = 0; i < 7; i += 1) {
    roundedBox(board, `board-trace-${i}`, [0.48 - i * 0.035, 0.01, 0.014], [-0.04 + i * 0.02, 0.068, -0.27 + i * 0.08], i === 4 ? materials.orange : materials.darkSilver, 0.004);
  }
  group.add(board);
  root.add(group);
}

function createBackplane(root) {
  const group = new THREE.Group();
  group.name = "systems-backplane";
  group.position.set(0, 2.6, -2.25);
  roundedBox(group, "screen-frame", [6.5, 3.25, 0.16], [0, 0, 0], materials.silver, 0.12);
  roundedBox(group, "screen-surface", [6.18, 2.93, 0.035], [0, 0, 0.1], materials.screen, 0.08);
  for (const x of [-2.1, -0.7, 0.7, 2.1]) {
    roundedBox(group, `screen-rail-${x}`, [0.012, 2.45, 0.012], [x, 0, 0.123], materials.darkSilver, 0.004);
  }
  root.add(group);

  for (const x of [-4.5, 4.5]) {
    const pylon = new THREE.Group();
    pylon.name = `architecture-pylon-${x}`;
    roundedBox(pylon, "pylon", [0.22, 4.6, 0.34], [x, 2.3, -2.52], materials.silver, 0.06);
    for (let i = 0; i < 4; i += 1) roundedBox(pylon, `pylon-notch-${i}`, [0.34, 0.1, 0.44], [x, 0.72 + i * 1.04, -2.5], materials.navy, 0.025);
    root.add(pylon);
  }
}

const scene = new THREE.Scene();
scene.name = "MORGAN-DIGITAL-UNIVERSE-LAB";
createWorkbench(scene);
createRobotArm(scene);
createInstrumentCluster(scene);
createBackplane(scene);
scene.traverse((object) => {
  if (object.isMesh) {
    object.castShadow = true;
    object.receiveShadow = true;
  }
});

const exporter = new GLTFExporter();
const result = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  trs: false,
  maxTextureSize: 1024,
});

const outputPath = path.resolve("public/models/home-lab-scene-model-01.glb");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, Buffer.from(result));
console.log(`Wrote ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
