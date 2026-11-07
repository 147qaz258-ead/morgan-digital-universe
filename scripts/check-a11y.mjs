// 无障碍抽查：顶栏命中区尺寸 + 键盘焦点环可见性（需先起 headless chrome --remote-debugging-port=9222）
// 用法：node scripts/check-a11y.mjs [截图输出目录] [页面地址]
// 背景：WCAG 2.5.8 要求指针目标 ≥24×24 CSS px；2.4.11 要求焦点指示与背景对比可见。
const PORT = 9222;
const OUT_DIR = process.argv[2] || "/tmp/a11y";
const URL_TO_OPEN = process.argv[3] || "http://127.0.0.1:3000/en";
const fs = await import("node:fs");

const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const page = targets.find((t) => t.type === "page");
if (!page) throw new Error("没有可用的 page target，请先启动带 --remote-debugging-port=9222 的 Chrome");

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});
await new Promise((res, rej) => {
  ws.addEventListener("open", res, { once: true });
  ws.addEventListener("error", rej, { once: true });
});

const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const mid = ++id;
    pending.set(mid, (msg) => (msg.error ? rej(new Error(`${method}: ${msg.error.message}`)) : res(msg.result)));
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
};
// 脚本 focus() 不匹配 :focus-visible，必须发真实 Tab 键
const tab = async () => {
  for (const type of ["keyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", { type, key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
  }
  await sleep(220);
};
const describeFocus = () =>
  evaluate(`(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      text: el.textContent.trim().slice(0, 30),
      color: cs.color,
      focusVisible: el.matches(':focus-visible'),
      outline: cs.outline,
      boxShadow: cs.boxShadow,
      rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    };
  })()`);
const shoot = async (name, clip) => {
  const shot = await send("Page.captureScreenshot", { format: "png", clip });
  fs.writeFileSync(`${OUT_DIR}/${name}`, Buffer.from(shot.data, "base64"));
};

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: URL_TO_OPEN });
await sleep(4500);

// 1) 顶栏所有链接的命中区
const header = await evaluate(`(() => {
  const h = document.querySelector('header');
  if (!h) return null;
  return [...h.querySelectorAll('a')].map(a => {
    const b = a.getBoundingClientRect();
    return { text: a.textContent.trim().slice(0, 26), w: Math.round(b.width), h: Math.round(b.height) };
  });
})()`);
const tooSmall = (header ?? []).filter((l) => l.h < 24 || l.w < 24);
console.log("顶栏命中区：", JSON.stringify(header));
console.log(tooSmall.length ? `不达标（<24px）：${JSON.stringify(tooSmall)}` : "全部 ≥24px ✓");

// 2) 键盘焦点环
await tab();
const first = await describeFocus();
console.log("首个焦点：", JSON.stringify(first));
await shoot("focus-first.png", { x: 0, y: 0, width: 620, height: 110, scale: 3 });

// 3) 依次 Tab，找到第一个浅色文字（深色底）的可聚焦元素
let dark = null;
for (let i = 0; i < 25; i++) {
  await tab();
  const info = await describeFocus();
  if (!info) continue;
  const m = info.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m && Number(m[1]) > 200 && Number(m[2]) > 200 && Number(m[3]) > 200) {
    dark = info;
    break;
  }
}
console.log("深色底焦点：", JSON.stringify(dark));
if (dark) {
  const { x, y, w, h } = dark.rect;
  await shoot("focus-dark.png", { x: Math.max(0, x - 24), y: Math.max(0, y - 20), width: Math.min(640, w + 60), height: h + 40, scale: 3 });
}

ws.close();
console.log("完成，截图在", OUT_DIR);
