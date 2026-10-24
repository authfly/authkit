# React

The React widgets live in `packages/ui/react`: UI8Kit 3 primitives installed by `npx ui8kit@3` (CLI 3.2.1, registry 3.3.0; CLI-owned, never edited), the Authfly skin and middle layer, and the six widgets. `@authfly/react` 0.4.0. Imports resolve React, `clsx` and `tailwind-merge` from your app (with Vite, list them in `resolve.dedupe`).

::preview sign-in

The preview is rendered by the templ set; the React set renders the same DOM (parity over 20 states, see [Primitives and parity](../codegen.md)).

## Styles

```css
/* app.css, Tailwind v4 */
@import "../packages/ui/react/src/styles/index.css";
@source "./";
```

## Render a widget

```tsx
import { AuthflySignIn } from "../packages/ui/react/src/authfly";

export function SignIn({ csrf, error }: { csrf: string; error?: string }) {
  return (
    <AuthflySignIn id="signin" title="Sign in" text="Welcome back." action="/auth/sign-in" csrf={csrf} error={error}
      method="password" identifier="any" social="none"
      labels={{ identifier: "Email or username", password: "Password", submit: "Sign in", forgot: "Forgot password?", forgotHref: "/forgot" }} />
  );
}
```
## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend. The Authfly server (github.com/authfly/cli) renders these same widgets as hosted pages.
