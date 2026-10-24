// Renders the shared parity states (../react/tests/states.json) to <out>/<name>.html.
package main

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/a-h/templ"
	af "github.com/authfly/authkit/packages/ui/templ/authfly"
)

func dec[T any](raw json.RawMessage) T {
	var v T
	if err := json.Unmarshal(raw, &v); err != nil {
		panic(err)
	}
	return v
}

func main() {
	b, err := os.ReadFile(os.Args[1])
	if err != nil {
		panic(err)
	}
	var states []struct {
		Name   string
		Widget string
		Props  json.RawMessage
	}
	if err := json.Unmarshal(b, &states); err != nil {
		panic(err)
	}
	out := os.Args[2]
	os.MkdirAll(out, 0o755)
	for _, s := range states {
		name := s.Name
		var c templ.Component
		switch s.Widget {
		case "AuthflySignIn":
			c = af.AuthflySignIn(dec[af.AuthflySignInProps](s.Props))
		case "AuthflySignUp":
			c = af.AuthflySignUp(dec[af.AuthflySignUpProps](s.Props))
		case "AuthflyRequest":
			c = af.AuthflyRequest(dec[af.AuthflyRequestProps](s.Props))
		case "AuthflyNotice":
			c = af.AuthflyNotice(dec[af.AuthflyNoticeProps](s.Props))
		case "AuthflyConsent":
			c = af.AuthflyConsent(dec[af.AuthflyConsentProps](s.Props))
		case "AuthflyAccount":
			c = af.AuthflyAccount(dec[af.AuthflyAccountProps](s.Props))
		default:
			panic("unknown widget " + s.Widget)
		}
		f, _ := os.Create(filepath.Join(out, name+".html"))
		if err := c.Render(context.Background(), f); err != nil {
			panic(err)
		}
		f.Close()
	}
}
