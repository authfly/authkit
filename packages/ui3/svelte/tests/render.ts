// SSR-renders every widget state of ../react/tests/states.json into tests/out/<state>.html (svelte/server).
import { createServer } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
const root = new URL("..", import.meta.url).pathname;
const out = process.argv[2] ?? `${root}tests/out`;
const states = JSON.parse(readFileSync(`${root}../react/tests/states.json`, "utf8"));
const server = await createServer({ root, plugins: [svelte({ compilerOptions: { generate: "server" } })], server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const W = await server.ssrLoadModule("/src/authfly.ts");
const { render } = await server.ssrLoadModule("svelte/server");
mkdirSync(out, { recursive: true });
for (const s of states) writeFileSync(`${out}/${s.name}.html`, render(W[s.widget], { props: s.props }).body);
await server.close();
console.log("svelte rendered", states.length, "->", out);
