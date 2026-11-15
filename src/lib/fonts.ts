import localFont from "next/font/local";

/**
 * 字体栈（V3.0 Neubrutalism）：
 * - display：Archivo Black，只用于 H1/H2 与超大编号，字体本身已是 400 极粗，不要再加粗。
 * - body：Space Grotesk，全站正文与 UI。
 * - mono：Geist Mono，保留给编号、状态、标签（在 layout.tsx 加载）。
 *
 * 字体文件来自 @fontsource，已复制到 src/fonts 并在本地打包，
 * 构建时不依赖 Google Fonts 网络。中文由系统字体兜底。
 */
export const archivoBlack = localFont({
  src: "../fonts/archivo-black-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  fallback: ["Arial Black", "Impact", "PingFang SC", "Microsoft YaHei", "sans-serif"],
  preload: true,
});

export const spaceGrotesk = localFont({
  src: [
    { path: "../fonts/space-grotesk-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/space-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/space-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-grotesk",
  fallback: ["Helvetica Neue", "PingFang SC", "Microsoft YaHei", "sans-serif"],
  preload: true,
});
