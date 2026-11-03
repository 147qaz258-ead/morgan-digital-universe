import type { MediaAsset } from "./types";
import type { Locale } from "@/i18n/config";

/**
 * Alt text and captions for the shared media library. The files and dimensions
 * stay single-sourced in project-media.ts; only the words are localized.
 */
const zhMediaCopy: Record<string, { alt: string; caption: string }> = {
  "ai-native-workspace-screen-01": {
    alt: "基于浏览器的硬件设计工作台，画布上是一个来自元件目录的模块。",
    caption: "硬件工作台 / 画布与模块检查器",
  },
  "bci-dexterous-hand-bench-01": {
    alt: "演示台架：信号面板、电子设备、线缆与一只灵巧手。",
    caption: "台架设置 / 信号显示、控制电子与灵巧手",
  },
  "capsule-inspection-event-01": {
    alt: "胶囊检测系统在黑客松展台上公开演示。",
    caption: "黑客松演示 / 系统展示",
  },
  "capsule-inspection-bench-02": {
    alt: "笔记本运行胶囊检测界面，旁边是嵌入式电子与相机装置。",
    caption: "原型台架 / 检测界面与硬件",
  },
  "capsule-inspection-ui-03": {
    alt: "检测应用在笔记本上显示胶囊表面检测结果。",
    caption: "应用视图 / 胶囊表面检测",
  },
  "capsule-inspection-poster-04": {
    alt: "介绍 AI 辅助胶囊检测项目的印刷展板。",
    caption: "项目展板 / 黑客松展示材料",
  },
  "cozmio-screen-01": { alt: "Cozmio 应用界面 01。", caption: "Cozmio / 界面 01" },
  "cozmio-screen-02": { alt: "Cozmio 应用界面 02。", caption: "Cozmio / 界面 02" },
  "cozmio-screen-03": { alt: "Cozmio 应用界面 03。", caption: "Cozmio / 界面 03" },
  "cozmio-screen-04": { alt: "Cozmio 应用界面 04。", caption: "Cozmio / 界面 04" },
  "cozmio-screen-05": { alt: "Cozmio 应用界面 05。", caption: "Cozmio / 界面 05" },
  "cozmio-screen-06": { alt: "Cozmio 应用界面 06。", caption: "Cozmio / 界面 06" },
  "cozmio-screen-07": { alt: "Cozmio 应用界面 07。", caption: "Cozmio / 界面 07" },
  "cozmio-screen-08": { alt: "Cozmio 应用界面 08。", caption: "Cozmio / 界面 08" },
  "cozmio-screen-09": { alt: "Cozmio 应用界面 09。", caption: "Cozmio / 界面 09" },
  "turbo-editor-screen-01": { alt: "鸿蒙应用界面 01。", caption: "鸿蒙 / 应用界面 01" },
  "turbo-editor-screen-02": { alt: "鸿蒙应用界面 02。", caption: "鸿蒙 / 应用界面 02" },
  "turbo-editor-screen-03": { alt: "鸿蒙应用界面 03。", caption: "鸿蒙 / 应用界面 03" },
  "turbo-editor-screen-04": { alt: "鸿蒙应用界面 04。", caption: "鸿蒙 / 应用界面 04" },
  "turbo-editor-screen-05": { alt: "鸿蒙应用界面 05。", caption: "鸿蒙 / 应用界面 05" },
  "turbo-editor-screen-06": { alt: "鸿蒙应用界面 06。", caption: "鸿蒙 / 应用界面 06" },
  "turbo-editor-screen-07": { alt: "鸿蒙应用界面 07。", caption: "鸿蒙 / 应用界面 07" },
  "turbo-editor-screen-08": { alt: "鸿蒙应用界面 08。", caption: "鸿蒙 / 应用界面 08" },
  "youyuan-jingmeng-screen-01": { alt: "游戏项目截图 01。", caption: "游戏 / 项目视图 01" },
  "youyuan-jingmeng-screen-02": { alt: "游戏项目截图 02。", caption: "游戏 / 项目视图 02" },
  "youyuan-jingmeng-screen-03": { alt: "游戏项目截图 03。", caption: "游戏 / 项目视图 03" },
  "youyuan-jingmeng-screen-04": { alt: "游戏项目截图 04。", caption: "游戏 / 项目视图 04" },
  "youyuan-jingmeng-screen-05": { alt: "游戏项目截图 05。", caption: "游戏 / 项目视图 05" },
  "emotional-habitat-app-01": { alt: "情绪栖地项目的移动对话界面。", caption: "移动应用 / 对话界面" },
  "emotional-habitat-event-02": { alt: "抖音 AI 创作计划活动现场的项目展示区。", caption: "现场 / 抖音 AI 创作计划" },
  "tripo-cgi-setup-01": { alt: "Blender 工作区，显示 CG 短片的角色绑定与动画设置。", caption: "Blender / 角色绑定与动画设置" },
  "tripo-cgi-film-video-01": { alt: "一段三十秒的风格化机器人角色 CG 动画。", caption: "渲染序列 / 00:30" },
  "touchsight-prototype-01": { alt: "工位台架上的物理触觉显示装置与机械臂。", caption: "硬件 / 触觉显示台架原型" },
  "touchsight-concept-board-02": { alt: "TouchSight 概念展板，呈现触觉视觉的界面方向。", caption: "概念展板 / 生成式产品视觉" },
  "itec-2026-event-context-01": { alt: "ITEC 2026 现场展台与标识。", caption: "现场 / ITEC 2026" },
};

export function localizeMedia(media: MediaAsset | null, locale: Locale): MediaAsset | null {
  if (!media || locale === "en") return media;
  const override = zhMediaCopy[media.id];
  return override ? { ...media, alt: override.alt, caption: override.caption } : media;
}
