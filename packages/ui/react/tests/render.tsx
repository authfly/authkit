// SSR-renders every widget state of tests/states.json into <out>/<state>.html (react-dom/server) for the HTML/ARIA gate.
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { mkdirSync, writeFileSync } from "fs";
import * as W from "../src/authfly";
import all from "./states.json";
const out = process.argv[2] ?? `${import.meta.dir}/out`;
mkdirSync(out, { recursive: true });
for (const s of all as any[]) writeFileSync(`${out}/${s.name}.html`, renderToStaticMarkup(createElement((W as any)[s.widget], s.props)));
