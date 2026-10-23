# @authfly/solid-ui3 (pilot)

Authfly widgets for Solid on **UI8Kit 3** primitives (registry 3.2.0, CLI 3.2.1). Same layout as `../react`:
`src/ui`, `src/utils`, `.cursor/rules` and `ui8kit.{config,lock}.json` are CLI-owned (never edit; `npx ui8kit@3 check`);
`src/skin/skin.ts` (shared with react), `src/components/*.tsx` (Card, Stack, Group, Form + error context, Title, Alert,
Badge, IconBadge, Field, LucideIcon), `src/blocks/*.tsx` (six widgets, props in `blocks/props.ts`) are Authfly's.

Field takes a render function `{(f) => <Input aria-describedby={f.describe()} aria-invalid={f.invalid} />}`; Form shares `errorId` via context. Known primitive quirk: classless Input renders `class=""` in SSR.

```bash
npx ui8kit@3 init --yes --framework solid --runtime solid --dir src --registry-version 3.2.0
npx ui8kit@3 add --all --runtime solid --registry-version 3.2.0
bun run typecheck && bun run test && npx ui8kit@3 check
```

`bun run test` SSR-renders the 20 shared states (`../react/tests/states.json`) into `tests/out` and checks them.
