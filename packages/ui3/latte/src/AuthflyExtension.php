<?php
declare(strict_types=1);

namespace Authfly\Latte;

use Latte\Extension;
use Latte\Runtime\Html;

/** Authfly skin helpers (af*) for the Latte blocks; primitives are the CLI-owned ui/*.latte templates. */
final class AuthflyExtension extends Extension
{
    public function getFunctions(): array
    {
        return [
            'afSkin' => static fn (string $name, mixed ...$args): string => Skin::$name(...$args),
            'afText' => static fn (string $k): string => Skin::TEXT[$k],
            'afCn' => [Skin::class, 'cn'],
            'afGap' => static fn (?string $k, string $d): string => Skin::GAP[$k ?: $d],
            'afAlign' => static fn (?string $k, string $d): string => Skin::ALIGN[$k ?: $d],
            'afJustify' => static fn (?string $k): string => $k ? Skin::JUSTIFY[$k] : '',
            'afLucide' => static fn (string $n): Html => new Html(Skin::lucide($n)),
            'afAttrs' => [Skin::class, 'attrs'],
            'afDescribe' => [Skin::class, 'describe'],
            'afEsc' => static fn (mixed $v): Html => new Html(htmlspecialchars((string) ($v ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')),
        ];
    }
}
