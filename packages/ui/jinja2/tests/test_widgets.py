"""Generic invariants on the 20 shared parity states (same set as the other runtimes) + escaping."""

import json
import os
import re
import sys
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "tools"))
from render import block, environment  # noqa: E402

ENV = environment()
STATES = json.load(open(os.path.join(HERE, "..", "..", "react", "tests", "states.json")))


def render(widget, props):
    return ENV.get_template(block(widget)).render(p=props)


class Widgets(unittest.TestCase):
    def test_states(self):
        for s in STATES:
            with self.subTest(s["name"]):
                h = render(s["widget"], s["props"])
                ids = re.findall(r' id="([^"]+)"', h)
                self.assertEqual(len(ids), len(set(ids)), "duplicate id")
                for a in ("aria-describedby", "aria-labelledby", "for"):
                    for refs in re.findall(r" %s=\"([^\"]+)\"" % a, h):
                        for ref in refs.split():
                            self.assertIn(ref, ids, f"dangling {a} {ref}")
                self.assertIn("aria-label", h)
                has_err = 'data-testid="authfly-error"' in h
                for inp in re.findall(r"<input[^>]*>", h, re.S):
                    if 'data-testid="field"' not in inp:
                        continue
                    if has_err:
                        self.assertIn('aria-invalid="true"', inp)
                        self.assertIn("-error", inp)
                    else:
                        self.assertNotIn("aria-invalid", inp)

    def test_escapes_text(self):
        h = render("AuthflySignIn", {"id": "x", "title": "<b>t</b>", "error": "<img src=x onerror=alert(1)>", "labels": {"submit": "Go", "forgot": "<i>"}})
        for bad in ("<img", "<b>", "<i>"):
            self.assertNotIn(bad, h)


class Skin(unittest.TestCase):
    def test_alert_tones_and_card_width(self):
        from authfly_jinja import skin
        for t in ("success", "warning", "destructive"):
            self.assertIn(f"text-{t} inset-ring-{t}", skin.alert(t))
            self.assertIn("bg-muted px-4 py-2", skin.alert(t))
        self.assertIn("text-foreground inset-ring-border", skin.alert("default"))
        self.assertNotRegex(skin.card(), r"mx-auto|max-w-")
        self.assertIn("mx-auto max-w-sm", skin.card(skin.widgetCard()))
        self.assertIn("mx-auto max-w-lg", skin.card(skin.widgetCard("max-w-lg")))


if __name__ == "__main__":
    unittest.main()
