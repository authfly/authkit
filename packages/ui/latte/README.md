# Authfly widgets — Latte (UI8Kit 3)

> **Read-only mirror:** [authfly/latte](https://github.com/authfly/latte) is a read-only mirror of `packages/ui/latte`; develop in [authfly/authkit](https://github.com/authfly/authkit) (`tools/split.sh`).

Composer package `authfly/latte`. Primitives from `npx ui8kit@3` (CLI 3.2.1, registry 3.3.0):

    npx ui8kit@3 init --yes --framework latte --runtime latte --dir . --registry-version 3.3.0
    npx ui8kit@3 add --all --runtime latte --registry-version 3.3.0
    composer require "latte/latte:^3.0" && composer dump-autoload

`ui/` (templates) and `runtime/` (`UI8Kit\Latte\*`) are CLI-owned — never edit; `npx ui8kit@3 check`.
Authfly layer: `src/Skin.php` + `src/AuthflyExtension.php` (`af*` functions), `authfly/components.latte`
(`{define}` blocks: card, stack, group, form, hidden, title, alert, badge, iconBadge, field, icon, head, messages),
`blocks/authfly-*.latte` (same `$p` props as the React widgets).

    $latte->addExtension(new Authfly\Latte\AuthflyExtension());
    echo $latte->renderToString('.../blocks/authfly-sign-in.latte', ['p' => $props]);

Text is passed via props and escaped; children Html is only built by the define blocks. Tests: `php tests/widgets_test.php`;
parity HTML: `php tools/render.php ../react/tests/states.json /tmp/out`.
