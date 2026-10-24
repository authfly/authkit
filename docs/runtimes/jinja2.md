# Jinja2

The Jinja2 widgets live in `packages/ui/jinja2`: UI8Kit 3 primitives installed by `npx ui8kit@3` (CLI 3.2.1, registry 3.3.0; CLI-owned, never edited), the Authfly skin and middle layer, and the six widgets. Python package `authfly-jinja2` (`Jinja2>=3.1,<4`); templates take their props as `p`.

::preview sign-in

The preview is rendered by the templ set; the Jinja2 set renders the same DOM (parity over 20 states, see [Primitives and parity](../codegen.md)).

## Set up

```python
from authfly_jinja import environment   # packages/ui/jinja2 on sys.path

env = environment()
html = env.get_template("blocks/authfly-sign-in.html.j2").render(p={
    "id": "signin", "title": "Sign in", "text": "Welcome back.", "action": "/sign-in", "csrf": csrf,
    "labels": {"identifier": "Email or username", "password": "Password", "submit": "Sign in"},
})
```

Works with Flask, FastAPI and Django (Jinja2 backend): use `environment()` or copy its globals into your environment.

## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend. The Authfly server (github.com/authfly/cli) renders these same widgets as hosted pages.

## Styles

Tailwind v4 from the shared theme, scanning the primitives and the Authfly layer (no `kit.css` in UI8Kit 3):

```css
@import "../packages/ui/react/src/styles/theme.css";
@source "../packages/ui/jinja2";
```
