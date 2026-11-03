import type { Locale } from "@/i18n/config";

const en = {
  home: {
    eyebrow: "MORGAN / DIGITAL LAB",
    headline: "Building AI Systems That Enter the Physical World.",
    supporting: "Moving intelligence from screens into the physical world.",
    featuredLabel: "Flagship experiments",
    featuredTitle: "Systems that cross the boundary.",
    featuredBody:
      "Selected systems spanning AI interfaces, embedded hardware, robotics, software, interactive worlds, and digital media.",
    originLabel: "System trajectory",
    originTitle: "Digital systems, intelligence, hardware, physical action.",
    evidenceLabel: "Evidence status",
    evidenceTitle: "Real work, shown in its working context.",
    evidencePending:
      "Project photographs, software screens, physical prototypes, and concept films are kept distinct and shown with their context.",
    publicationPending: "This record is being expanded with additional project context.",
    focusLabel: "Current focus",
    focusTitle: "Active lines of work",
  },
  experiments: {
    eyebrow: "Experiments",
    title: "Proof, not promises.",
    intro: "A complete working archive across hardware, AI, robotics, software, games, and digital media.",
    archivePending: "Project records appear here with the media and source material available for each one.",
  },
  origin: {
    eyebrow: "Origin",
    title: "From Digital Systems to Physical Intelligence.",
    intro: "A compact map of how software, intelligence, hardware, and robotics became one direction.",
    timelinePending:
      "The four-stage direction remains visible above. Year markers will appear only after the underlying dates are confirmed for publication.",
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "Capabilities linked to proof.",
    intro: "No percentages. Every capability points to the experiment where it is being used.",
  },
  lab: {
    eyebrow: "Lab",
    title: "The working process.",
    intro: "Failures, prototypes, equipment, and notes — documented only when the records are real.",
    empty: "The lab index will collect working notes and field material as they are added.",
  },
  vision: {
    eyebrow: "Vision",
    title: "Where this is going.",
    intro: "A direction expressed through working prototypes, not fixed-year promises.",
  },
  about: {
    eyebrow: "About",
    title: "Morgan.",
    intro: "Building across AI, robotics, hardware, and physical systems.",
    sections: [
      { label: "Who I am", body: "A builder connecting software intelligence with real devices and machines." },
      {
        label: "What I care about",
        body: "Working prototypes, observable behaviour, and evidence that survives contact with reality.",
      },
      { label: "How I work", body: "Frame the problem, build the system, test the edge cases, and document what changed." },
      { label: "Open to", body: "Conversations and collaborations around AI-native hardware, robotics, and physical AI." },
    ],
  },
  notFound: {
    eyebrow: "Navigation fault / 404",
    title: "This coordinate is outside the system.",
    body: "Return to the main interface or continue through the experiment index.",
  },
};

const zh: typeof en = {
  home: {
    eyebrow: "MORGAN / DIGITAL LAB",
    headline: "造能进入物理世界的 AI 系统。",
    supporting: "把智能从屏幕里挪进物理世界。",
    featuredLabel: "旗舰实验",
    featuredTitle: "跨过那条边界的东西。",
    featuredBody: "覆盖 AI 界面、嵌入式硬件、机器人、软件、交互世界与数字影像的若干系统。",
    originLabel: "系统轨迹",
    originTitle: "数字系统、智能、硬件、物理动作。",
    evidenceLabel: "证据状态",
    evidenceTitle: "真做过的事，连它被做的现场一起放出来。",
    evidencePending: "项目照片、软件界面、硬件原型与概念影片分开对待，各自带上下文展示。",
    publicationPending: "这条记录还在补充项目上下文。",
    focusLabel: "当前焦点",
    focusTitle: "在推进的方向",
  },
  experiments: {
    eyebrow: "实验",
    title: "证据，不是承诺。",
    intro: "一份完整的工作档案：硬件、AI、机器人、软件、游戏与数字影像。",
    archivePending: "项目记录会连同各自可用的素材与源码材料一起出现在这里。",
  },
  origin: {
    eyebrow: "来源",
    title: "从数字系统到物理智能。",
    intro: "软件、智能、硬件与机器人，如何走到同一条路上。",
    timelinePending: "四阶段方向在上方照常展示。年份只在这些日期确认可公开之后才出现。",
  },
  capabilities: {
    eyebrow: "能力",
    title: "能力都挂到证据上。",
    intro: "不写百分比。每项能力都指向它正在被使用的那个实验。",
  },
  lab: {
    eyebrow: "实验室",
    title: "工作过程。",
    intro: "失败、原型、设备与笔记——只有记录真实存在时才写进来。",
    empty: "实验室索引会随着工作笔记与现场材料陆续补全。",
  },
  vision: {
    eyebrow: "愿景",
    title: "这个方向要去哪。",
    intro: "用跑得起来的原型表达方向，不用年份承诺。",
  },
  about: {
    eyebrow: "关于",
    title: "Morgan。",
    intro: "在 AI、机器人、硬件与物理系统之间做东西。",
    sections: [
      { label: "我是谁", body: "一个把软件智能接到真实设备与机器上的构建者。" },
      { label: "我在意什么", body: "跑得起来的原型、看得见的行为，以及经得起现实检验的证据。" },
      { label: "我怎么做", body: "先把问题界定清楚，再把系统搭出来，测边界情况，记录改了什么。" },
      { label: "可以聊什么", body: "AI 原生硬件、机器人、物理 AI 方向的交流与合作。" },
    ],
  },
  notFound: {
    eyebrow: "导航故障 / 404",
    title: "这个坐标不在系统里。",
    body: "回到主界面，或从项目索引继续。",
  },
};

export const pageCopyByLocale: Record<Locale, typeof en> = { en, zh };

export function getPageCopy(locale: Locale) {
  return pageCopyByLocale[locale];
}
