// SSR-renders every widget state of ../react/tests/states.json into tests/out/<state>.html (solid-js/web; hydration keys data-hk stripped).
import { createServer } from "vite";
import solid from "vite-plugin-solid";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
const root = new URL("..", import.meta.url).pathname;
const out = process.argv[2] ?? `${root}tests/out`;
const states = JSON.parse(readFileSync(`${root}../react/tests/states.json`, "utf8"));
const server = await createServer({ root, plugins: [solid({ ssr: true, solid: { hydratable: false, generate: "ssr" } })], server: { middlewareMode: true }, appType: "custom", logLevel: "error", ssr: { noExternal: ["solid-js"] }, resolve: { conditions: ["solid", "node"] } });
const W = await server.ssrLoadModule("/src/authfly.ts");
const { renderToString, createComponent } = await server.ssrLoadModule("solid-js/web");
mkdirSync(out, { recursive: true });
for (const s of states) writeFileSync(`${out}/${s.name}.html`, renderToString(() => createComponent(W[s.widget], s.props)).replace(/ data-hk="[^"]*"/g, ""));
await server.close();
console.log("solid rendered", states.length, "->", out);
