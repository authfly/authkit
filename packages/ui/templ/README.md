# Authfly widgets — templ (UI8Kit 3)

Go module `github.com/authfly/authkit/packages/ui/templ`. Primitives installed by `npx ui8kit@3` (CLI 3.2.1, registry 3.2.0):

    npx ui8kit@3 init --yes --framework templ --runtime templ --dir . --registry-version 3.2.0
    npx ui8kit@3 add --all --runtime templ --registry-version 3.2.0
    go get github.com/a-h/templ@v0.3.1070

`ui/` and `utils/` are CLI-owned (never edit; `npx ui8kit@3 check`). The Authfly layer is in `authfly/`:
`skin.go` (class recipes, same as react), `components.templ` (Card, Stack, Group, Form, Title, Alert, Badge,
IconBadge, Field, LucideIcon), `blocks.templ` (AuthflySignIn/SignUp/Request/Notice/Consent/Account).
Props keep the 0.3.x API (`any` fields, labels `map[string]any`, items `[]map[string]any`). All text goes through
props and is escaped; no children HTML. Field wiring: `aria-describedby` = hint + field error + `<id>-error`
(form error), `aria-invalid="true"` when an error is shown.

    go run github.com/a-h/templ/cmd/templ@v0.3.1070 generate && go build ./... && go test ./...

The generated `*_templ.go` files are committed (so `go get` works): regenerate them with templ v0.3.1070 after every `.templ` edit.
    go run ./tools/render ../react/tests/states.json /tmp/out   # parity HTML (20 states)
