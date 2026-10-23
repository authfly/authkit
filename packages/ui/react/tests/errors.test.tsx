// Server / field errors must reach the controls: aria-describedby → error element, aria-invalid="true".
import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup as r } from "react-dom/server";
import { AuthflySignIn, AuthflySignUp, AuthflyRequest, Field, Form } from "../src/authfly";
import { Input } from "../src/ui/input/input";

const controls = (h: string) => [...h.matchAll(/<input(?![^>]*type="(?:hidden|checkbox)")[^>]*>/g)].map((m) => m[0]);
const attr = (tag: string, a: string) => tag.match(new RegExp(`${a}="([^"]*)"`))?.[1];

function expectWired(h: string, errId: string) {
  expect(h).toContain(`id="${errId}"`);
  const cs = controls(h);
  expect(cs.length).toBeGreaterThan(0);
  for (const c of cs) {
    expect(attr(c, "aria-describedby")?.split(" ")).toContain(errId);
    expect(attr(c, "aria-invalid")).toBe("true");
  }
}

const L = { identifier: "Email", password: "Password", submit: "Go", name: "Name", username: "User", domain: "@x.org", hint: "10+ chars", terms: "Terms", field: "Field", confirm: "Confirm" } as any;

describe("server error is exposed on every field", () => {
  test("sign-in", () => expectWired(r(<AuthflySignIn id="s" title="t" text="x" action="#" error="Wrong" labels={L} providers={[]} />), "s-error"));
  test("sign-up (keeps hint + domain ids)", () => {
    const h = r(<AuthflySignUp id="u" title="t" text="x" action="#" error="Taken" labels={L} />);
    expectWired(h, "u-error");
    const [, user, pass] = controls(h);
    expect(attr(user, "aria-describedby")).toBe("u-domain u-error");
    expect(attr(pass, "aria-describedby")).toBe("u-password-hint u-error");
  });
  for (const kind of ["email", "password", "code"] as const)
    test(`request ${kind}`, () => expectWired(r(<AuthflyRequest id="q" title="t" text="x" action="#" error="Bad" kind={kind} labels={L} />), "q-error"));
});

describe("no error → no aria-invalid, no dangling ids", () => {
  test("sign-in / sign-up / request", () => {
    for (const h of [r(<AuthflySignIn id="s" title="t" text="x" action="#" labels={L} providers={[]} />), r(<AuthflySignUp id="u" title="t" text="x" action="#" labels={L} />), r(<AuthflyRequest id="q" title="t" text="x" action="#" kind="password" labels={L} />)]) {
      expect(h).not.toContain("aria-invalid");
      for (const c of controls(h)) for (const ref of (attr(c, "aria-describedby") ?? "").split(" ").filter(Boolean)) expect(h).toContain(`id="${ref}"`);
    }
  });
  test("info alone does not mark fields invalid", () => {
    expect(r(<AuthflyRequest id="q" title="t" text="x" action="#" info="Sent" labels={L} />)).not.toContain("aria-invalid");
  });
});

describe("Field-level error", () => {
  test("own error + form error, order hint → field error → form error", () => {
    const h = r(<Form errorId="f-error"><Field label="E" htmlFor="e" hint="h" error="Required"><Input id="e" name="e" /></Field></Form>);
    const [c] = controls(h);
    expect(attr(c, "aria-describedby")).toBe("e-hint e-error f-error");
    expect(attr(c, "aria-invalid")).toBe("true");
    expect(h).toMatch(/id="e-error"[^>]*>Required</);
  });
  test("field error without form error", () => {
    const [c] = controls(r(<Field label="E" htmlFor="e" error="Bad"><Input id="e" /></Field>));
    expect(attr(c, "aria-describedby")).toBe("e-error");
    expect(attr(c, "aria-invalid")).toBe("true");
  });
});
