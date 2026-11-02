// The six Authfly widgets as render functions (sign-in, sign-up, request, notice: generated, ./authfly-<name>.ts) (props identical to packages/ui/react) for light-DOM custom elements.
import { renderBox as box } from "../ui/box/box.wc";
import { renderText as text } from "../ui/text/text.wc";
import { renderButton as button } from "../ui/button/button.wc";
import { renderSeparator as separator } from "../ui/separator/separator.wc";
import { badge, card, form, group, lucideIcon, stack, title } from "../components";
import { buttonSkin, textSkin, widgetCardSkin } from "../skin/skin";
import type { AuthflyAccountProps, AuthflyConsentProps } from "./props";

import { lm, head, messages, hidden, submit } from "./_parts";
export { renderAuthflySignIn } from "./authfly-sign-in";
export { renderAuthflySignUp } from "./authfly-sign-up";
export { renderAuthflyRequest } from "./authfly-request";
export { renderAuthflyNotice } from "./authfly-notice";

export function renderAuthflyConsent(p: AuthflyConsentProps): Element {
  const { id, csrf = "", error = "", info = "", labels: L } = p;
  const decide = (decision: "deny" | "approve", variant: "default" | "outline", lbl: string) =>
    form({ action: p.action, class: "flex-1", "data-testid": decision }, [hidden("csrf", csrf), hidden("decision", decision), button({ type: "submit", class: buttonSkin(variant, "w-full") }, [lbl])]);
  return card({ class: widgetCardSkin(), "data-testid": "authfly-consent", "data-client": p.client, ...lm(id, p.landmarkLabel) }, [
    head(id, p.title, p.text), ...messages(id, error, info),
    text({ class: "text-sm text-foreground", "data-testid": "account" }, [L.account, " ", text({ tag: "strong", class: "font-semibold" }, [p.account])]),
    stack({ gap: "2" }, [
      title(2, { id: `${id}-scopes` }, [L.scopes]),
      box({ tag: "ul", "aria-labelledby": `${id}-scopes`, class: "m-0 flex list-none flex-col gap-2 p-0", "data-testid": "scopes" },
        (p.scopes ?? []).map((s) => box({ tag: "li", class: "flex items-center gap-2 text-sm text-foreground", "data-scope": s.id }, [lucideIcon("check"), s.title]))),
    ]),
    group({ gap: "2", justify: "between" }, [decide("deny", "outline", L.deny), decide("approve", "default", L.approve)]),
  ]);
}

export function renderAuthflyAccount(p: AuthflyAccountProps): Element {
  const { id, labels: L, verified = false, csrf = "" } = p;
  const row = (dt: string, dd: Element) => box({ class: "grid gap-2" }, [box({ tag: "dt", class: textSkin.muted }, [dt]), dd]);
  return card({ class: widgetCardSkin("max-w-lg"), "data-testid": "authfly-account", ...lm(id, p.landmarkLabel) }, [
    head(id, p.title, p.text),
    box({ tag: "dl", class: "m-0 grid gap-4", "data-testid": "profile" }, [
      row(L.name, box({ tag: "dd", class: "m-0 font-semibold text-foreground", "data-testid": "profile-name" }, [p.name])),
      row(L.email, box({ tag: "dd", class: "m-0 flex flex-wrap items-center gap-2 font-semibold text-foreground", "data-testid": "profile-email" }, [p.email, badge(verified ? "default" : "secondary", { "data-testid": "verified" }, [verified ? L.verified : L.unverified])])),
    ]),
    separator({ decorative: true, class: "w-full border-border" }),
    stack({ gap: "2" }, [
      title(2, { id: `${id}-methods` }, [L.security]),
      box({ tag: "ul", "aria-labelledby": `${id}-methods`, class: "m-0 flex list-none flex-col gap-2 p-0", "data-testid": "methods" },
        (p.methods ?? []).map((m) => box({ tag: "li", class: "flex items-center justify-between gap-4 text-sm text-foreground", "data-method": m.id }, [
          text({ tag: "span", class: "flex items-center gap-2" }, [lucideIcon(m.icon ? m.icon : "shield"), m.title]), badge("outline", {}, [m.text]),
        ]))),
    ]),
    form({ action: p.signoutUrl, "data-testid": "signout-form" }, [hidden("csrf", csrf), submit(L.signout, "outline", "signout", [lucideIcon("log-out")])]),
  ]);
}
