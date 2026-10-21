# Jinja2

The Jinja2 widgets live in `packages/ui/jinja2`: a plain local set (primitives, helpers, styles and the six Authfly widgets), no registry and no CDN. Copy the folder into your app or import it by path. Templates take their props as `p`; `ui8kit_jinja.environment(root)` returns an Environment with the `ui_*` helpers. Requires Jinja2 3.1.

::preview sign-in

The preview is rendered by the templ set; the Jinja2 set renders the same DOM (codegen parity gate).

## Set up

```python
import sys
sys.path.insert(0, "packages/ui/jinja2/py")
from ui8kit_jinja import environment

env = environment("packages/ui/jinja2")
html = env.get_template("blocks/authfly-sign-in.html.j2").render(p={
    "id": "signin", "title": "Sign in", "text": "Welcome back.", "action": "/sign-in", "csrf": csrf,
    "method": "password", "identifier": "any", "social": "none",
    "labels": {"identifier": "Email or username", "password": "Password", "submit": "Sign in"},
})
```

## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend. The Authfly server (github.com/authfly/cli) renders these same widgets as hosted pages.

## Styles

The server-side sets ship templates only. Build the CSS with Tailwind v4 from the shared theme and scan the templates:

```css
@import "../packages/ui/react/src/styles/theme.css";
@import "../packages/ui/react/src/styles/kit.css";
@source "../packages/ui/jinja2";
```
