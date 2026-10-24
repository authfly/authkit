# @authfly/react

Authfly widgets for React on **UI8Kit 3** primitives (CLI `ui8kit` 3.2.1, registry `@ui8kit/registry` 3.2.2). The
reference runtime: every other runtime in `packages/ui/*` renders the same DOM for the 20 states in `tests/states.json`.

| Path | What | Who writes it |
|---|---|---|
| `src/ui/*`, `src/utils/*`, `.cursor/rules/ui8kit-primitives.mdc` | 19 primitives (+ slot) and utils | `npx ui8kit@3 init/add` only — never edit, `npx ui8kit@3 check` guards them |
| `ui8kit.config.json`, `ui8kit.lock.json` | CLI config and lock (registry `@ui8kit/registry` 3.2.2, pinned via `registryVersion`) | CLI only |
| `src/skin/skin.ts` | Authfly skin: class recipes for primitives (tokens only, 8px layout step, 4px inside controls) | Authfly |
| `src/components/*` | middle layer: Card, Stack/Group, Form (Form primitive + error context), Title, Alert, Badge/IconBadge, Field, LucideIcon (+ generated `lucide-icons.ts`) | Authfly |
| `src/blocks/*` | the six widgets; props/types identical to the 0.3.x widgets | Authfly |
| `src/styles/{index,theme}.css` | skin tokens (shadcn neutral, carried over from the 0.3.x theme) | Authfly |
| `tests/*` | SSR smoke tests over the docs-site states | Authfly |

Installed with (from this directory):

```bash
npx ui8kit@3 init --yes --framework react --runtime react --dir src
npx ui8kit@3 add --all --runtime react
npx ui8kit@3 check   # before every commit
```

Scripts: `bun run typecheck`, `bun test`, `bun run css`, `bun run icons` (regenerates `src/components/lucide-icons.ts`).
