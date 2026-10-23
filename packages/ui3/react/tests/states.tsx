import labelsJson from "../../../../site/labels.json";
const L: any = labelsJson;
const t = (p: string, k: string) => L[p]?.[k] ?? "";
const lab = (p: string) => ({ ...(L[p]?.labels ?? {}) });
const csrf = "preview";
const providers = [{ id: "github", title: "Continue with GitHub", text: "", icon: "globe" }, { id: "google", title: "Continue with Google", text: "", icon: "globe" }];
const scopes = [{ id: "openid", title: "Your account identifier", text: "openid", icon: "check" }, { id: "email", title: "Your email address", text: "email", icon: "check" }, { id: "profile", title: "Your name", text: "profile", icon: "check" }];
export function states(W: any): [string, any][] {
  const si = (id: string, page: string, method: string, identifier: string, social: string, error = "") => <W.AuthflySignIn id={id} title={t(page, "title")} text={t(page, "text")} action="#" csrf={csrf} error={error} labels={lab(page)} providers={providers} method={method} identifier={identifier} social={social} />;
  const no = (page: string, tone: string, icon: string, detail: string) => <W.AuthflyNotice id={"preview-" + page} title={t(page, "title")} text={t(page, "text")} detail={detail} icon={icon} labels={lab(page)} tone={tone} action="link" />;
  const rq = (page: string, kind: string, token = "", extra: any = {}) => <W.AuthflyRequest id={"preview-" + page} title={t(page, "title")} text={t(page, "text")} action="#" csrf={csrf} labels={lab(page)} token={token} kind={kind} {...extra} />;
  const su = (extra: any = {}) => <W.AuthflySignUp id="preview-signup" title={t("signup", "title")} text={t("signup", "text")} action="#" csrf={csrf} labels={lab("signup")} terms="show" {...extra} />;
  return [
    ["sign-in", si("preview-signin", "signin", "password", "any", "none")],
    ["sign-in-error", si("preview-signin-error", "signin", "password", "any", "none", L.errors.credentials)],
    ["sign-in-social", si("preview-signin-social", "signin", "password", "email", "show")],
    ["magic", si("preview-magic", "magic", "magic", "email", "none")],
    ["sign-up", su()],
    ["sign-up-error-info", su({ error: "Username taken", info: "Info message", terms: "none" })],
    ["check-email", no("check", "default", "mail-check", "alice@example.com")],
    ["verified", no("verified", "success", "badge-check", "alice@example.com")],
    ["forgot", rq("forgot", "email")],
    ["reset", rq("reset", "password", "token")],
    ["code", rq("code", "code", "", { error: "Wrong code", info: "Code sent" })],
    ["link-error", no("linkerror", "error", "shield-alert", "")],
    ["sign-out", <W.AuthflyNotice id="preview-signout" title={t("signout", "title")} text={t("signout", "text")} icon="log-out" labels={lab("signout")} tone="default" action="form" actionUrl="#" csrf={csrf} />],
    ["account", <W.AuthflyAccount id="preview-account" title={t("account", "title")} text="Signed in with a password." name="Alice Example" email="alice@example.com" verified={true} methods={[{ id: "password", title: "Password", text: "On", icon: "key-round" }, { id: "magic", title: "Magic link", text: "On", icon: "mail" }, { id: "totp", title: "Authenticator app", text: "Soon", icon: "smartphone" }, { id: "webauthn", title: "Security key", text: "Soon", icon: "key" }]} labels={lab("account")} signoutUrl="#" csrf={csrf} />],
    ["account-unverified", <W.AuthflyAccount id="preview-account2" title={t("account", "title")} text="x" name="Bob" email="bob@example.com" verified={false} methods={[]} labels={lab("account")} signoutUrl="#" csrf={csrf} />],
    ["consent", <W.AuthflyConsent id="preview-consent" title={t("consent", "title")} text="Demo app wants to sign you in with your mail account." action="#" csrf={csrf} client="Demo app" account="alice@example.com" scopes={scopes} labels={lab("consent")} />],
  ];
}
