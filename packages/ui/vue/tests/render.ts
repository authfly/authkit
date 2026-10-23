// SSR-renders every widget state of tests/states.json (shared with the react package) into tests/out/<state>.html.
import { createServer } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
const root = new URL("..", import.meta.url).pathname;
const out = process.argv[2] ?? `${root}tests/out`;
const states = JSON.parse(readFileSync(`${root}../react/tests/states.json`, "utf8"));
const server = await createServer({ root, plugins: [vue()], server: { middlewareMode: true }, ssr: { external: ["vue", "@vue/server-renderer"] }, appType: "custom", logLevel: "error" });
const W = await server.ssrLoadModule("/src/authfly.ts");
mkdirSync(out, { recursive: true });
for (const s of states) writeFileSync(`${out}/${s.name}.html`, await renderToString(createSSRApp({ render: () => h(W[s.widget], s.props) })));
await server.close();
console.log("vue rendered", states.length, "->", out);
