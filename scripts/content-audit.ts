import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { getCapabilityGroups } from "../src/content/capabilities";
import { getLabItems } from "../src/content/lab";
import { getStaticRouteMetadata } from "../src/content/metadata";
import { getOriginStages } from "../src/content/origin";
import { getProfile } from "../src/content/profile";
import { getEvidenceRecord, getProjects } from "../src/content/projects";
import type { MediaAsset, SystemDiagram } from "../src/content/types";
import { generatedAtmosphereAssets } from "../src/content/atmosphere";
import { dictionary } from "../src/i18n/dictionary";
import { locales, type Locale } from "../src/i18n/config";

const repoRoot = process.cwd();
const failures: string[] = [];
const notices: string[] = [];

const enProjects = getProjects("en");
const zhProjects = getProjects("zh");

function fail(message: string) {
  failures.push(message);
}

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function publicFileExists(src: string): boolean {
  if (/^https?:\/\//.test(src)) return true;
  return existsSync(path.join(repoRoot, "public", src.replace(/^\//, "")));
}

function checkMedia(media: MediaAsset | null, context: string, requireUserEvidence = false) {
  if (!media) return;
  if (!media.alt.trim()) fail(`${context}: media alt text is required.`);
  if (!/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/.test(media.aspectRatio)) {
    fail(`${context}: media aspect ratio must be a positive width/height pair.`);
  }
  if (!Number.isFinite(media.width) || media.width <= 0 || !Number.isFinite(media.height) || media.height <= 0) {
    fail(`${context}: media width and height must be positive numbers.`);
  }
  if (requireUserEvidence && media.provenance !== "user-evidence") {
    fail(`${context}: project evidence media must use provenance user-evidence.`);
  }
  for (const [label, src] of [
    ["source", media.src],
    ["poster", media.poster],
    ["captions", media.captions],
  ] as const) {
    if (src && !publicFileExists(src)) fail(`${context}: ${label} file does not exist: ${src}`);
  }
  if (media.status === "verified" && !media.src) {
    fail(`${context}: a verified media asset must have a source file.`);
  }
}

function checkDiagram(diagram: SystemDiagram, projectSlug: string) {
  const nodeIds = new Set<string>();
  const connectionIds = new Set<string>();
  for (const node of diagram.nodes) {
    if (nodeIds.has(node.id)) fail(`${projectSlug}: duplicate system node ID ${node.id}.`);
    nodeIds.add(node.id);
  }
  for (const connection of diagram.connections) {
    if (connectionIds.has(connection.id)) fail(`${projectSlug}: duplicate connection ID ${connection.id}.`);
    connectionIds.add(connection.id);
    if (!nodeIds.has(connection.from)) fail(`${projectSlug}: connection ${connection.id} has unknown source ${connection.from}.`);
    if (!nodeIds.has(connection.to)) fail(`${projectSlug}: connection ${connection.id} has unknown target ${connection.to}.`);
  }
  if (diagram.status === "confirmed" && (diagram.nodes.length < 2 || diagram.connections.length < 1)) {
    fail(`${projectSlug}: a confirmed system diagram needs at least two nodes and one connection.`);
  }
}

const evidenceIds = new Set<string>();
let pendingEvidence = 0;
let verifiedEvidence = 0;

for (const project of enProjects) {
  if (!project.oneLine.trim()) fail(`${project.slug}: homepage summary is empty.`);
  const summaryWords = project.oneLine.trim().split(/\s+/).length;
  if (summaryWords < 18 || summaryWords > 32) {
    notices.push(`${project.slug}: homepage summary is ${summaryWords} words; final confirmed copy should be 18–32 words.`);
  }

  if (project.publicationStatus === "pending") {
    const unpublishedDetailCount = [
      project.dateRange,
      project.teamSize,
      project.myRole,
      project.insight,
      project.result.summary,
      project.next,
      ...project.contributors,
      ...project.problem,
      ...project.solution,
      ...project.build,
      ...project.stack,
      ...project.failures.flatMap((failure) => [failure.what, failure.why, failure.change, failure.lesson]),
      ...project.lessons,
      ...project.links.map((link) => link.href),
    ].filter(Boolean).length;
    if (unpublishedDetailCount > 0 || project.systemDiagram || project.media.hero || project.media.gallery.length > 0 || project.media.video) {
      fail(`${project.slug}: publication-pending projects cannot expose detailed facts or project media.`);
    }
  } else {
    if (!project.title.trim() || !project.shortTitle.trim() || !project.category.trim()) {
      fail(`${project.slug}: published project is missing its title or category.`);
    }
  }

  for (const evidence of project.evidence) {
    if (evidenceIds.has(evidence.id)) fail(`Duplicate evidence ID: ${evidence.id}.`);
    evidenceIds.add(evidence.id);
    if (!evidence.id.includes(project.slug)) {
      fail(`${evidence.id}: stable ID must include its project slug (${project.slug}).`);
    }
    checkMedia(evidence.asset, `${project.slug}/${evidence.id}`, true);

    const verificationComplete = Boolean(
      evidence.asset?.src
      && evidence.asset.provenance === "user-evidence"
      && evidence.asset.status === "verified"
      && evidence.caption?.trim()
      && evidence.verification.state === "verified"
      && evidence.verification.publicPermission === "granted"
      && evidence.verification.userConfirmed
      && evidence.verification.claim?.trim()
      && evidence.verification.captureDate?.trim()
      && evidence.verification.owner?.trim(),
    );

    if (evidence.isVerified !== verificationComplete) {
      fail(`${evidence.id}: isVerified does not match file, caption, permission, claim, owner and user-confirmation state.`);
    }
    if (evidence.verification.publicPermission === "denied" && evidence.asset?.src) {
      fail(`${evidence.id}: denied evidence cannot reference a public file.`);
    }
    if (evidence.isVerified) verifiedEvidence += 1;
    else pendingEvidence += 1;
  }

  checkMedia(project.media.hero, `${project.slug}/hero`, true);
  project.media.gallery.forEach((media, index) => checkMedia(media, `${project.slug}/gallery-${index + 1}`, true));
  checkMedia(project.media.video, `${project.slug}/video`, true);
  if (project.systemDiagram) checkDiagram(project.systemDiagram, project.slug);
  if (project.publicationStatus === "pending" && project.evidence.some((item) => item.isVerified)) {
    fail(`${project.slug}: publication-pending projects cannot expose verified Evidence.`);
  }
}

// --- Cross-locale parity -------------------------------------------------
// Structural fields must match between locales: only the words differ.
if (zhProjects.length !== enProjects.length) {
  fail(`locale parity: en has ${enProjects.length} projects, zh has ${zhProjects.length}.`);
} else {
  enProjects.forEach((en, index) => {
    const zh = zhProjects[index];
    const where = `locale parity / ${en.slug}`;
    if (!zh) {
      fail(`${where}: missing in zh.`);
      return;
    }
    if (zh.slug !== en.slug) fail(`${where}: zh slug is ${zh.slug}.`);
    if (zh.index !== en.index) fail(`${where}: index differs.`);
    if (zh.status !== en.status) fail(`${where}: status differs.`);
    if (zh.publicationStatus !== en.publicationStatus) fail(`${where}: publicationStatus differs.`);
    if (zh.featured !== en.featured) fail(`${where}: featured flag differs.`);
    if (zh.year !== en.year) fail(`${where}: year differs.`);
    if (zh.media.hero?.id !== en.media.hero?.id) fail(`${where}: hero media differs.`);
    if (zh.media.gallery.length !== en.media.gallery.length) fail(`${where}: gallery length differs.`);
    if (zh.evidence.length !== en.evidence.length) fail(`${where}: evidence count differs.`);
    zh.evidence.forEach((item, i) => {
      if (item.id !== en.evidence[i]?.id) fail(`${where}: evidence ${i} id differs.`);
    });
    if (zh.links.length !== en.links.length) fail(`${where}: link count differs.`);
    zh.links.forEach((link, i) => {
      if (link.href !== en.links[i]?.href) fail(`${where}: link ${i} href differs.`);
    });

    const zhText = [
      zh.title, zh.shortTitle, zh.category, zh.oneLine,
      zh.insight ?? "", zh.myRole ?? "", zh.result.summary ?? "", zh.next ?? "",
      ...zh.problem, ...zh.solution, ...zh.build, ...zh.lessons,
      ...zh.failures.flatMap((failure) => [failure.what, failure.why, failure.change ?? "", failure.lesson ?? ""]),
      ...zh.evidence.map((item) => item.title),
      ...zh.links.map((link) => link.label),
    ];
    zhText.forEach((value, i) => {
      if (!value.trim()) fail(`${where}: zh text field ${i} is empty.`);
      if (!/[\u3400-\u9fff]/.test(value) && value !== zh.shortTitle && value.length > 3) {
        notices.push(`${where}: zh text field ${i} has no Chinese characters: "${value.slice(0, 40)}"`);
      }
    });
  });
}

for (const locale of locales) {
  const list = getProjects(locale);
  for (const project of list) {
    if (!project.title.trim() || !project.oneLine.trim()) fail(`${locale}/${project.slug}: title or summary is empty.`);
  }
}

const enOrigin = getOriginStages("en");
const zhOrigin = getOriginStages("zh");
if (enOrigin.length !== zhOrigin.length) fail("locale parity: origin stage count differs.");
enOrigin.forEach((stage, index) => {
  if (zhOrigin[index]?.id !== stage.id) fail(`locale parity: origin stage ${index} id differs.`);
  if (zhOrigin[index]?.evidenceRefs.length !== stage.evidenceRefs.length) {
    fail(`locale parity: origin stage ${stage.id} evidence refs differ.`);
  }
});

for (const group of getCapabilityGroups("en")) {
  for (const item of group.items) {
    if (!item.proofEvidenceId || !item.proofProjectSlug) {
      fail(`Capability "${item.name}" must declare a project slug and a stable Evidence ID.`);
      continue;
    }
    const record = getEvidenceRecord("en", item.proofEvidenceId);
    if (!record) fail(`Capability "${item.name}" references unknown evidence ${item.proofEvidenceId}.`);
    else if (record.project.slug !== item.proofProjectSlug) {
      fail(`Capability "${item.name}" project/evidence references do not match.`);
    }
  }
}

for (const group of getCapabilityGroups("zh")) {
  for (const item of group.items) {
    if (!getEvidenceRecord("zh", item.proofEvidenceId!)) {
      fail(`Capability zh "${item.name}" references unknown evidence ${item.proofEvidenceId}.`);
    }
  }
}

for (const stage of getOriginStages("en")) {
  for (const id of stage.evidenceRefs) {
    if (!getEvidenceRecord("en", id)) fail(`Origin stage ${stage.id} references unknown evidence ${id}.`);
  }
}

checkMedia(getProfile("en").portrait, "profile/portrait", true);
for (const locale of locales) {
  getLabItems(locale).forEach((item) => checkMedia(item.media, `lab/${locale}/${item.id}`, true));
}

generatedAtmosphereAssets.forEach((media) => {
  checkMedia(media, `atmosphere/${media.id}`);
  if (media.scrubSrc && !publicFileExists(media.scrubSrc)) {
    fail(`${media.id}: scrub source file does not exist: ${media.scrubSrc}`);
  }
  if (media.provenance !== "generated-atmosphere") {
    fail(`${media.id}: atmosphere media must use generated-atmosphere provenance.`);
  }
});

const metadataRoutes = new Set<string>();
for (const locale of locales) {
  const routesForLocale = new Set<string>();
  for (const entry of getStaticRouteMetadata(locale)) {
    if (routesForLocale.has(entry.route)) fail(`Duplicate metadata route (${locale}): ${entry.route}.`);
    routesForLocale.add(entry.route);
    if (!entry.title.trim() || !entry.description.trim()) fail(`${locale}/${entry.route}: metadata title and description are required.`);
    if (!publicFileExists(entry.ogImage)) fail(`${entry.route}: OG image does not exist: ${entry.ogImage}`);
  }
  for (const route of routesForLocale) metadataRoutes.add(`${locale}:${route}`);
}

for (const locale of locales) {
  const dict = dictionary[locale];
  const missing: string[] = [];
  const checkStrings = (node: unknown, trail: string) => {
    if (typeof node === "string") {
      if (!node.trim()) missing.push(trail);
      return;
    }
    if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) checkStrings(value, `${trail}.${key}`);
    }
  };
  checkStrings(dict, "dictionary");
  missing.forEach((trail) => fail(`${locale}: dictionary string is empty: ${trail}`));
}

const sourceFiles = ["src/app", "src/components", "src/content", "src/i18n"]
  .flatMap((directory) => walk(path.join(repoRoot, directory)))
  .filter((file) => /\.tsx?$/.test(file));

// Chinese is allowed only in the content and dictionary layers. Everything else
// renders through those layers, so a Chinese literal elsewhere is a leak.
const chineseAllowed = (relative: string) =>
  relative.startsWith("src/content/") || relative.startsWith("src/i18n/");

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  const relative = path.relative(repoRoot, file).replaceAll("\\", "/");
  if (relative !== "src/lib/visual-tokens.ts" && /#[0-9a-fA-F]{3,8}\b/.test(source)) {
    fail(`${relative}: raw hex colors must be defined in src/lib/visual-tokens.ts.`);
  }

  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const inspect = (node: ts.Node) => {
    const visibleText = ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node)
      ? node.text
      : null;
    if (visibleText && /[\u3400-\u9fff]/.test(visibleText) && !chineseAllowed(relative)) {
      const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      fail(`${relative}:${line}: user-visible string contains Chinese characters outside src/content or src/i18n.`);
    }
    if (relative.endsWith("/page.tsx") && ts.isStringLiteral(node)) {
      const parent = node.parent;
      const isClassName = ts.isJsxAttribute(parent) && parent.name.getText(sourceFile) === "className";
      const isImport = ts.isImportDeclaration(parent);
      const words = node.text.trim().split(/\s+/).filter(Boolean).length;
      if (!isClassName && !isImport && words > 40) {
        const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
        fail(`${relative}:${line}: long page copy (${words} words) must move to src/content/.`);
      }
    }
    ts.forEachChild(node, inspect);
  };
  inspect(sourceFile);
}

if (notices.length > 0) {
  console.log("Content audit notices:");
  notices.forEach((message) => console.log(`- ${message}`));
}

if (failures.length > 0) {
  console.error("Content audit failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log(
    `Content audit passed: ${enProjects.length} projects x ${locales.length} locales, ${evidenceIds.size} stable evidence IDs (${verifiedEvidence} verified, ${pendingEvidence} pending), ${metadataRoutes.size} metadata routes.`,
  );
}
