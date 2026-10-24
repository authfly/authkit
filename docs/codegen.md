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

## Layers

- **Skin**: class recipes (`buttonSkin`, `inputSkin`, `badgeSkin`, `alertSkin`, `cardSkin`, …), tokens only, 8px layout step.
- **Middle layer**: Card, Stack, Group, Form (Form primitive; its error id feeds every Field), Title, Alert, Badge,
  IconBadge, Field (`aria-describedby` = hint + error + form error, `aria-invalid`), LucideIcon (lucide 1.61 glyphs).
- **Widgets**: the six Authfly forms, identical props in every runtime.

## Parity

`packages/ui/react/tests/states.json` holds 20 states (the 16 docs states plus 4 error states). Every runtime renders
them (`tests/render.*` or `tools/render.*`) and the HTML is compared with the React output after normalising attribute
order and whitespace: DOM, classes and ARIA must match exactly. Each package also runs its own tests (typecheck,
invariants: unique ids, no dangling ARIA references, error wiring, escaping).

## Gates

`bun run gates` (`tools/gates.sh`, vendored `tools/ui-gates`): the source gate (no raw HTML where a primitive exists,
Box/Text tag allowlist) and html-validate + axe-core over the 20 states rendered by all 9 runtimes; 0 problems required.

## Lint

`npx ui8px@latest lint` runs on the rendered HTML (policy in `.ui8px/`, unchanged).
