# Svelte

The Svelte widgets live in `packages/ui/svelte`: UI8Kit 3 primitives installed by `npx ui8kit@3` (CLI 3.2.1, registry 3.2.0; CLI-owned, never edited), the Authfly skin and middle layer, and the six widgets. `@authfly/svelte` 0.4.0 (Svelte 5 runes).

::preview sign-in

The preview is rendered by the templ set; the Svelte set renders the same DOM (parity over 20 states, see [Primitives and parity](../codegen.md)).

## Render a widget

```svelte
<script lang="ts">
  import { AuthflySignIn } from "../packages/ui/svelte/src/authfly";
  let { csrf, error = "" } = $props();
</script>
<AuthflySignIn id="signin" title="Sign in" text="Welcome back." action="/auth/sign-in" {csrf} {error}
  method="password" identifier="any" social="none"
  labels={{ identifier: "Email or username", password: "Password", submit: "Sign in" }} />
```

## Styles

Tailwind v4 from the shared theme, scanning the primitives and the Authfly layer (no `kit.css` in UI8Kit 3):

```css
@import "../packages/ui/react/src/styles/theme.css";
@source "../packages/ui/svelte/src";
```

## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend. The Authfly server (github.com/authfly/cli) renders these same widgets as hosted pages.
