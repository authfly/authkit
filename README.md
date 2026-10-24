# Authfly widgets (authfly/authkit)

Sign-in, sign-up, magic link, password reset, account and consent widgets for nine runtimes, built on
**UI8Kit 3** primitives (CLI `npx ui8kit@3` 3.2.1, registry `@ui8kit/registry` 3.2.2) with the same DOM everywhere.

| Runtime | Package / folder |
|---|---|
| React (reference) | `@authfly/react` (`packages/ui/react`) |
| Vue 3 | `@authfly/vue` (`packages/ui/vue`) |
| Svelte 5 | `@authfly/svelte` (`packages/ui/svelte`) |
| Solid | `@authfly/solid` (`packages/ui/solid`) |
| Web components | `@authfly/webcomponent` (`packages/ui/webcomponent`, `<authfly-*>` light-DOM elements) |
| templ (Go) | module `github.com/authfly/authkit/packages/ui/templ` (`packages/ui/templ`) |
| Twig, Latte (PHP) | composer `authfly/twig`, `authfly/latte` (`packages/ui/twig`, `packages/ui/latte`) |
| Jinja2 (Python) | `authfly-jinja2` (`packages/ui/jinja2`) |

Each package has the same layers: CLI-owned primitives (`ui/` + utils/runtime, `ui8kit.config.json`,
`ui8kit.lock.json`, `.cursor/rules/ui8kit-primitives.mdc` — never edited by hand), the Authfly skin (class recipes,
tokens only), the middle layer (Card, Stack/Group, Form with the form-error id, Title, Alert, Badge/IconBadge, Field,
LucideIcon) and the six widgets with identical props. The widgets are plain HTML forms ([form contract](docs/contract.md)):
point `action` at any backend. The Authfly server ([authfly/cli](https://github.com/authfly/cli)) uses the templ set
for its hosted pages.

## Develop

```sh
bun install
cd packages/ui/<runtime> && npx ui8kit@3 check     # CLI-owned files untouched (run before every commit)
# per runtime: see packages/ui/<runtime>/README.md (typecheck, tests, parity render)
npx ui8px@latest lint                               # on rendered HTML (policy in .ui8px/, unchanged)
bun run gates                                       # HTML/ARIA gates (source + rendered HTML, 9 runtimes)
bun run site                                        # docs + live templ previews -> site/dist
```

Parity: every runtime renders the 20 states of `packages/ui/react/tests/states.json`; the HTML (DOM, classes, ARIA) is
compared with the React output. See [docs/codegen.md](docs/codegen.md) and [AGENTS.md](AGENTS.md).

Shadcn tokens (light/dark), Lucide icons, mobile first, 8+4 spacing. MIT, © Auth Fly.

## Gates

HTML/ARIA gates: `bun run gates` (`tools/gates.sh`, vendored `tools/ui-gates` from codegen-x/ui8kit@9b70551e, see its VENDORED.md): source gate (no raw HTML where a primitive exists, Box/Text tag allowlist) + html-validate/axe-core over the 20 states × 9 runtimes. Must report 0 problems before a commit. Live-region roles (`status`/`alert`) go on the widget head Stack, never on the heading.
