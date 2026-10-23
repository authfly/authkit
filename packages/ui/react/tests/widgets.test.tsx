// SSR smoke tests of the six widgets in the states the docs site shows (site/previews.go).
import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import * as W from "../src/authfly";
import { states } from "./states";

const html = Object.fromEntries(states(W).map(([n, el]) => [n, renderToStaticMarkup(el)]));

describe("authfly widgets on ui8kit 3", () => {
  test.each(Object.keys(html))("%s: section landmark with a name, no raw colours", (n) => {
    const h = html[n];
    expect(h.startsWith("<section")).toBe(true);
    expect(/aria-labelledby="[^"]+-title"|aria-label=/.test(h)).toBe(true);
    expect(/\b(bg|text|border)-(white|black|red|green|blue|gray)-?\d*\b|#[0-9a-f]{3,6}\b/i.test(h)).toBe(false);
    expect(/-\[[^\]]+\]|\b[a-z-]+-\d+\.5\b/.test(h)).toBe(false);
  });
  test("every label points at a control", () => {
    for (const h of Object.values(html)) for (const [, id] of h.matchAll(/<label[^>]*for="([^"]+)"/g)) expect(h.includes(`id="${id}"`)).toBe(true);
  });
  test("errors are alerts, info is status", () => {
    expect(html["sign-in-error"]).toMatch(/role="alert"[^>]*data-testid="authfly-error"/);
    expect(html["sign-up-error-info"]).toMatch(/role="status"[^>]*data-testid="authfly-info"/);
  });
  test("forms post with csrf", () => {
    for (const [n, h] of Object.entries(html)) for (const f of h.match(/<form[^>]*>/g) ?? []) {
      expect(f).toContain('method="post"');
      expect(h).toContain('name="csrf" value="preview"');
      void n;
    }
  });
  test("social providers render one link each", () => {
    expect((html["sign-in-social"].match(/data-provider=/g) ?? []).length).toBe(2);
  });
  test("decorative icons are hidden", () => {
    for (const h of Object.values(html)) for (const s of h.match(/<span data-slot="icon"[^>]*>/g) ?? []) expect(s).toContain('aria-hidden="true"');
  });
});

describe("3.2.0 primitives", () => {
  test("account divider is a decorative <hr> (Separator)", () => {
    expect(html["account"]).toMatch(/<hr[^>]*role="none"/);
  });
  test("forms are real <form> with method/action (Form primitive)", () => {
    for (const h of Object.values(html)) for (const f of h.match(/<form[^>]*>/g) ?? []) expect(f).toMatch(/action="[^"]*"[^>]*method="post"|method="post"[^>]*action=/);
  });
});
