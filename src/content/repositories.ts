import type { Locale } from "@/i18n/config";

export interface PublicRepository {
  name: string;
  description: string | null;
}

interface RepositoryRecord {
  name: string;
  description: string | null;
  descriptionZh: string | null;
}

/** Full public GitHub source index captured from the owner's public account. */
const repositoryRecords: RepositoryRecord[] = [
  { name: "morgan-digital-universe", description: "Source repository for this personal website.", descriptionZh: "这个个人网站的源码仓库。" },
  { name: "insta360-hackathon", description: "Tactile-vision and multisensory imaging project.", descriptionZh: "触觉视觉与多感官成像项目。" },
  { name: "capsule-defect-detection", description: "AI-assisted capsule surface inspection with an edge-hardware demo.", descriptionZh: "AI 辅助的胶囊表面检测与边缘硬件演示。" },
  { name: "h2link-sales-agent", description: "Sales-agent product for the H2-Link project.", descriptionZh: "H2-Link 项目的销售 Agent 产品。" },
  { name: "physical-task-agent", description: "Evidence-backed agent for building, checking, debugging, and learning physical tasks.", descriptionZh: "面向物理任务构建、检查、调试与学习的证据驱动 Agent。" },
  { name: "turbo-editor", description: "HarmonyOS code editor with file management and preview tools.", descriptionZh: "鸿蒙代码编辑器，带文件管理与预览工具。" },
  { name: "cozmio-tutor", description: "Real-time voice AI tutor prototype.", descriptionZh: "实时语音 AI 家教原型。" },
  { name: "plc-ai-agent", description: "Natural-language workflow for generating and reviewing PLC code.", descriptionZh: "用自然语言生成与审查 PLC 代码的工作流。" },
  { name: "Imagine-Calendar", description: "Career-planning calendar for university students.", descriptionZh: "面向大学生的职业规划日历。" },
  { name: "neo-flashcards", description: "HarmonyOS flashcards with study games and vocabulary packs.", descriptionZh: "鸿蒙单词卡，带学习游戏与词包。" },
  { name: "prompt-gallery", description: "HarmonyOS prompt gallery for generative-image workflows.", descriptionZh: "鸿蒙提示词库，面向生成式图像工作流。" },
  { name: "ericyuan", description: null, descriptionZh: null },
  { name: "superpowers-promptified", description: null, descriptionZh: null },
  { name: "Sound-and-light", description: null, descriptionZh: null },
  { name: "Vision", description: null, descriptionZh: null },
  { name: "cozmio", description: "Cozmio agent-workspace source.", descriptionZh: "Cozmio Agent 工作台源码。" },
  { name: "agent-engineering-skills", description: null, descriptionZh: null },
  { name: "erciyuan", description: null, descriptionZh: null },
  { name: "cozmio-web", description: "Cozmio web application source.", descriptionZh: "Cozmio Web 应用源码。" },
  { name: "leizi-meme", description: null, descriptionZh: null },
  { name: "agentskill", description: null, descriptionZh: null },
  { name: "Pulseclaw", description: null, descriptionZh: null },
  { name: "claw", description: null, descriptionZh: null },
  { name: "Deleteclaw", description: null, descriptionZh: null },
  { name: "openower-windous", description: null, descriptionZh: null },
  { name: "cozmio-releases", description: "Cozmio release artifacts and distribution source.", descriptionZh: "Cozmio 发布产物与分发源码。" },
  { name: "AEP", description: null, descriptionZh: null },
  { name: "skill", description: null, descriptionZh: null },
  { name: "skill--", description: null, descriptionZh: null },
  { name: "opencode-ref", description: null, descriptionZh: null },
  { name: "NextIO", description: null, descriptionZh: null },
  { name: "wechat", description: null, descriptionZh: null },
  { name: "Cover", description: null, descriptionZh: null },
  { name: "youtube", description: "AI-assisted analysis of pain points in YouTube comments.", descriptionZh: "针对 YouTube 评论痛点的 AI 辅助分析。" },
  { name: "Prompt-word-manager", description: "Chrome extension for organizing and reusing AI prompts.", descriptionZh: "整理与复用 AI 提示词的 Chrome 扩展。" },
  { name: "my.github.io", description: "GitHub Pages site source.", descriptionZh: "GitHub Pages 站点源码。" },
  { name: "-1", description: "Website-navigation experiment.", descriptionZh: "网站导航实验。" },
  { name: "ai-1", description: null, descriptionZh: null },
  { name: "lend", description: null, descriptionZh: null },
  { name: "lendai", description: null, descriptionZh: null },
];

export function getPublicRepositories(locale: Locale): PublicRepository[] {
  return repositoryRecords.map(({ name, description, descriptionZh }) => ({
    name,
    description: locale === "zh" ? descriptionZh : description,
  }));
}

export const publicRepositories: PublicRepository[] = getPublicRepositories("en");

export const repositoryUrl = (name: string) => `https://github.com/147qaz258-ead/${name}`;
