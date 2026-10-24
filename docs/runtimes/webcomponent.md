# Web components

The web-component widgets live in `packages/ui/webcomponent`: UI8Kit 3 `*.wc.ts` primitives installed by `npx ui8kit@3` (CLI 3.2.1, registry 3.3.0; CLI-owned, never edited), the Authfly skin and render functions, and the six widgets as light-DOM custom elements (`<authfly-sign-in>`, `<authfly-sign-up>`, `<authfly-request>`, `<authfly-notice>`, `<authfly-consent>`, `<authfly-account>`). `@authfly/webcomponent` 0.4.0.

::preview sign-in

The preview is rendered by the templ set; the web components render the same DOM (parity over 20 states, see [Primitives and parity](../codegen.md)).

## Render a widget

`bun run build` writes `dist/authfly-elements.js` (ESM; the bundle must be loaded as a module).

```html
<script type="module" src="/assets/authfly-elements.js"></script>
<authfly-sign-in props='{"id":"signin","title":"Sign in","text":"Welcome back.","action":"/auth/sign-in","method":"password","identifier":"any","social":"none","labels":{"identifier":"Email or username","password":"Password","submit":"Sign in"}}'></authfly-sign-in>
```

Or set `el.props = { ... }` from script. All text goes through text nodes; nothing is parsed as HTML.

## Styles

Tailwind v4 from the shared theme, scanning the primitives and the Authfly layer:

```css
@import "../packages/ui/react/src/styles/theme.css";
@source "../packages/ui/webcomponent/src";
```

## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend.
