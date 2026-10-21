# Architecture

```
specs/ (Authfly organisms, blocks, English content)
   │  tools/overlay.py: copied onto a pristine ui8kit/codegen checkout pinned in codegen.lock
   ▼
ui8kit/codegen (xgen build)  ──  parity gate: templ, solid, twig, jinja2, latte render the same DOM as React
   │  tools/export-ui.ts
   ▼
packages/ui/<runtime>  →  @authfly/react, @authfly/vue, @authfly/svelte, @authfly/solid, templ, twig, latte, jinja2 sets
```

- **Widgets**: six forms (sign-in, sign-up, request, notice, account, consent), see [Widgets](widgets.md).
- **Contract**: field names and states shared by all runtimes, see [Form contract](contract.md).
- **No upstream edits**: ui8kit/codegen is used as is; Authfly adds specs only ([Codegen and parity](codegen.md)).
- **Site**: `site/` renders these docs and live templ previews to static HTML.
