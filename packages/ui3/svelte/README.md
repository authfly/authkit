# @authfly/svelte-ui3 (pilot)

Authfly widgets for Svelte 5 on **UI8Kit 3** primitives (registry 3.2.0, CLI 3.2.1). Same layout as `../react`:
`src/ui`, `src/utils`, `.cursor/rules` and `ui8kit.{config,lock}.json` are CLI-owned (never edit; `npx ui8kit@3 check`);
`src/skin/skin.ts` (shared with react), `src/components/*.svelte` (Card, Stack, Group, Form + error context, Title, Alert,
Badge, IconBadge, Field, LucideIcon), `src/blocks/*.svelte` (six widgets, props in `blocks/props.ts`) are Authfly's.

Field renders its `children` snippet with `{ describe, invalid }`; set them on the control (`aria-describedby`, `aria-invalid`). Form shares `errorId` via context.

```bash
npx ui8kit@3 init --yes --framework svelte --runtime svelte --dir src --registry-version 3.2.0
npx ui8kit@3 add --all --runtime svelte --registry-version 3.2.0
bun run typecheck && bun run test && npx ui8kit@3 check
```

`bun run test` SSR-renders the 20 shared states (`../react/tests/states.json`) into `tests/out` and checks them.
