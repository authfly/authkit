# Svelte

The Svelte widgets live in `packages/ui/svelte`: a plain local set (primitives, helpers, styles and the six Authfly widgets), no registry and no CDN. Copy the folder into your app or import it by path. Svelte 5 components (`$props`).

::preview sign-in

The preview is rendered by the templ set; the Svelte set renders the same DOM (codegen parity gate).

## Styles

```css
@import "../packages/ui/svelte/src/styles/index.css";
@source "./";
```

## Render a widget

```svelte
<script lang="ts">
  import { AuthflySignIn } from "../packages/ui/svelte/src/authfly";
  let { csrf, error = "" }: { csrf: string; error?: string } = $props();
</script>

<AuthflySignIn id="signin" title="Sign in" text="Welcome back." action="/auth/sign-in" {csrf} {error}
  method="password" identifier="any" social="none"
  labels={{ identifier: "Email or username", password: "Password", submit: "Sign in", forgot: "Forgot password?", forgotHref: "/forgot" }} />
```
## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend. The Authfly server (github.com/authfly/cli) renders these same widgets as hosted pages.

