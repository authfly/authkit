# Primitives and parity

The widgets are written once per runtime on top of the **UI8Kit 3** primitives (Box, Text, Button, Link, Input,
Label, Checkbox, Form, Separator, Icon and the rest of the 19), installed by the CLI from `@ui8kit/registry` 3.3.0.

## Install (per runtime folder)

```sh
npx ui8kit@3 init --yes --framework <rt> --runtime <rt> --dir <dir> --registry-version 3.3.0
npx ui8kit@3 add --all --runtime <rt> --registry-version 3.3.0
npx ui8kit@3 check        # before every commit: CLI-owned files are unchanged
```

The CLI owns `ui/`, the utils/runtime folder, `ui8kit.config.json` and `ui8kit.lock.json`; they are never edited by hand.

## Single source of the Authfly layer

`packages/shared/src` is the only place to edit the skin recipes (`skin/recipes.ts`, `skin/skin.ts`), the widget prop
types (`blocks/*.types.ts`), the Lucide glyphs (`components/lucide-icons.ts`) and the tokens (`styles/theme.css`).
`bun tools/gen-shared.ts` copies them into the 5 JS runtimes and generates the skin tables and glyphs for templ
(`skin_recipes_gen.go`, `lucide_icons.go`), Twig / Latte (`src/SkinRecipes.php`, `src/lucide-icons.php`) and Jinja2
(`skin_recipes.py`, `lucide_icons.py`); `--check` runs in CI and fails on any hand edit of a generated file.
Middle layer and widgets are still written per runtime; they are packaged as a brand registry (`authfly-lib`, `authfly-components`, widget blocks) with primitives as pinned `@ui8kit/registry@3.3.0` URLs: see [packages/registry](../packages/registry/README.md) (`bun tools/gen-registry.ts`, `bash tools/registry.sh smoke`).

## Layers

- **Skin**: class recipes (`buttonSkin`, `inputSkin`, `badgeSkin`, `alertSkin`, `cardSkin`, …), tokens only, 8px layout step.
  `alertSkin` tones `default | success | warning | destructive` (`--success` / `--warning` tokens in `theme.css`, next to
  `--destructive`); `cardSkin` is the surface only (no width), the widgets add `widgetCardSkin()` (`mx-auto max-w-sm`).
- **Middle layer**: Card, Stack, Group, Form (Form primitive; its error id feeds every Field), Title, Alert, Badge,
  IconBadge, Field (`aria-describedby` = hint + error + form error, `aria-invalid`), LucideIcon (lucide 1.61 glyphs).
- **Widgets**: the six Authfly forms, identical props in every runtime.

## Parity

`packages/ui/react/tests/states.json` holds 20 states (the 16 docs states plus 4 error states). Every runtime renders
them (`tests/render.*` or `tools/render.*`) and `tools/parity.py` compares the HTML with the React output after normalising attribute
order and whitespace: DOM, classes and ARIA must match exactly. Each package also runs its own tests (typecheck,
invariants: unique ids, no dangling ARIA references, error wiring, escaping).

## Gates

`bun run gates` (`tools/gates.sh`, vendored `tools/ui-gates`): the source gate (no raw HTML where a primitive exists,
Box/Text tag allowlist) and html-validate + axe-core over the 20 states rendered by all 9 runtimes; 0 problems required.

## Lint

`bun run lint:px` (`npx ui8px@0.2.5 lint`, policy in `.ui8px/`).
