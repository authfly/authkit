# AGENTS.md — authfly/authkit

Authfly widgets on **UI8Kit 3** primitives. Read this before changing anything under `packages/ui`.

## Layout (every `packages/ui/<runtime>`)

- CLI-owned — never edit by hand, never edit `ui8kit.lock.json`: `ui/` (or `src/ui/`), the utils/runtime folder
  (`src/utils`, `utils/`, `runtime/`, `ui8kit_jinja/`), `ui8kit.config.json`, `ui8kit.lock.json`,
  `.cursor/rules/ui8kit-primitives.mdc`. Change them only with `npx ui8kit@3 init/add --registry-version 3.3.0`.
  `npx ui8kit@3 check` must pass before every commit.
- Authfly-owned: skin (class recipes, tokens only), the middle layer (Card, Stack, Group, Form, Title, Alert, Badge,
  IconBadge, Field, LucideIcon), the six widgets (`AuthflySignIn`, `AuthflySignUp`, `AuthflyRequest`, `AuthflyNotice`,
  `AuthflyConsent`, `AuthflyAccount`) and the tests.

## Rules

- Compose from primitives with `className`/`class` and tokens only; no `asChild` outside React; no raw colour values.
- Text always goes through props (escaped); children/`children` HTML is trusted and only built by the middle layer.
- Field wiring: `aria-describedby` = own ids + `<for>-hint` + `<for>-error` + the form error id (`<id>-error`, on the
  destructive Alert); `aria-invalid="true"` when the field or the form shows an error.
- Props are identical in all runtimes (React types are the source of truth). templ keeps `any`-typed props.
- Parity: render `packages/ui/react/tests/states.json` in your runtime and compare with the React output; 0 diffs.
- Lint: `bun run lint:px` (`npx ui8px@0.2.5 lint --ignore 'packages/ui/*/tests/out'`); do not loosen `.ui8px/` policy.
- HTML/ARIA gates: `bun run gates` (`tools/gates.sh`, vendored `tools/ui-gates` from codegen-x/ui8kit@9b70551e, see its VENDORED.md): source gate (no raw HTML where a primitive exists, Box/Text tag allowlist) + html-validate/axe-core over the 20 states × 9 runtimes. Must report 0 problems before a commit. Live-region roles (`status`/`alert`) go on the widget head Stack, never on the heading.
- Primitive bugs: note them (README / report), do not patch CLI-owned files.

## Known primitive notes (registry 3.3.0)

- templ: `InputProps.Value` is `*string` (nil = no attribute, `&""` prints `value=""`).
- Blank optional attributes (`''`/whitespace, `null`/`None`/nil) are omitted in every runtime, `href=""` included;
  only `value` keeps `value=""` (Hidden csrf/token). Attrs/rest win over the primitive's attribute of the same name;
  an unsafe winning URL drops the attribute.
