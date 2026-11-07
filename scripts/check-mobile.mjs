// 移动端溢出与顶栏元素位置测量
const PORT = 9222;
const url = process.argv[2] || "http://127.0.0.1:3000/zh";
const width = Number(process.argv[3] || 390);

const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
await new Promise((r, j) => { ws.addEventListener("open", r, { once: true }); ws.addEventListener("error", j, { once: true }); });
const send = (method, params = {}) => new Promise((res, rej) => {
  const mid = ++id;
  pending.set(mid, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result)));
  ws.send(JSON.stringify({ id: mid, method, params }));
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ev = async (e) => {
  const r = await send("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
};

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url });
await sleep(4500);

const out = await ev(`(() => {
  const de = document.documentElement;
  const header = document.querySelector('header');
  const items = [...(header?.querySelectorAll('a,button') ?? [])].map(el => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 18),
      x: Math.round(r.x), right: Math.round(r.right), w: Math.round(r.width), h: Math.round(r.height),
      visible: r.width > 0 && r.right > 0 && r.x < window.innerWidth };
  });
  const overflowing = [...document.querySelectorAll('body *')].filter(el => {
    const r = el.getBoundingClientRect();
    return r.right > window.innerWidth + 1 && r.width > 0;
  }).slice(0, 6).map(el => ({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 50),
    right: Math.round(el.getBoundingClientRect().right) }));
  return { innerWidth: window.innerWidth, scrollWidth: de.scrollWidth, bodyScrollWidth: document.body.scrollWidth,
    hasHorizontalOverflow: de.scrollWidth > window.innerWidth, headerItems: items, overflowing };
})()`);
console.log(JSON.stringify(out, null, 2));
ws.close();
