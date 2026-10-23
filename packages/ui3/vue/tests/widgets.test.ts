// Runtime-neutral checks over the rendered widget states in tests/out (written by tests/render.*).
import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "fs";
const dir = new URL("./out/", import.meta.url).pathname;
const html: Record<string, string> = Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith(".html")).map((f) => [f.slice(0, -5), readFileSync(dir + f, "utf8").replace(/<!--[\s\S]*?-->/g, "")]));
const controls = (h: string) => [...h.matchAll(/<input(?![^>]*type="(?:hidden|checkbox)")[^>]*>/g)].map((m) => m[0]);
const attr = (t: string, a: string) => t.match(new RegExp(`${a}="([^"]*)"`))?.[1];

describe("authfly widgets (rendered)", () => {
  test("all 20 states rendered", () => expect(Object.keys(html).length).toBe(20));
  test.each(Object.keys(html))("%s: landmark, tokens only, 8+4 grid", (n) => {
    const h = html[n]!;
    expect(h.trimStart().startsWith("<section")).toBe(true);
    expect(/aria-labelledby="[^"]+-title"|aria-label=/.test(h)).toBe(true);
    expect(/\b(bg|text|border)-(white|black|red|green|blue|gray)-?\d*\b|#[0-9a-f]{3,6}\b/i.test(h)).toBe(false);
    expect(/-\[[^\]]+\]|\b[a-z-]+-\d+\.5\b/.test(h)).toBe(false);
  });
  test("every label points at a control", () => {
    for (const h of Object.values(html)) for (const [, id] of h.matchAll(/<label[^>]*for="([^"]+)"/g)) expect(h.includes(`id="${id}"`)).toBe(true);
  });
  test("forms post with csrf", () => {
    for (const h of Object.values(html)) for (const f of h.match(/<form[^>]*>/g) ?? []) { expect(f).toContain('method="post"'); expect(h).toMatch(/name="csrf"/); }
  });
  test("server error → aria-describedby + aria-invalid on every field", () => {
    for (const n of ["sign-in-error", "err-sign-up", "err-request-email", "err-request-password", "code", "sign-up-error-info"]) {
      const h = html[n]!; const err = h.match(/id="([^"]+-error)"[^>]*data-testid="authfly-error"|data-testid="authfly-error"[^>]*id="([^"]+-error)"/);
      const id = err?.[1] ?? err?.[2]; expect(id).toBeTruthy();
      for (const c of controls(h)) { expect(attr(c, "aria-describedby")?.split(" ")).toContain(id!); expect(attr(c, "aria-invalid")).toBe("true"); }
    }
  });
  test("no error → no aria-invalid, no dangling describedby", () => {
    for (const n of ["sign-in", "sign-up", "forgot", "reset", "magic"]) {
      const h = html[n]!; expect(h).not.toContain("aria-invalid");
      for (const c of controls(h)) for (const r of (attr(c, "aria-describedby") ?? "").split(" ").filter(Boolean)) expect(h).toContain(`id="${r}"`);
    }
  });
  test("account divider is a decorative <hr>", () => expect(html["account"]).toMatch(/<hr[^>]*role="none"/));
  test("decorative icons hidden", () => {
    for (const h of Object.values(html)) for (const s of h.match(/<span[^>]*data-slot="icon"[^>]*>/g) ?? []) expect(s).toContain('aria-hidden="true"');
  });
});
