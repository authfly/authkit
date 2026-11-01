// Authfly brand registry manifests: packages/registry/src/<runtime>/registry.json for the 9 runtimes.
//   bun tools/gen-registry.ts           write the manifests
//   bun tools/gen-registry.ts --check   fail (exit 1) when a manifest is missing or differs (CI)
// Items (names prefixed "authfly-"), built per runtime by `ui8kit build` (tools/registry.sh) from packages/ui/<rt>:
//   authfly-lib         registry:lib        skin (recipes + wrappers), Lucide glyph data, widget props, theme.css
//   authfly-components  registry:composite  middle layer: Card, Field, Alert, Badge, LucideIcon, layout, shared widget parts
//   authfly-<widget>    registry:block      one per widget + its .types.ts (sign-in, sign-up, request, notice, consent, account)
//   authfly-widgets     registry:block      webcomponent + templ only: all 6 widgets live in one file there (widgets.ts / blocks.templ)
//   authfly             registry:block      JS runtimes: the package entry (authfly.ts; webcomponent also define.ts)
// UI8Kit primitives are never copied: every item lists the bricks its files import as pinned URLs of
// @ui8kit/registry@3.3.0 (the version in every ui8kit.lock.json), and the manifest carries meta.primitives.
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const root = join(import.meta.dir, "..");
const VERSION = "3.3.0";
const RUNTIMES = ["react", "vue", "svelte", "solid", "webcomponent", "templ", "twig", "latte", "jinja2"] as const;
type Rt = (typeof RUNTIMES)[number];
const WIDGETS = ["sign-in", "sign-up", "request", "notice", "consent", "account"];
const JS = new Set<Rt>(["react", "vue", "svelte", "solid", "webcomponent"]);
const base = (rt: Rt) => `https://unpkg.com/@ui8kit/registry@${VERSION}/r/${rt}`;

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
}
const pascal = (w: string) => w.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");

/** Files of each item, relative to packages/ui/<rt>. */
function layout(rt: Rt): Record<string, { type: string; files: string[]; desc: string }> {
  const pkg = join(root, "packages/ui", rt);
  const ls = (d: string) => walk(join(pkg, d)).map((f) => relative(pkg, f)).sort();
  const items: Record<string, { type: string; files: string[]; desc: string }> = {};
  const widgetFiles = (w: string): string[] => {
    const f = rt === "react" || rt === "solid" ? [`src/blocks/authfly-${w}.tsx`]
      : rt === "vue" ? [`src/blocks/Authfly${pascal(w)}.vue`]
      : rt === "svelte" ? [`src/blocks/Authfly${pascal(w)}.svelte`]
      : rt === "twig" ? [`blocks/authfly-${w}.html.twig`]
      : rt === "latte" ? [`blocks/authfly-${w}.latte`]
      : rt === "jinja2" ? [`blocks/authfly-${w}.html.j2`] : [];
    return JS.has(rt) ? [...f, `src/blocks/authfly-${w}.types.ts`] : f;
  };
  if (JS.has(rt)) {
    const blocks = ls("src/blocks");
    const widget = new Set(WIDGETS.flatMap(widgetFiles));
    if (rt === "webcomponent") widget.add("src/blocks/widgets.ts");
    items["authfly-lib"] = { type: "registry:lib", desc: "Authfly skin (class recipes + wrappers), Lucide glyph data, widget props and theme tokens.",
      files: [...ls("src/skin"), ...ls("src/styles"), "src/components/lucide-icons.ts",
        ...blocks.filter((f) => /\/(props\.ts|feature-grid\.types\.ts)$/.test(f))] };
    items["authfly-components"] = { type: "registry:composite", desc: "Authfly middle layer: Card, Field, Alert, Badge, LucideIcon, layout and shared widget parts.",
      files: [...ls("src/components").filter((f) => !f.endsWith("/lucide-icons.ts")),
        ...blocks.filter((f) => !widget.has(f) && !items["authfly-lib"].files.includes(f))] };
  } else if (rt === "templ") {
    items["authfly-lib"] = { type: "registry:lib", desc: "Authfly skin (generated recipe tables + wrappers), Lucide glyph data, widget props and attribute helpers.",
      files: ["authfly/attrs.go", "authfly/lucide_icons.go", "authfly/props.go", "authfly/skin.go", "authfly/skin_recipes_gen.go"] };
    items["authfly-components"] = { type: "registry:composite", desc: "Authfly middle layer (templ source + generated Go).",
      files: ["authfly/components.templ", "authfly/components_templ.go"] };
  } else {
    const libDir = rt === "jinja2" ? "authfly_jinja" : "src";
    items["authfly-lib"] = { type: "registry:lib", desc: "Authfly skin (generated recipe tables + wrappers), Lucide glyph data and the template extension.",
      files: ls(libDir).filter((f) => !f.includes("__pycache__")) };
    items["authfly-components"] = { type: "registry:composite", desc: "Authfly middle layer macros: Card, Field, Alert, Badge, LucideIcon, layout.",
      files: ls("authfly") };
  }
  if (rt === "webcomponent" || rt === "templ") {
    items["authfly-widgets"] = { type: "registry:block", desc: "The 6 Authfly widgets (one source file in this runtime) + their types.",
      files: rt === "templ" ? ["authfly/blocks.templ", "authfly/blocks_templ.go"] : ["src/blocks/widgets.ts", ...WIDGETS.map((w) => `src/blocks/authfly-${w}.types.ts`)] };
  } else {
    for (const w of WIDGETS) items[`authfly-${w}`] = { type: "registry:block", desc: `Authfly ${w} widget${JS.has(rt) ? " + its types" : ""}.`, files: widgetFiles(w) };
  }
  if (JS.has(rt)) items["authfly"] = { type: "registry:block", desc: "Authfly package entry (exports every widget).",
    files: rt === "webcomponent" ? ["src/authfly.ts", "src/define.ts"] : ["src/authfly.ts"] };
  for (const [n, it] of Object.entries(items)) for (const f of it.files) if (!existsSync(join(pkg, f))) throw new Error(`${rt}/${n}: missing ${f}`);
  return items;
}

