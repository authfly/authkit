# Solid

The Solid widgets live in `packages/ui/solid`: UI8Kit 3 primitives installed by `npx ui8kit@3` (CLI 3.2.1, registry 3.3.0; CLI-owned, never edited), the Authfly skin and middle layer, and the six widgets. `@authfly/solid` 0.4.0.

::preview sign-in

The preview is rendered by the templ set; the Solid set renders the same DOM (parity over 20 states, see [Primitives and parity](../codegen.md)).

## Render a widget

```tsx
import { AuthflySignIn } from "../packages/ui/solid/src/authfly";

export const SignIn = (p: { csrf: string; error?: string }) => (
  <AuthflySignIn id="signin" title="Sign in" text="Welcome back." action="/auth/sign-in" csrf={p.csrf} error={p.error}
    method="password" identifier="any" social="none"
    labels={{ identifier: "Email or username", password: "Password", submit: "Sign in" }} />
);
```

## Styles

Tailwind v4 from the shared theme, scanning the primitives and the Authfly layer (no `kit.css` in UI8Kit 3):

```css
@import "../packages/ui/react/src/styles/theme.css";
@source "../packages/ui/solid/src";
```

## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend. The Authfly server (github.com/authfly/cli) renders these same widgets as hosted pages.
