// Renders every state of ../react/tests/states.json through the custom elements in happy-dom (light DOM) and
// writes the element's inner HTML (= the widget) to tests/out/<state>.html.
import { Window } from "happy-dom";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
const win = new Window(); Object.assign(globalThis, { window: win, document: win.document, customElements: win.customElements, HTMLElement: win.HTMLElement, Node: win.Node });
const root = new URL("..", import.meta.url).pathname;
const out = process.argv[2] ?? `${root}tests/out`;
const states = JSON.parse(readFileSync(`${root}../react/tests/states.json`, "utf8"));
await import("../src/define");
const tag: Record<string, string> = { AuthflySignIn: "authfly-sign-in", AuthflySignUp: "authfly-sign-up", AuthflyRequest: "authfly-request", AuthflyNotice: "authfly-notice", AuthflyConsent: "authfly-consent", AuthflyAccount: "authfly-account" };
mkdirSync(out, { recursive: true });
for (const s of states) {
  const el = document.createElement(tag[s.widget]!); el.setAttribute("props", JSON.stringify(s.props)); document.body.appendChild(el);
  writeFileSync(`${out}/${s.name}.html`, el.innerHTML); el.remove();
}
console.log("webcomponent rendered", states.length, "->", out);
