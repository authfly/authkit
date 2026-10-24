package main

import (
	"github.com/a-h/templ"
	_ "embed"
	"encoding/json"
	blocks "github.com/authfly/authkit/packages/ui/templ/authfly"
)

// Preview is one widget state rendered with the English labels (site/labels.json) for the live previews.
type Preview struct {
	Slug, Name, Note string
	Widget           templ.Component
}

// Previews renders every Authfly widget state the hosted pages use, with sample data and no live service.
func Previews() []Preview {
	s := loadLabels()
	const csrf = "preview"
	notice := func(page, tone, icon, detail string, override map[string]any) templ.Component {
		l := s.lab(page)
		for k, v := range override {
			l[k] = v
		}
		return blocks.AuthflyNotice(blocks.AuthflyNoticeProps{Id: "preview-" + page, Title: s.text(page, "title"), Text: s.text(page, "text"),
			Detail: detail, Icon: icon, Labels: l, Tone: tone, Action: "link"})
	}
	signIn := func(id, page, method, ident, social, err string) templ.Component {
		return blocks.AuthflySignIn(blocks.AuthflySignInProps{Id: id, Title: s.text(page, "title"), Text: s.text(page, "text"), Action: "#",
			Csrf: csrf, Error: err, Labels: s.lab(page), Providers: s.providers(), Method: method, Identifier: ident, Social: social})
	}
	request := func(page, kind, token string) templ.Component {
		return blocks.AuthflyRequest(blocks.AuthflyRequestProps{Id: "preview-" + page, Title: s.text(page, "title"), Text: s.text(page, "text"),
			Action: "#", Csrf: csrf, Labels: s.lab(page), Token: token, Kind: kind})
	}
	scopes := []map[string]any{
		{"id": "openid", "title": "Your account identifier", "text": "openid", "icon": "check"},
		{"id": "email", "title": "Your email address", "text": "email", "icon": "check"},
		{"id": "profile", "title": "Your name", "text": "profile", "icon": "check"},
	}
	errs, _ := s.labels["errors"]["credentials"].(string)
	return []Preview{
		{"sign-in", "Sign in (password)", "Username or email address plus password. Method password, identifier any.", signIn("preview-signin", "signin", "password", "any", "none", "")},
		{"sign-in-error", "Sign in (error state)", "Wrong credentials: the alert is the error slot of every form widget.", signIn("preview-signin-error", "signin", "password", "any", "none", errs)},
		{"sign-in-social", "Sign in with social stubs", "Social providers passed in: one button per provider.", signIn("preview-signin-social", "signin", "password", "email", "show", "")},
		{"magic", "Magic link request", "Email only; the link signs you in to Authfly.", signIn("preview-magic", "magic", "magic", "email", "none", "")},
		{"sign-up", "Sign up", "Name, username, password, terms.", blocks.AuthflySignUp(blocks.AuthflySignUpProps{Id: "preview-signup", Title: s.text("signup", "title"), Text: s.text("signup", "text"), Action: "#", Csrf: csrf, Labels: s.lab("signup"), Terms: "show"})},
		{"check-email", "Check your email", "After sign up, a magic link request or a reset request.", notice("check", "default", "mail-check", "alice@example.com", nil)},
		{"verified", "Email verified / magic link verified", "The verification link landed.", notice("verified", "success", "badge-check", "alice@example.com", nil)},
		{"forgot", "Forgot password", "Asks for the address the reset link goes to.", request("forgot", "email", "")},
		{"reset", "Reset password", "New password and confirmation; the token rides in a hidden field.", request("reset", "password", "token")},
		{"code", "Verification code", "Code entry (kind code), for second factors once an extension is wired.", request("code", "code", "")},
		{"link-error", "Link expired or used", "Error page for expired, used or forged links and failed handoffs.", notice("linkerror", "error", "shield-alert", "", nil)},
		{"sign-out", "Sign out", "Confirms with a POST (CSRF protected).", blocks.AuthflyNotice(blocks.AuthflyNoticeProps{Id: "preview-signout", Title: s.text("signout", "title"), Text: s.text("signout", "text"), Icon: "log-out", Labels: s.lab("signout"), Tone: "default", Action: "form", ActionUrl: "#", Csrf: csrf})},
		{"account", "Account", "Profile, verified badge, sign-in methods (TOTP and WebAuthn shown as stubs) and sign out.", blocks.AuthflyAccount(blocks.AuthflyAccountProps{Id: "preview-account", Title: s.text("account", "title"), Text: "Signed in with a password.", Name: "Alice Example", Email: "alice@example.com", Verified: true, Methods: []map[string]any{
			{"id": "password", "title": "Password", "text": "On", "icon": "key-round"}, {"id": "magic", "title": "Magic link", "text": "On", "icon": "mail"},
			{"id": "totp", "title": "Authenticator app", "text": "Soon", "icon": "smartphone"}, {"id": "webauthn", "title": "Security key", "text": "Soon", "icon": "key"}}, Labels: s.lab("account"), SignoutUrl: "#", Csrf: csrf})},
		{"consent", "OIDC consent handoff", "An application asks to sign you in; allow or deny.", blocks.AuthflyConsent(blocks.AuthflyConsentProps{Id: "preview-consent", Title: s.text("consent", "title"), Text: "Demo app wants to sign you in with your mail account.", Action: "#", Csrf: csrf, Client: "Demo app", Account: "alice@example.com", Scopes: scopes, Labels: s.lab("consent")})},
	}
}

//go:embed labels.json
var labelsJSON []byte

type labels struct{ labels map[string]map[string]any }

func loadLabels() labels {
	var l labels
	if err := json.Unmarshal(labelsJSON, &l.labels); err != nil {
		panic(err)
	}
	return l
}
func (s labels) text(page, key string) string { v, _ := s.labels[page][key].(string); return v }
func (s labels) lab(page string) map[string]any {
	m := map[string]any{}
	if l, ok := s.labels[page]["labels"].(map[string]any); ok {
		for k, v := range l {
			m[k] = v
		}
	}
	return m
}
func (s labels) providers() []map[string]any {
	return []map[string]any{{"id": "github", "title": "Continue with GitHub", "text": "", "icon": "globe"}, {"id": "google", "title": "Continue with Google", "text": "", "icon": "globe"}}
}
