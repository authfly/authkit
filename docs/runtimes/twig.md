# Twig

The Twig widgets live in `packages/ui/twig`: UI8Kit 3 primitives installed by `npx ui8kit@3` (CLI 3.2.1, registry 3.2.0; CLI-owned, never edited), the Authfly skin and middle layer, and the six widgets. Composer package `authfly/twig` (PHP 8.2, `twig/twig` ^3); templates take their props as `p`.

::preview sign-in

The preview is rendered by the templ set; the Twig set renders the same DOM (parity over 20 states, see [Primitives and parity](../codegen.md)).

## Set up

```php
require 'vendor/autoload.php';   // twig/twig + PSR-4: UI8Kit\Twig\ => runtime/, Authfly\Twig\ => src/

$twig = new Twig\Environment(new Twig\Loader\FilesystemLoader(__DIR__ . '/packages/ui/twig'));
$twig->addExtension(new UI8Kit\Twig\TwigExtension());
$twig->addExtension(new Authfly\Twig\AuthflyExtension());
echo $twig->render('blocks/authfly-sign-in.html.twig', ['p' => [
    'id' => 'signin', 'title' => 'Sign in', 'text' => 'Welcome back.', 'action' => '/sign-in', 'csrf' => $csrf,
    'method' => 'password', 'identifier' => 'any', 'social' => 'none',
    'labels' => ['identifier' => 'Email or username', 'password' => 'Password', 'submit' => 'Sign in'],
]]);
```

In Symfony, register both extensions as services and add `packages/ui/twig` as a Twig path.

## Backend

The widgets render plain HTML forms; the field names and states are the [form contract](../contract.md). Point `action` at your own route and handle the post in any backend. The Authfly server (github.com/authfly/cli) renders these same widgets as hosted pages.

## Styles

Tailwind v4 from the shared theme, scanning the primitives and the Authfly layer (no `kit.css` in UI8Kit 3):

```css
@import "../packages/ui/react/src/styles/theme.css";
@source "../packages/ui/twig";
```
