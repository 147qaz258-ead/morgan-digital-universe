# DEPLOYMENT STATUS — Vercel 部署状态说明

> 最后核验时间：2026-10-17（所有结论均为当日实测，非推测）
> 结论一句话：**代码从来没有问题；真正的根因是 Vercel 项目的 `framework` 字段为 `null`，导致平台不对该项目应用 Next.js 路由规则，全球所有访客（不止中国大陆）拿到的都是 404。已修复，站点当前在线。**

---

## 0. 当前状态（2026-10-17 复验）

| 检查项 | 状态 | 证据 |
|---|---|---|
| 生产站点 | **ONLINE** | 14 条路由全部 `200`，不存在路由 `404`（符合预期） |
| 洁净域名 | **ONLINE** | https://morgan-digital-universe.vercel.app → 200 |
| 兜底域名 | **ONLINE** | https://morgan-digital-universe-oneday1.vercel.app → 200 |
| 根因修复 | **DONE** | 项目 `framework` 由 `null` → `nextjs`，已重新部署 |
| SEO 元数据 | **DONE** | canonical / og:url / og:image / sitemap / robots 全部使用洁净域名 |
| Vercel 项目 | `morgan-digital-universe` / `prj_glawHS5CmpyLxSHyke7uJn1jyyoT` | 未被删除、未被改名 |
| 上传体积优化 | **DONE** | 新增 `.vercelignore`，不再上传 `.playwright-mcp/`、`logs/`、`artifacts/` 等本地产物 |
| Vercel API Token | **已销毁** | 临时副本已覆写删除；仓库与文档中无残留 |
| 中国大陆直连 | 仍受影响 | 见第 4 节；这是独立问题，与本次故障无关 |

---

## 1. 真正的根因（本次修复的核心）

### 症状

- 构建**完全成功**：15 条路由全部生成，`Build Completed in /vercel/output`
- 部署状态**完全正常**：`readyState: READY`、`readySubstate: PROMOTED`、`aliasAssigned: true`、`aliasError: null`
- 但线上**每一条路径**（含 `/`、`/favicon.ico` 这种纯静态文件）都返回 404

### 判定方法：看清 404 是谁返回的

这是本次排查最关键的一步，之前正是因为看错了才误判。

| 特征 | Vercel **平台** 404（本次的情况） | Next.js **应用** 404 |
|---|---|---|
| `Content-Type` | `text/plain; charset=utf-8` | `text/html` |
| `Content-Length` | 79 | 数千字节 |
| 响应体 | `The page could not be found\n\nNOT_FOUND\n\n<请求ID>` | 完整 HTML 文档 |
| `X-Vercel-Error` | `NOT_FOUND` | 无 |

**响应体是纯文本、79 字节 → 是 Vercel 边缘层自己返回的，说明部署上没有任何可服务的产物，不是应用里路由写错了。**

### 根因

查询 `GET /v9/projects/{projectId}` 发现项目配置里：

```
"framework": null
"buildCommand": null
"outputDirectory": null
"installCommand": null
"devCommand": null
```

一个 Next.js 项目正常应为 `framework: "nextjs"`。因为它是 `null`，**Vercel 构建时虽然能自动识别并跑通 `next build`，但不会对该部署应用 Next.js 的路由规则**，于是边缘层对任何路径都匹配不到规则 → 全部 NOT_FOUND。

### 修复

```bash
curl -X PATCH "https://api.vercel.com/v9/projects/prj_glawHS5CmpyLxSHyke7uJn1jyyoT?teamId=team_sQj4Avwxv3X9IS8Xv2P6Dtp1" \
  -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
  -d '{"framework":"nextjs"}'
```

然后重新部署一次即生效。**不需要改任何一行代码。**

---

## 2. 次因：`NEXT_PUBLIC_SITE_URL` 指向了脏域名

项目上的环境变量原本指向 Vercel 自动生成的兜底域名，导致首页 canonical / og:url / og:image / twitter:image / sitemap / robots **全部是脏域名**（首页 HTML 中出现 12 次）。

| 项 | 修复前 | 修复后 |
|---|---|---|
| canonical | `...-oneday1.vercel.app` | `https://morgan-digital-universe.vercel.app` |
| og:url / og:image | `...-oneday1.vercel.app` | `https://morgan-digital-universe.vercel.app` |
| robots `Host` / `Sitemap` | `...-oneday1.vercel.app` | `https://morgan-digital-universe.vercel.app` |
| sitemap `<loc>` | `...-oneday1.vercel.app` | `https://morgan-digital-universe.vercel.app` |

已通过 `PATCH /v9/projects/{id}/env/5jEe66kwgYPz3AEg` 改为 `https://morgan-digital-universe.vercel.app`（target: production），并重新部署。该值在 Vercel 侧加密存储，**无法通过 API 回读明文**，只能靠线上 HTML 反验。

---

## 3. 排查中排除的误判（重要，避免重犯）

| 误判 | 真相 |
|---|---|
| 「代码写错了」 | 代码无需任何修改；本地 `pnpm build` 一直正常 |
| 「项目被删了 / 改名了」 | 项目始终存在，ID 未变 |
| 「部署过期被回收了」 | 项目虽配了 `deploymentExpiration: 30` 天，但部署未标记 `expired`，且**新部署同样 404**，与过期无关 |
| 「代理在伪造 404」 | 已排除：直连测试（`curl --resolve`，不走代理）全部连接失败 `000`，因为 GFW 重置 `.vercel.app` 的 SNI，代理是唯一通路；且 `X-Vercel-Id` 每次不同，是真实边缘响应 |
| 「是 Next.js 的 404 页」 | 不是。是 Vercel 平台纯文本 404，见第 1 节 |
| 「DNS 污染导致打不开」 | **只说对一半**。污染和 SNI 重置确实存在，但那只影响国内直连；本次故障影响全球所有访客，主因是项目配置 |

