// Runtime-neutral checks over the rendered widget states in tests/out (written by tests/render.*).
import { describe, expect, test } from "bun:test";
import { alertSkin, cardSkin, widgetCardSkin } from "../src/skin/skin";
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

describe("skin: alert tones and card width", () => {
  test("success / warning / destructive are token colours on bg-muted, block padding on the 8px step", () => {
    for (const t of ["success", "warning", "destructive"] as const) expect(alertSkin(t)).toContain(`text-${t} inset-ring-${t}`);
    expect(alertSkin("default")).toContain("text-foreground inset-ring-border");
    for (const t of ["default", "success", "warning", "destructive"] as const) expect(alertSkin(t)).toContain("bg-muted px-4 py-2");
  });
  test("the card surface has no width; the widgets add mx-auto max-w-sm (account max-w-lg)", () => {
    expect(cardSkin()).not.toMatch(/mx-auto|max-w-/);
    expect(cardSkin(widgetCardSkin())).toMatch(/mx-auto.*max-w-sm/);
    expect(cardSkin(widgetCardSkin("max-w-lg"))).toContain("max-w-lg");
    expect(cardSkin(widgetCardSkin("max-w-lg"))).not.toContain("max-w-sm");
  });
});

describe("info message", () => {
  test("info is the neutral default tone (bg-muted, text-foreground), not success", () => {
    const tag = html["sign-up-error-info"]!.match(/<div[^>]*data-testid="authfly-info"[^>]*>/)?.[0] ?? "";
    expect(tag).toContain("text-foreground");
    expect(tag).not.toContain("text-success");
  });
});
