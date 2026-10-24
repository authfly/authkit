# Authfly widgets — Jinja2 (UI8Kit 3)

Primitives from `npx ui8kit@3` (CLI 3.2.1, registry 3.2.2):

    npx ui8kit@3 init --yes --framework jinja2 --runtime jinja2 --dir . --registry-version 3.2.2
    npx ui8kit@3 add --all --runtime jinja2 --registry-version 3.2.2
    pip install "Jinja2>=3.1,<4"

Installed from PyPI (`pip install authfly-jinja2`), the templates ship inside the wheel as `authfly_jinja2_templates`
and `environment()` finds them; in a checkout it uses this folder. Build: `python -m build && twine check dist/*`.

`ui/` (templates) and `ui8kit_jinja/` (runtime) are CLI-owned — never edit; `npx ui8kit@3 check`.
Authfly layer: `authfly_jinja/` (`environment()`, `skin.py`, `lucide_icons.py`), `authfly/components.html.j2`
(macros: card, stack, group, form, hidden, title, alert, badge, icon_badge, field, icon, head, messages),
`blocks/authfly-*.html.j2` (same `p` props as the React widgets).

    from authfly_jinja import environment
    html = environment().get_template("blocks/authfly-sign-in.html.j2").render(p=props)

Text is passed via props and autoescaped; children Markup is only built by the macros. Tests:
`python3 -m unittest discover -s tests`; parity HTML: `python3 tools/render.py ../react/tests/states.json /tmp/out`.