### 部署方式的一个坑

第一次用 `vercel deploy --prod --archive=tgz` 部署时，构建日志**没有** `Build Completed in /vercel/output` / `Deploying outputs...` 两行，产物体没挂上（文件树里只有 `src/.vercel/source.tgz`）。去掉 `--archive=tgz` 后恢复正常。**后续部署不要加 `--archive=tgz`。**

---

## 4. 遗留问题：中国大陆直连（独立问题，未解决）

这一层与本次故障无关，但在修完 `framework` 之后**现在是唯一剩下的访问障碍**：

| 域名 | 本机 DNS 解析 | 加密 DoH（真实 IP） | TLS 握手 |
|---|---|---|---|
| `morgan-digital-universe.vercel.app` | 被污染 | 需 DoH 获取 | `.vercel.app` 的 SNI 被重置 |
| 对照组 `vercel.com` | 正常 | 正常 | 正常 |

**这不是针对你网站的封禁**，而是对 `*.vercel.app` 这个后缀的通用阻断（无关域名 `example.vercel.app` 同样被挡）。

可选路线（成本 / 国内速度 / 迁移代价各不相同）：

- **A. 自有域名 + 继续用 Vercel**（约 ¥55–75/年）：域名 CNAME 到 `cname.vercel-dns.com`，再到 Vercel Add Domain。SNI 不再是 `*.vercel.app`，恰好绕开第二层阻断；零迁移成本。**最推荐先试。**
- **B. 迁到国内静态托管**（腾讯 CloudBase / 阿里 OSS + CDN）：国内最快，但需实名认证 + ICP 备案（备案期间国内无法访问，约 2–3 周），且失去 Git push 自动部署。
- **C. Vercel + 套 Cloudflare CDN**：免费，但免费套餐默认仍回源 Vercel 边缘段，SNI 层面未必绕开，国内也常不稳定。不建议首选。
- **D. 保持现状**：只有开代理的访客能打开。适合这个站主要给海外/招聘方看的场景。

---

## 5. 安全事项

| 事项 | 状态 | 说明 |
|---|---|---|
| Vercel API Token | ⚠️ **仍然需要你去吊销重建** | 该 token 曾在早前对话中以明文出现。本次仅从本地会话记录中读取并一次性使用，用后已覆写删除临时副本，仓库与文档中无残留。但只要它还曾以明文出现过，就应当作已泄露处理：https://vercel.com/account/tokens |
| GitHub 仓库 | ⚠️ **当前是公开（public）** | 仓库含 `docs/EXECUTION_STATUS.md`、`PROJECT_CONTENT_INTAKE.md` 等策略与 QA 记录。若不想公开，建议改为 private（Vercel 免费版支持私有仓库，不影响部署）。 |
| 本地产物上传 | ✅ **已修复** | 新增 `.vercelignore`，`.playwright-mcp/`、`logs/`、`artifacts/`、`.env*`、`node_modules`、`.next` 不再随部署上传到 Vercel。 |
| C 盘空间 | 剩余约 2.75 GB | 偏低；部署前后避免重复安装大型全局依赖。 |

---

## 6. 复现 / 续接部署所需

### 本地环境

- **Vercel CLI**：`C:\Users\29913\AppData\Roaming\npm\vercel.cmd`（v50.28.0）。当前 npm 全局前缀已改为 `D:\npm-global`，两者不在同一处，需注意 PATH。
- **该 CLI 版本不读 `VERCEL_TOKEN` 环境变量**，必须每次显式传 `--token='...'`。
- **中文目录名踩坑**：项目根目录是 `个人网站`，CLI 的 slugify 会把它变成空字符串，导致 `Detected linked project does not have "id"` 报错。已通过手工创建项目 + 手写 `.vercel/project.json` 绕过。这个文件在 `.gitignore` 里，只留本地，删了下次部署会再报错。
- **不要加 `--archive=tgz`**，见第 3 节。

### 部署命令

```bash
cd "E:\C_Projects\个人网站"
vercel deploy --prod --yes --force --token='<token>' --scope oneday1
```

### 上线后复验清单

1. 14 条路由全部 `200`，不存在路径 `404`（符合预期）
2. `robots.txt` / `sitemap.xml` 的域名是洁净域名
3. 首页与三条项目详情页的 `canonical` / `og:url` / `og:image` 是洁净域名
4. OG 封面图可访问：`/images/site-og-cover-01.webp`
5. 线上 Lighthouse（尚未执行；这一步完成前，相关任务不能标为完成）

### 推荐的安全续接顺序

1. 到 https://vercel.com/account/tokens 吊销旧 token 并重建。
2. 本机执行 `vercel login`，或只在当前终端临时提供新 token；**不要把 token 写入仓库、文档或聊天**。
3. 确认 Production 环境 `NEXT_PUBLIC_SITE_URL` = `https://morgan-digital-universe.vercel.app`（该值加密存储、无法 API 回读，只能靠线上 HTML 反验）。
4. 触发一次 Production Redeploy。
5. 按上面清单复验。
6. 再执行线上 Lighthouse。
