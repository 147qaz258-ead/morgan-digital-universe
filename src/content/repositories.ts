export interface PublicRepository {
  name: string;
  description: string | null;
}

/** Full public GitHub source index captured from the owner's public account. */
export const publicRepositories: PublicRepository[] = [
  { name: "morgan-digital-universe", description: "Source repository for this personal website." },
  { name: "insta360-hackathon", description: "Tactile-vision and multisensory imaging project." },
  { name: "capsule-defect-detection", description: "AI-assisted capsule surface inspection with an edge-hardware demo." },
  { name: "h2link-sales-agent", description: "Sales-agent product for the H2-Link project." },
  { name: "physical-task-agent", description: "Evidence-backed agent for building, checking, debugging, and learning physical tasks." },
  { name: "turbo-editor", description: "HarmonyOS code editor with file management and preview tools." },
  { name: "cozmio-tutor", description: "Real-time voice AI tutor prototype." },
  { name: "plc-ai-agent", description: "Natural-language workflow for generating and reviewing PLC code." },
  { name: "Imagine-Calendar", description: "Career-planning calendar for university students." },
  { name: "neo-flashcards", description: "HarmonyOS flashcards with study games and vocabulary packs." },
  { name: "prompt-gallery", description: "HarmonyOS prompt gallery for generative-image workflows." },
  { name: "ericyuan", description: null },
  { name: "superpowers-promptified", description: null },
  { name: "Sound-and-light", description: null },
  { name: "Vision", description: null },
  { name: "cozmio", description: "Cozmio agent-workspace source." },
  { name: "agent-engineering-skills", description: null },
  { name: "erciyuan", description: null },
  { name: "cozmio-web", description: "Cozmio web application source." },
  { name: "leizi-meme", description: null },
  { name: "agentskill", description: null },
  { name: "Pulseclaw", description: null },
  { name: "claw", description: null },
  { name: "Deleteclaw", description: null },
  { name: "openower-windous", description: null },
  { name: "cozmio-releases", description: "Cozmio release artifacts and distribution source." },
  { name: "AEP", description: null },
  { name: "skill", description: null },
  { name: "skill--", description: null },
  { name: "opencode-ref", description: null },
  { name: "NextIO", description: null },
  { name: "wechat", description: null },
  { name: "Cover", description: null },
  { name: "youtube", description: "AI-assisted analysis of pain points in YouTube comments." },
  { name: "Prompt-word-manager", description: "Chrome extension for organizing and reusing AI prompts." },
  { name: "my.github.io", description: "GitHub Pages site source." },
  { name: "-1", description: "Website-navigation experiment." },
  { name: "ai-1", description: null },
  { name: "lend", description: null },
  { name: "lendai", description: null },
];

export const repositoryUrl = (name: string) => `https://github.com/147qaz258-ead/${name}`;
