# Architecture

```
@ui8kit/registry 3.3.0  ──  npx ui8kit@3 init/add (CLI 3.2.1)  ──  19 primitives per runtime (CLI-owned, ui8kit.lock.json)
   │
   ▼
packages/ui/<runtime>: skin (class recipes, tokens) → middle layer (Card, Stack, Group, Form, Title, Alert, Badge,
                       IconBadge, Field, LucideIcon) → the six Authfly widgets
   │  parity: the 20 states of packages/ui/react/tests/states.json render the same DOM as React
   ▼
@authfly/react, @authfly/vue, @authfly/svelte, @authfly/solid, @authfly/webcomponent, templ, twig, latte, jinja2
```

- **Widgets**: six forms (sign-in, sign-up, request, notice, account, consent), see [Widgets](widgets.md).
- **Contract**: field names and states shared by all runtimes, see [Form contract](contract.md).
- **No upstream edits**: the primitives come from the UI8Kit CLI as is; Authfly writes the skin, the middle layer and the widgets ([Primitives and parity](codegen.md)).
- **Site**: `site/` renders these docs and live templ previews to static HTML.
