# Widgets

Six widgets cover every Authfly screen. Each is a real HTML form (method post) with the field names of the [form contract](contract.md), so it works without JavaScript in every runtime. Below, every state the hosted pages use, rendered live by the templ set; React, Vue, Svelte, Solid, web components, Twig, Latte and Jinja2 render the same DOM (see [Primitives and parity](codegen.md)).

- `AuthflySignIn`: axes `method` (password, magic), `identifier` (any, email, username), `social` (none, show).
- `AuthflySignUp`: axis `terms` (show, none); name, username at your domain, password.
- `AuthflyRequest`: axis `kind` (email: forgot password, password: reset, code: verification code).
- `AuthflyNotice`: axes `tone` (default, success, error) and `action` (link, form): check your email, verified, signed out, sign-out confirmation, errors.
- `AuthflyConsent`: the OIDC handoff, allow or deny.
- `AuthflyAccount`: profile, verified badge, sign-in methods and sign out.

Use the theme toggle in the header to see the dark theme.
