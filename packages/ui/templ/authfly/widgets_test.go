package authfly

import (
	"bytes"
	"context"
	"encoding/json"
	"os"
	"regexp"
	"strings"
	"testing"

	"github.com/a-h/templ"
)

func render(t *testing.T, c templ.Component) string {
	t.Helper()
	var b bytes.Buffer
	if err := c.Render(context.Background(), &b); err != nil {
		t.Fatal(err)
	}
	return b.String()
}

type state struct {
	Name, Widget string
	Props        json.RawMessage
}

func states(t *testing.T) []state {
	b, err := os.ReadFile("../../react/tests/states.json")
	if err != nil {
		t.Fatal(err)
	}
	var s []state
	if err := json.Unmarshal(b, &s); err != nil {
		t.Fatal(err)
	}
	return s
}

func comp(t *testing.T, s state) templ.Component {
	d := func(v any) {
		if err := json.Unmarshal(s.Props, v); err != nil {
			t.Fatal(err)
		}
	}
	switch s.Widget {
	case "AuthflySignIn":
		var p AuthflySignInProps
		d(&p)
		return AuthflySignIn(p)
	case "AuthflySignUp":
		var p AuthflySignUpProps
		d(&p)
		return AuthflySignUp(p)
	case "AuthflyRequest":
		var p AuthflyRequestProps
		d(&p)
		return AuthflyRequest(p)
	case "AuthflyNotice":
		var p AuthflyNoticeProps
		d(&p)
		return AuthflyNotice(p)
	case "AuthflyConsent":
		var p AuthflyConsentProps
		d(&p)
		return AuthflyConsent(p)
	case "AuthflyAccount":
		var p AuthflyAccountProps
		d(&p)
		return AuthflyAccount(p)
	}
	t.Fatalf("unknown %s", s.Widget)
	return nil
}

var (
	reID   = regexp.MustCompile(` id="([^"]+)"`)
	reDesc = regexp.MustCompile(`aria-describedby="([^"]+)"`)
	reRef  = regexp.MustCompile(`aria-labelledby="([^"]+)"`)
	reFor  = regexp.MustCompile(` for="([^"]+)"`)
	reIn   = regexp.MustCompile(`<input[^>]*>`)
)

// Generic invariants on every parity state (same set as the vue/svelte/solid/webcomponent suites).
func TestStates(t *testing.T) {
	for _, s := range states(t) {
		t.Run(s.Name, func(t *testing.T) {
			h := render(t, comp(t, s))
			ids := map[string]bool{}
			for _, m := range reID.FindAllStringSubmatch(h, -1) {
				if ids[m[1]] {
					t.Errorf("duplicate id %s", m[1])
				}
				ids[m[1]] = true
			}
			for _, re := range []*regexp.Regexp{reDesc, reRef, reFor} {
				for _, m := range re.FindAllStringSubmatch(h, -1) {
					for _, ref := range strings.Fields(m[1]) {
						if !ids[ref] {
							t.Errorf("dangling reference %q", ref)
						}
					}
				}
			}
			if !strings.Contains(h, `aria-label`) {
				t.Error("landmark has no accessible name")
			}
			hasErr := strings.Contains(h, `role="alert"`) && strings.Contains(h, `data-testid="authfly-error"`)
			for _, in := range reIn.FindAllString(h, -1) {
				if strings.Contains(in, `type="hidden"`) || !strings.Contains(in, `data-testid="field"`) {
					continue
				}
				if hasErr && (!strings.Contains(in, `aria-invalid="true"`) || !strings.Contains(in, `-error`)) {
					t.Errorf("field not wired to the form error: %s", in)
				}
				if !hasErr && strings.Contains(in, `aria-invalid`) {
					t.Errorf("aria-invalid without error: %s", in)
				}
			}
		})
	}
}

func TestEscapesText(t *testing.T) {
	h := render(t, AuthflySignIn(AuthflySignInProps{Id: "x", Title: "<b>t</b>", Error: `<img src=x onerror=alert(1)>`, Labels: map[string]any{"submit": "Go"}}))
	if strings.Contains(h, "<img") || strings.Contains(h, "<b>") {
		t.Fatal("props text not escaped")
	}
}

func TestLegacyPropShapes(t *testing.T) {
	h := render(t, AuthflyAccount(AuthflyAccountProps{Id: "a", Verified: true, Labels: map[string]string{"verified": "OK"},
		Methods: []map[string]any{{"id": "pw", "title": "Password", "text": "on"}}}))
	for _, want := range []string{`data-method="pw"`, ">OK<", `data-lucide="shield"`} {
		if !strings.Contains(h, want) {
			t.Errorf("missing %s", want)
		}
	}
}

// Alert tones are tokens on bg-muted with block padding; the card surface has no width, the widgets add it.
func TestSkinAlertTonesAndCardWidth(t *testing.T) {
	for _, tone := range []string{"success", "warning", "destructive"} {
		if c := AlertSkin(tone); !strings.Contains(c, "text-"+tone+" inset-ring-"+tone) || !strings.Contains(c, "bg-muted px-4 py-2") {
			t.Errorf("AlertSkin(%q) = %q", tone, c)
		}
	}
	if c := AlertSkin("default"); !strings.Contains(c, "text-foreground inset-ring-border") {
		t.Errorf("AlertSkin(default) = %q", c)
	}
	if c := CardSkin(); regexp.MustCompile(`mx-auto|max-w-`).MatchString(c) {
		t.Errorf("CardSkin() = %q", c)
	}
	if c := CardSkin(WidgetCardSkin()); !strings.Contains(c, "mx-auto max-w-sm") {
		t.Errorf("CardSkin(WidgetCardSkin()) = %q", c)
	}
	if c := CardSkin(WidgetCardSkin("max-w-lg")); !strings.Contains(c, "mx-auto max-w-lg") {
		t.Errorf("CardSkin(WidgetCardSkin(max-w-lg)) = %q", c)
	}
}
