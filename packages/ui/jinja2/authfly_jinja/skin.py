"""Authfly skin: the class recipes of ../react/src/skin/skin.ts (tokens only), merged with the CLI runtime cn."""

from __future__ import annotations

from ui8kit_jinja import runtime as rt

CONTROL = "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded inset-ring font-medium transition-colors"
TEXT = {
    "title": "text-2xl font-bold text-foreground",
    "subtitle": "text-sm font-semibold text-foreground",
    "muted": "text-sm text-muted-foreground",
    "hint": "text-xs text-muted-foreground",
}
GAP = {"0": "gap-0", "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8"}
ALIGN = {"start": "items-start", "center": "items-center", "end": "items-end", "stretch": "items-stretch"}
JUSTIFY = {"start": "justify-start", "center": "justify-center", "end": "justify-end", "between": "justify-between"}


def cn(*parts: str | None) -> str:
    return rt.cn([p or "" for p in parts])


def button(variant: str = "default", cls: str | None = None) -> str:
    return cn(
        CONTROL, "h-10 px-4 text-sm disabled:pointer-events-none disabled:opacity-50", "focus-visible:inset-ring-ring",
        "bg-primary text-primary-foreground inset-ring-primary" if variant == "default" else "",
        "bg-card text-foreground inset-ring-border hover:bg-accent hover:text-accent-foreground" if variant == "outline" else "",
        "bg-transparent text-foreground inset-ring-transparent hover:bg-accent hover:text-accent-foreground" if variant == "ghost" else "",
        cls,
    )


def link(cls: str | None = None) -> str:
    return cn("inline-flex items-center gap-2 font-semibold text-foreground underline-offset-4 hover:underline focus-visible:underline", cls)


def input(cls: str | None = None) -> str:  # noqa: A001 - recipe name
    return cn(
        "h-10 w-full min-w-0 rounded bg-background px-3 text-base text-foreground inset-ring inset-ring-input outline-none md:text-sm",
        "placeholder:text-muted-foreground focus-visible:inset-ring-ring disabled:cursor-not-allowed disabled:opacity-50", cls,
    )


def label(cls: str | None = None) -> str:
    return cn("text-sm font-semibold text-foreground", cls)


def checkbox(cls: str | None = None) -> str:
    return cn("size-4 shrink-0 accent-primary disabled:cursor-not-allowed disabled:opacity-50", cls)


def badge(variant: str = "default", cls: str | None = None) -> str:
    return cn(
        "inline-flex h-6 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2 text-xs font-medium inset-ring",
        "bg-primary text-primary-foreground inset-ring-primary" if variant == "default" else "",
        "bg-muted text-foreground inset-ring-transparent" if variant == "secondary" else "",
        "bg-transparent text-foreground inset-ring-border" if variant == "outline" else "",
        cls,
    )


# Alert tones recolour text + ring on the shared bg-muted surface (unknown tone = default).
ALERT_TONE = {
    "default": "text-foreground inset-ring-border",
    "success": "text-success inset-ring-success",
    "warning": "text-warning inset-ring-warning",
    "destructive": "text-destructive inset-ring-destructive",
}


def alert(tone: str = "default", cls: str | None = None) -> str:
    """tone default|success|warning|destructive. Alert is a block, not a control: 8px layout step, py-2 px-4
    (one text-xs line + py-2 = the old min-h-8, so a one-line alert keeps its 32px height)."""
    return cn("flex min-h-8 items-start gap-2 rounded bg-muted px-4 py-2 text-xs font-semibold inset-ring",
              ALERT_TONE.get(tone, ALERT_TONE["default"]), cls)


def iconBadge(tone: str = "default", cls: str | None = None) -> str:  # noqa: N802 - same name as other runtimes
    return cn("inline-flex size-12 shrink-0 items-center justify-center rounded inset-ring",
              "bg-muted text-destructive inset-ring-destructive" if tone == "destructive" else "bg-muted text-muted-foreground inset-ring-transparent", cls)


def card(cls: str | None = None) -> str:
    """Card surface only (no width, no centring): consumers place it in their own layout."""
    return cn("flex w-full flex-col gap-6 rounded bg-card p-6 text-card-foreground inset-ring inset-ring-border", cls)


def widgetCard(cls: str | None = None) -> str:  # noqa: N802 - same name as other runtimes
    """Width + centring of the six Authfly widgets, passed to card as its class (account: max-w-lg)."""
    return cn("mx-auto max-w-sm", cls)
