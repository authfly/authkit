# templ

The templ widgets live in `packages/ui/templ`: UI8Kit 3 primitives installed by `npx ui8kit@3` (CLI 3.2.1, registry 3.2.0; CLI-owned, never edited), the Authfly skin and middle layer, and the six widgets. Go module `github.com/authfly/authkit/packages/ui/templ`; point it at your checkout with a `replace` directive and run `templ generate` there (`*_templ.go` is not committed).

::preview sign-in

The preview is rendered by the templ set; the templ set renders the same DOM (parity over 20 states, see [Primitives and parity](../codegen.md)).

## Module

```text
require github.com/authfly/authkit/packages/ui/templ v0.0.0
replace github.com/authfly/authkit/packages/ui/templ => ./packages/ui/templ
```

## Render a widget

```go
import af "github.com/authfly/authkit/packages/ui/templ/authfly"

c := af.AuthflySignIn(af.AuthflySignInProps{
	Id: "signin", Title: "Sign in", Text: "Welcome back.", Action: "/auth/sign-in", Csrf: csrf,
	Method: "password", Identifier: "any", Social: "none",
	Labels: map[string]any{"identifier": "Email or username", "password": "Password", "submit": "Sign in"},
})
_ = c.Render(ctx, w)
```

The props keep the 0.3 API (`any` fields, labels as `map[string]any`, items as `[]map[string]any`); the package moved from `blocks` to `authfly`, which also exports the middle layer (`af.Card`, `af.Stack`, `af.Group`, `af.Badge`, `af.Alert`, `af.LucideIcon`, `af.ButtonSkin`, …).

## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend. The Authfly server (github.com/authfly/cli) renders these same widgets as hosted pages.

## Styles

Tailwind v4 from the shared theme, scanning the primitives and the Authfly layer (no `kit.css` in UI8Kit 3):

```css
@import "../packages/ui/react/src/styles/theme.css";
@source "../packages/ui/templ/ui";
@source "../packages/ui/templ/authfly";
```