/** UI8Kit bricks a file uses: ui/<brick>/ in an import, include or Go import path. */
function bricks(text: string): string[] {
  return [...new Set([...text.matchAll(/(?:(?<!packages)\/|["'])ui\/([a-z][a-z0-9-]*)[\/"]/g)].map((m) => m[1]))];
}

function manifest(rt: Rt): string {
  const pkg = join(root, "packages/ui", rt);
  const dir: string = JSON.parse(readFileSync(join(pkg, "ui8kit.config.json"), "utf8")).dir ?? ".";
  const known = new Set(Object.keys(JSON.parse(readFileSync(join(pkg, "ui8kit.lock.json"), "utf8")).items ?? {}).map((k) => k.split("|").pop()!));
  const lay = layout(rt);
  const names = Object.keys(lay);
  const items = names.map((name) => {
    const it = lay[name];
    const used = new Set<string>(["utils"]);
    for (const f of it.files) for (const b of bricks(readFileSync(join(pkg, f), "utf8"))) used.add(b);
    for (const b of used) if (!known.has(b)) throw new Error(`${rt}/${name}: brick ${b} not in ui8kit.lock.json`);
    const prim = [...used].sort().map((b) => (b === "utils" ? `${base(rt)}/utils/utils.json` : `${base(rt)}/components/ui/${b}.json`));
    const own = name === "authfly-lib" ? [] : name === "authfly-components" ? ["authfly-lib"]
      : name === "authfly" ? names.filter((n) => n !== "authfly") : ["authfly-lib", "authfly-components"];
    return {
      name, type: it.type, runtime: rt, description: it.desc,
      registryDependencies: [...own, ...prim],
      files: it.files.map((f) => ({ path: f, target: dir === "." ? f : relative(dir, f) })),
    };
  });
  const out = {
    $schema: "https://ui8kit.com/schema/registry.json",
    name: "authfly", homepage: "https://github.com/authfly/authkit",
    meta: { primitives: { registry: "@ui8kit/registry", version: VERSION, runtime: rt, url: base(rt) },
      source: `packages/ui/${rt}`, generatedBy: "tools/gen-registry.ts" },
    items,
  };
  return JSON.stringify(out, null, 2) + "\n";
}

const check = process.argv.includes("--check");
let bad = 0;
for (const rt of RUNTIMES) {
  const p = join(root, "packages/registry/src", rt, "registry.json");
  const want = manifest(rt);
  if (check) {
    if (!existsSync(p) || readFileSync(p, "utf8") !== want) { console.error(`stale: ${relative(root, p)} (run bun tools/gen-registry.ts)`); bad++; }
  } else { mkdirSync(join(p, ".."), { recursive: true }); writeFileSync(p, want); }
}
if (check) { if (bad) process.exit(1); console.log(`registry manifests up to date (${RUNTIMES.length} runtimes)`); }
else console.log(`wrote ${RUNTIMES.length} manifests`);
