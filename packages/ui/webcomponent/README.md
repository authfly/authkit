# @authfly/webcomponent

Authfly widgets as **light-DOM custom elements** on UI8Kit 3 `*.wc.ts` primitives (registry 3.2.2, CLI 3.2.1).
`src/ui`, `src/utils`, `.cursor/rules`, `ui8kit.{config,lock}.json` are CLI-owned (never edit; `npx ui8kit@3 check`).
Authfly code: `src/skin/skin.ts`, `src/components/index.ts` (render functions: card, stack, group, form, title, alert,
badge, iconBadge, field with `{ describe, invalid }`, lucideIcon), `src/blocks/widgets.ts` (renderAuthfly*), `src/define.ts`.

```html
<script type="module" src="/assets/authfly-elements.js"></script>   <!-- bun run build → dist/authfly-elements.js (ESM) -->
<authfly-sign-in props='{"id":"s","title":"Sign in","text":"…","action":"/auth/sign-in","labels":{…},"providers":[]}'></authfly-sign-in>
```

Or set `el.props = {...}`. The bundle is ESM (it exports `defineAuthflyElements`), so load it as a module.
All text (titles, errors) goes through `createTextNode`; nothing is parsed as HTML.

```bash
npx ui8kit@3 init --yes --framework webcomponent --runtime webcomponent --dir src --registry-version 3.2.2
npx ui8kit@3 add --all --runtime webcomponent --registry-version 3.2.2
bun run typecheck && bun run build && bun run test && npx ui8kit@3 check
```
