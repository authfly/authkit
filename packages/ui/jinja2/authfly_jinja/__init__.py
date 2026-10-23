"""Authfly widgets for Jinja2 on the UI8Kit 3 primitives (ui/*, ui8kit_jinja — CLI-owned).

`environment()` = ui8kit_jinja.environment(root) + the af_* skin helpers. Render a widget with
`env.get_template("blocks/authfly-sign-in.html.j2").render(p=props)`; props are the xgen/react camelCase props.
All text is passed through props and autoescaped; children markup is only built by authfly/components.html.j2.
"""

from __future__ import annotations

import os
from typing import Any

from jinja2 import Environment
from jinja2.runtime import Undefined
from markupsafe import Markup, escape

import ui8kit_jinja

from . import skin
from .lucide_icons import LUCIDE

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _p(v: Any) -> Any:
    return None if isinstance(v, Undefined) else v


def _attrs(a: Any) -> dict:
    return {k: v for k, v in dict(a or {}).items() if _p(v) is not None and v != ""}


def _describe(*ids: Any) -> str:
    return " ".join(str(i) for i in ids if _p(i))


def environment(root: str | None = None, **options: Any) -> Environment:
    env = ui8kit_jinja.environment(root or ROOT, **options)
    g = env.globals
    g["af_skin"] = lambda name, *a: getattr(skin, name)(*[_p(x) for x in a])
    g["af_text"] = lambda k: skin.TEXT[k]
    g["af_cn"] = lambda *a: skin.cn(*[_p(x) for x in a])
    g["af_gap"] = lambda k, d: skin.GAP[_p(k) or d]
    g["af_align"] = lambda k, d: skin.ALIGN[_p(k) or d]
    g["af_justify"] = lambda k: skin.JUSTIFY[k] if _p(k) else ""
    g["af_lucide"] = lambda n: Markup(LUCIDE.get(n) or LUCIDE["circle"])
    g["af_attrs"] = _attrs
    g["af_describe"] = _describe
    g["af_esc"] = lambda v: escape("" if _p(v) is None else v)
    return env
