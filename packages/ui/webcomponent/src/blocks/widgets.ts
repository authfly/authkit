// The six Authfly widgets as render functions (props identical to packages/ui/react) for light-DOM custom elements.
import { renderBox as box } from "../ui/box/box.wc";
import { renderText as text } from "../ui/text/text.wc";
import { renderButton as button } from "../ui/button/button.wc";
import { renderLink as link } from "../ui/link/link.wc";
import { renderInput as input } from "../ui/input/input.wc";
import { renderLabel as label } from "../ui/label/label.wc";
import { renderCheckbox as checkbox } from "../ui/checkbox/checkbox.wc";
import { renderSeparator as separator } from "../ui/separator/separator.wc";
import { alert, badge, card, field, form, group, iconBadge, lucideIcon, stack, title } from "../components";
import { buttonSkin, checkboxSkin, inputSkin, labelSkin, linkSkin, textSkin } from "../skin/skin";
import type { AuthflyAccountProps, AuthflyConsentProps, AuthflyNoticeProps, AuthflyRequestProps, AuthflySignInProps, AuthflySignUpProps } from "./props";

const lm = (id: string, landmarkLabel?: string) => ({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
const head = (id: string, t: string, x: string, align: "start" | "center" = "start", role?: "alert" | "status", extra: (Element | null)[] = []) =>
  stack({ gap: "2", align }, [title(1, { id: `${id}-title`, role }, [t]), text({ class: textSkin.muted }, [x]), ...extra]);
const messages = (id: string, error?: string, info?: string) => [
  error ? alert({ id: `${id}-error`, tone: "destructive", icon: "circle-alert", "data-testid": "authfly-error" }, [error]) : null,
  info ? alert({ tone: "success", icon: "info", "data-testid": "authfly-info" }, [info]) : null,
];
const hidden = (name: string, value: string) => input({ type: "hidden", name, value });
const errOf = (id: string, error?: string) => (error ? `${id}-error` : undefined);
const ctl = (props: Record<string, unknown>) => (f: { describe: (o?: string) => string | undefined; invalid?: string }) =>
  input({ ...props, class: inputSkin(), "data-testid": "field", "aria-describedby": f.describe(), "aria-invalid": f.invalid } as never);
const submit = (label: string, variant: "default" | "outline" = "default", testid?: string, kids: (Element | string)[] = []) =>
  button({ type: "submit", class: buttonSkin(variant, "w-full"), "data-testid": testid }, [...kids, label]);

export function renderAuthflySignIn(p: AuthflySignInProps): Element {
  const { id, csrf = "", error = "", labels: L, method = "password", identifier = "any", social = "none" } = p;
  const fe = errOf(id, error); const email = identifier === "email";
  return card({ "data-testid": "authfly-sign-in", ...lm(id, p.landmarkLabel) }, [
    head(id, p.title, p.text), ...messages(id, error),
    social === "show" ? stack({ gap: "2", role: "group", "aria-label": L.providers, "data-testid": "authfly-providers" },
      (p.providers ?? []).map((pr) => button({ href: `${L.socialUrl ?? ""}/${pr.id}`, class: buttonSkin("outline", "w-full"), "data-provider": pr.id }, [lucideIcon(pr.icon), pr.title]))) : null,
    form({ action: p.action, "data-testid": "authfly-form" }, [
      hidden("csrf", csrf),
      field({ label: L.identifier, htmlFor: `${id}-identifier`, formError: fe }, ctl({ type: email ? "email" : "text", name: "identifier", autocomplete: email ? "email" : "username", required: true, id: `${id}-identifier` })),
      ...(method === "password" ? [
        field({ label: L.password, htmlFor: `${id}-password`, formError: fe }, ctl({ type: "password", name: "password", autocomplete: "current-password", required: true, id: `${id}-password` })),
        L.forgot ? link({ href: L.forgotHref, class: linkSkin("w-fit text-sm"), "data-testid": "forgot" }, [L.forgot]) : null,
      ] : []),
      submit(L.submit, "default", "submit"),
    ]),
    L.magic ? button({ href: L.magicHref, class: buttonSkin("outline", "w-full"), "data-testid": "switch-method" }, [L.magic]) : null,
    L.signupLink ? text({ class: textSkin.muted }, [L.signupText ?? "", " ", link({ href: L.signupHref, class: linkSkin(), "data-testid": "signup-link" }, [L.signupLink])]) : null,
  ]);
}

export function renderAuthflySignUp(p: AuthflySignUpProps): Element {
  const { id, csrf = "", error = "", info = "", labels: L, terms = "show" } = p; const fe = errOf(id, error);
  return card({ "data-testid": "authfly-sign-up", ...lm(id, p.landmarkLabel) }, [
    head(id, p.title, p.text), ...messages(id, error, info),
    form({ action: p.action, "data-testid": "authfly-form" }, [
      hidden("csrf", csrf),
      field({ label: L.name, htmlFor: `${id}-name`, formError: fe }, ctl({ type: "text", name: "name", autocomplete: "name", id: `${id}-name` })),
      field({ label: L.username, htmlFor: `${id}-username`, formError: fe }, (f) => group({ gap: "2" }, [
        input({ type: "text", name: "username", autocomplete: "username", required: true, id: `${id}-username`, class: inputSkin(), "data-testid": "field", "aria-describedby": f.describe(L.domain ? `${id}-domain` : undefined), "aria-invalid": f.invalid } as never),
        L.domain ? text({ tag: "span", id: `${id}-domain`, class: textSkin.muted, "data-testid": "domain" }, [L.domain]) : null,
      ])),
      field({ label: L.password, htmlFor: `${id}-password`, hint: L.hint, formError: fe }, ctl({ type: "password", name: "password", autocomplete: "new-password", required: true, id: `${id}-password` })),
      terms === "show" ? group({ gap: "2", class: "w-fit" }, [
        checkbox({ name: "terms", required: true, id: `${id}-terms`, class: checkboxSkin() }),
        label({ for: `${id}-terms`, class: labelSkin("font-normal") }, [L.terms]),
      ]) : null,
      submit(L.submit, "default", "submit"),
    ]),
    L.signinLink ? text({ class: textSkin.muted }, [L.signinText ?? "", " ", link({ href: L.signinHref, class: linkSkin(), "data-testid": "signin-link" }, [L.signinLink])]) : null,
  ]);
}

export function renderAuthflyRequest(p: AuthflyRequestProps): Element {
  const { id, csrf = "", error = "", info = "", labels: L, token = "", kind = "email" } = p; const fe = errOf(id, error);
  return card({ "data-testid": "authfly-request", ...lm(id, p.landmarkLabel) }, [
    head(id, p.title, p.text), ...messages(id, error, info),
    form({ action: p.action, "data-testid": "authfly-form" }, [
      hidden("csrf", csrf),
      kind === "email" ? field({ label: L.field, htmlFor: `${id}-email`, formError: fe }, ctl({ type: "email", name: "email", autocomplete: "email", required: true, id: `${id}-email` })) : null,
      ...(kind === "password" ? [
        hidden("token", token),
        field({ label: L.field, htmlFor: `${id}-password`, formError: fe }, ctl({ type: "password", name: "password", autocomplete: "new-password", required: true, id: `${id}-password` })),
        field({ label: L.confirm ?? "", htmlFor: `${id}-confirm`, formError: fe }, ctl({ type: "password", name: "confirm", autocomplete: "new-password", required: true, id: `${id}-confirm` })),
      ] : []),
      kind === "code" ? field({ label: L.field, htmlFor: `${id}-code`, formError: fe }, ctl({ type: "text", name: "code", inputmode: "numeric", autocomplete: "one-time-code", required: true, id: `${id}-code` })) : null,
      submit(L.submit, "default", "submit"),
    ]),
    L.back ? link({ href: L.backHref, class: linkSkin("w-fit text-sm"), "data-testid": "back" }, [L.back]) : null,
  ]);
}

export function renderAuthflyNotice(p: AuthflyNoticeProps): Element {
  const { id, detail = "", icon = "mail-check", labels: L, actionUrl = "", csrf = "", tone = "default", action = "link" } = p; const err = tone === "error";
  return card({ class: "items-center text-center", "data-testid": "authfly-notice", "data-tone": tone, ...lm(id, p.landmarkLabel) }, [
    iconBadge(icon, err ? "destructive" : "default"),
    head(id, p.title, p.text, "center", err ? "alert" : "status", [detail ? text({ class: "text-sm font-semibold text-foreground", "data-testid": "detail" }, [detail]) : null]),
    action === "form"
      ? form({ action: actionUrl, class: "w-full", "data-testid": "authfly-form" }, [hidden("csrf", csrf), submit(L.cta, "default", "submit")])
      : button({ href: L.ctaHref, class: buttonSkin("default", "w-full"), "data-testid": "cta" }, [L.cta]),
    L.secondary ? link({ href: L.secondaryHref, class: linkSkin("text-sm"), "data-testid": "secondary" }, [L.secondary]) : null,
  ]);
}

export function renderAuthflyConsent(p: AuthflyConsentProps): Element {
  const { id, csrf = "", error = "", info = "", labels: L } = p;
  const decide = (decision: "deny" | "approve", variant: "default" | "outline", lbl: string) =>
    form({ action: p.action, class: "flex-1", "data-testid": decision }, [hidden("csrf", csrf), hidden("decision", decision), button({ type: "submit", class: buttonSkin(variant, "w-full") }, [lbl])]);
  return card({ "data-testid": "authfly-consent", "data-client": p.client, ...lm(id, p.landmarkLabel) }, [
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
  return card({ class: "max-w-lg", "data-testid": "authfly-account", ...lm(id, p.landmarkLabel) }, [
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
