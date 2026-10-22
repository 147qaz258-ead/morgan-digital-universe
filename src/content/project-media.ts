import type { MediaAsset } from "./types";

function image(
  id: string,
  src: string,
  alt: string,
  width: number,
  height: number,
  caption: string,
): MediaAsset {
  return {
    id,
    src,
    kind: "image",
    alt,
    width,
    height,
    aspectRatio: `${width}/${height}`,
    caption,
    provenance: "user-evidence",
    status: "ready",
  };
}

function video(id: string, src: string, poster: string, alt: string, caption: string): MediaAsset {
  return {
    id,
    src,
    kind: "video",
    alt,
    width: 1280,
    height: 720,
    aspectRatio: "16/9",
    poster,
    caption,
    provenance: "user-evidence",
    status: "ready",
  };
}

export const projectMedia = {
  aiNativeHardwareWorkspace: [
    image(
      "ai-native-workspace-screen-01",
      "/images/projects/ai-native-hardware-workspace/ai-native-workspace-01.webp",
      "Browser-based hardware design workspace showing a catalog-backed module on the canvas.",
      1440,
      900,
      "Hardware workspace / canvas and module inspector",
    ),
  ],
  bciDexterousHand: [
    image(
      "bci-dexterous-hand-bench-01",
      "/images/projects/bci-dexterous-hand/bci-dexterous-hand-01.webp",
      "Demonstration bench with a signal dashboard, electronics, cables, and a dexterous hand.",
      1703,
      1280,
      "Bench setup / signal display, control electronics, and dexterous hand",
    ),
  ],
  capsuleSurfaceInspection: [
    image(
      "capsule-inspection-event-01",
      "/images/projects/capsule-surface-inspection/capsule-surface-inspection-01.webp",
      "Capsule inspection system being presented at a public hackathon table.",
      1600,
      1068,
      "Hackathon demo / system presentation",
    ),
    image(
      "capsule-inspection-bench-02",
      "/images/projects/capsule-surface-inspection/capsule-surface-inspection-02.webp",
      "Laptop running a capsule inspection interface beside embedded electronics and a camera setup.",
      1703,
      1280,
      "Prototype bench / inspection interface and hardware",
    ),
    image(
      "capsule-inspection-ui-03",
      "/images/projects/capsule-surface-inspection/capsule-surface-inspection-03.webp",
      "Inspection application displaying capsule surface detections on a laptop.",
      1703,
      1280,
      "Application view / capsule surface inspection",
    ),
    image(
      "capsule-inspection-poster-04",
      "/images/projects/capsule-surface-inspection/capsule-surface-inspection-04.webp",
      "Printed presentation board describing an AI-assisted capsule inspection project.",
      1279,
      1704,
      "Project board / hackathon presentation material",
    ),
  ],
  cozmio: [
    image("cozmio-screen-01", "/images/projects/cozmio/cozmio-01.webp", "Cozmio application screen 01.", 1918, 1068, "Cozmio / interface view 01"),
    image("cozmio-screen-02", "/images/projects/cozmio/cozmio-02.webp", "Cozmio application screen 02.", 1908, 1078, "Cozmio / interface view 02"),
    image("cozmio-screen-03", "/images/projects/cozmio/cozmio-03.webp", "Cozmio application screen 03.", 1915, 1078, "Cozmio / interface view 03"),
    image("cozmio-screen-04", "/images/projects/cozmio/cozmio-04.webp", "Cozmio application screen 04.", 1913, 1056, "Cozmio / interface view 04"),
    image("cozmio-screen-05", "/images/projects/cozmio/cozmio-05.webp", "Cozmio application screen 05.", 1918, 1078, "Cozmio / interface view 05"),
    image("cozmio-screen-06", "/images/projects/cozmio/cozmio-06.webp", "Cozmio application screen 06.", 1918, 1078, "Cozmio / interface view 06"),
    image("cozmio-screen-07", "/images/projects/cozmio/cozmio-07.webp", "Cozmio application screen 07.", 1918, 1078, "Cozmio / interface view 07"),
    image("cozmio-screen-08", "/images/projects/cozmio/cozmio-08.webp", "Cozmio application screen 08.", 1918, 1078, "Cozmio / interface view 08"),
    image("cozmio-screen-09", "/images/projects/cozmio/cozmio-09.webp", "Cozmio application screen 09.", 1915, 1072, "Cozmio / interface view 09"),
  ],
  turboEditor: [
    image("turbo-editor-screen-01", "/images/projects/turbo-editor/turbo-editor-01.webp", "HarmonyOS application screen 01.", 1316, 2832, "HarmonyOS / application view 01"),
    image("turbo-editor-screen-02", "/images/projects/turbo-editor/turbo-editor-02.webp", "HarmonyOS application screen 02.", 720, 1280, "HarmonyOS / application view 02"),
    image("turbo-editor-screen-03", "/images/projects/turbo-editor/turbo-editor-03.webp", "HarmonyOS application screen 03.", 720, 1280, "HarmonyOS / application view 03"),
    image("turbo-editor-screen-04", "/images/projects/turbo-editor/turbo-editor-04.webp", "HarmonyOS application screen 04.", 720, 1280, "HarmonyOS / application view 04"),
    image("turbo-editor-screen-05", "/images/projects/turbo-editor/turbo-editor-05.webp", "HarmonyOS application screen 05.", 1316, 2832, "HarmonyOS / application view 05"),
    image("turbo-editor-screen-06", "/images/projects/turbo-editor/turbo-editor-06.webp", "HarmonyOS application screen 06.", 720, 1280, "HarmonyOS / application view 06"),
    image("turbo-editor-screen-07", "/images/projects/turbo-editor/turbo-editor-07.webp", "HarmonyOS application screen 07.", 720, 1280, "HarmonyOS / application view 07"),
    image("turbo-editor-screen-08", "/images/projects/turbo-editor/turbo-editor-08.webp", "HarmonyOS application screen 08.", 1316, 2832, "HarmonyOS / application view 08"),
  ],
  youyuanJingmeng: [
    image("youyuan-jingmeng-screen-01", "/images/projects/youyuan-jingmeng/youyuan-jingmeng-01.webp", "Game project capture 01.", 1907, 1052, "Game / project view 01"),
    image("youyuan-jingmeng-screen-02", "/images/projects/youyuan-jingmeng/youyuan-jingmeng-02.webp", "Game project capture 02.", 1917, 1078, "Game / project view 02"),
    image("youyuan-jingmeng-screen-03", "/images/projects/youyuan-jingmeng/youyuan-jingmeng-03.webp", "Game project capture 03.", 1917, 1078, "Game / project view 03"),
    image("youyuan-jingmeng-screen-04", "/images/projects/youyuan-jingmeng/youyuan-jingmeng-04.webp", "Game project capture 04.", 1903, 1012, "Game / project view 04"),
    image("youyuan-jingmeng-screen-05", "/images/projects/youyuan-jingmeng/youyuan-jingmeng-05.webp", "Game project capture 05.", 1917, 950, "Game / project view 05"),
  ],
  emotionalHabitat: [
    image(
      "emotional-habitat-app-01",
      "/images/projects/emotional-habitat/emotional-habitat-01.webp",
      "Mobile conversational interface for the Emotional Habitat project.",
      451,
      1014,
      "Mobile app / conversation interface",
    ),
    image(
      "emotional-habitat-event-02",
      "/images/projects/emotional-habitat/emotional-habitat-02.webp",
      "Project presentation area at a Douyin AI Innovation Plan event.",
      1881,
      1280,
      "Event context / Douyin AI Innovation Plan",
    ),
  ],
  tripoCgiFilm: [
    image(
      "tripo-cgi-setup-01",
      "/images/projects/tripo-cgi-film/tripo-cgi-film-01.webp",
      "Blender workspace showing the character rig and animation setup for a CGI film.",
      1887,
      1078,
      "Blender / character rig and animation setup",
    ),
    video(
      "tripo-cgi-film-video-01",
      "/video/tripo-cgi-film-01.mp4",
      "/posters/tripo-cgi-film-poster-01.webp",
      "Thirty-second CGI animation of a stylized robot character.",
      "Rendered CGI sequence / 00:30",
    ),
  ],
  touchSight: [
    image(
      "touchsight-prototype-01",
      "/images/projects/touchsight/touchsight-01.webp",
      "Physical tactile display apparatus and articulated robot on a workshop bench.",
      1919,
      1080,
      "Hardware / tactile display bench prototype",
    ),
    image(
      "touchsight-concept-board-02",
      "/images/projects/touchsight/touchsight-02.webp",
      "TouchSight concept board presenting a tactile-vision interface direction.",
      1086,
      1448,
      "Concept board / generated product visualization",
    ),
  ],
  itecFieldNote: [
    image(
      "itec-2026-event-context-01",
      "/images/projects/field-notes/field-notes-01.webp",
      "ITEC 2026 event display and signage.",
      1920,
      1280,
      "Event context / ITEC 2026",
    ),
  ],
} satisfies Record<string, MediaAsset[]>;
