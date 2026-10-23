# @authfly/vue

Authfly widgets for Vue 3 on **UI8Kit 3** primitives (registry 3.2.0, CLI 3.2.1). Same layout as `../react`:
`src/ui`, `src/utils`, `.cursor/rules` and `ui8kit.{config,lock}.json` are CLI-owned (never edit; `npx ui8kit@3 check`);
`src/skin/skin.ts` (shared with react), `src/components/*.vue` (Card, Stack, Group, Form + error context, Title, Alert,
Badge, IconBadge, Field, LucideIcon), `src/blocks/*.vue` (six widgets, props in `blocks/props.ts`) are Authfly's.

Field passes `describe(ownIds?)` and `invalid` to its slot; bind them on the control (`:aria-describedby`, `:aria-invalid`).

```bash
npx ui8kit@3 init --yes --framework vue --runtime vue --dir src --registry-version 3.2.0
npx ui8kit@3 add --all --runtime vue --registry-version 3.2.0
bun run typecheck && bun run test && npx ui8kit@3 check
```

`bun run test` SSR-renders the 20 shared states (`../react/tests/states.json`) into `tests/out` and checks them.
