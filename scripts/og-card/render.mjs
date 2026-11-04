/**
 * 生成 1200×630 的分享卡（OG image）。
 *
 * 为什么不用 next/og：卡片里有中文，而 ImageResponse 需要自带 CJK 字体文件；
 * 这里直接用本机浏览器渲染 HTML，中文走系统字体，一个依赖都不用装。
 *
 * 用法（需要先让一个 Chrome 打开调试端口）：
 *   chrome --headless=new --remote-debugging-port=9222 --user-data-dir=<临时目录>
 *   node scripts/og-card/render.mjs \
 *     --lang en \
 *     --kicker "PROJECT ARCHIVE 2026" \
 *     --headline "Building AI Systems That Enter the Physical World." \
 *     --support "Moving intelligence from screens into the physical world." \
 *     --out public/og/og-en.jpg
 *
 * 字体取自 node_modules/geist，模板用相对路径引用，所以脚本会把模板和字体
 * 临时拷到同一个目录再渲染。产出直接写 JPG —— 微信 / X 对 WebP 预览支持不稳定。
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, item, index, all) => {
    if (item.startsWith("--")) acc.push([item.slice(2), all[index + 1]]);
    return acc;
  }, []),
);
const lang = args.lang === "zh" ? "zh" : "en";
const out = args.out ?? `og-${lang}.jpg`;
const port = process.env.CHROME_DEBUG_PORT ?? "9222";

const work = mkdtempSync(join(tmpdir(), "og-card-"));
const fonts = [
  "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2",
  "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2",
  "node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.woff2",
];
for (const font of fonts) copyFileSync(font, join(work, basename(font)));

const html = readFileSync("scripts/og-card/template.html", "utf8")
  .replaceAll("{{KICKER}}", args.kicker ?? "")
  .replaceAll("{{CLASS}}", lang === "zh" ? "zh" : "")
  .replaceAll("{{HEADLINE}}", args.headline ?? "")
  .replaceAll("{{SUPPORT}}", args.support ?? "");
const htmlPath = join(work, "card.html");
writeFileSync(htmlPath, html);

const targets = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json());
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message.result ?? message.error);
    pending.delete(message.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
await new Promise((resolve) => ws.addEventListener("open", resolve));
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: `file:///${htmlPath.replace(/\\/g, "/")}` });
await new Promise((resolve) => setTimeout(resolve, 2500));

const png = join(work, "card.png");
const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
writeFileSync(png, Buffer.from(shot.data, "base64"));
ws.close();

execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-vf", "scale=1200:630", "-q:v", "2", out], { stdio: "inherit" });
rmSync(work, { recursive: true, force: true });
console.log(`wrote ${out}`);
process.exit(0);
