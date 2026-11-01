"""Authfly skin: the class recipes of packages/shared/src/skin/recipes.ts (tables generated into skin_recipes.py by
tools/gen-shared.ts), merged with the CLI runtime cn."""

from __future__ import annotations

from ui8kit_jinja import runtime as rt

from .skin_recipes import ALIGN, GAP, JUSTIFY, RECIPES, TEXT  # noqa: F401 - re-exported for the environment


def cn(*parts: str | None) -> str:
    return rt.cn([p or "" for p in parts])


def _skin(name: str, variant: str, cls: str | None) -> str:
    """Recipe name + variant (unknown variant: the recipe's fallback, else none) + consumer classes."""
    r = RECIPES[name]
    v = r["variants"].get(variant) or (r["variants"][r["fallback"]] if r["fallback"] else "")
    return cn(*r["base"], v, cls)


def button(variant: str = "default", cls: str | None = None) -> str:
    return _skin("button", variant, cls)


def link(cls: str | None = None) -> str:
    return _skin("link", "", cls)


def input(cls: str | None = None) -> str:  # noqa: A001 - recipe name
    return _skin("input", "", cls)


def label(cls: str | None = None) -> str:
    return _skin("label", "", cls)


def checkbox(cls: str | None = None) -> str:
    return _skin("checkbox", "", cls)


def badge(variant: str = "default", cls: str | None = None) -> str:
    return _skin("badge", variant, cls)


def alert(tone: str = "default", cls: str | None = None) -> str:
    """tone default|success|warning|destructive (unknown = default)."""
    return _skin("alert", tone, cls)


def iconBadge(tone: str = "default", cls: str | None = None) -> str:  # noqa: N802 - same name as other runtimes
    return _skin("iconBadge", tone, cls)


def card(cls: str | None = None) -> str:
    """Card surface only (no width, no centring): consumers place it in their own layout."""
    return _skin("card", "", cls)


def widgetCard(cls: str | None = None) -> str:  # noqa: N802 - same name as other runtimes
    """Width + centring of the six Authfly widgets, passed to card as its class (account: max-w-lg)."""
    return _skin("widgetCard", "", cls)
