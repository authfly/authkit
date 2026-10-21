# Form contract

## Form fields

Every widget posts a form. The field names are the contract between the widgets and any backend:

- Sign in: `identifier` (username or address), `password`, `csrf`.
- Magic link request: `identifier` (address), `csrf`.
- Sign up: `name`, `username`, `password`, `terms` (checkbox), `csrf`.
- Forgot password: `email`, `csrf`. Reset: `token` (hidden), `password`, `confirm`, `csrf`. Code: `code`, `csrf`.
- Consent: `decision` (hidden, `approve` or `deny`, one form per button), `csrf`.
- Sign out: `csrf`.

Each widget takes `action` (the form URL) and `csrf` (the token value) as props, so you can point it at your own backend.

## States

Every form widget has an `error` slot (an alert above the fields) and keeps the submitted values you pass back as props. The notice widget has the tones `default`, `success` and `error`.

## Capability flags → widget props

The widgets depend only on the `@authfly/core` contract (authfly/authfly), never on a provider. A host reads the
provider's capability flags (`provider.capabilities()`, or `GET /api/v1/capabilities` on an Authfly server) and maps
them with `widgetProps(caps)` from `@authfly/core`:

| Flag | Widget prop |
|---|---|
| `password` | sign-in `method="password"` (else `"magic"`); forgot/reset widgets shown |
| `magicLink` | magic-link form and "check your email" state |
| `social` | sign-in `social="show"` (else `"none"`) |
| `twoFactor` | account methods: "Authenticator app" On / Soon |
| `webauthn` | account methods: "Security key" On / Soon |

`@authfly/core` is an optional peer dependency of the JS widget packages: the widgets are pure props and render
without it; it only supplies the types and the mapping.
