#!/usr/bin/env python3
"""Parity gate: every runtime's rendered states must equal the React output.
Usage: tools/parity.py <dir with one sub-folder of <state>.html per runtime>   (tools/gates.sh writes it)
Normalised: attribute order and name case, whitespace between/inside text, class token order, boolean attribute values.
Everything else (DOM, attributes, classes, ARIA, text) must match exactly."""
import os, sys, difflib
from html.parser import HTMLParser

class Norm(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.out = []
    def _attrs(self, attrs):
        a = []
        for k, v in attrs:
            k = k.lower(); v = "" if v is None else v
            if k == "class": v = " ".join(sorted(v.split()))
            if v == k: v = ""  # required="required" == required=""
            a.append(f'{k}="{v}"')
        return " ".join(sorted(a))
    def handle_starttag(self, t, attrs): self.out.append(f"<{t} {self._attrs(attrs)}>")
    def handle_startendtag(self, t, attrs): self.out.append(f"<{t} {self._attrs(attrs)}/>")
    def handle_endtag(self, t): self.out.append(f"</{t}>")
    def handle_data(self, d):
        d = " ".join(d.split())
        if d: self.out.append(d)

def norm(path):
    p = Norm(); p.feed(open(path, encoding="utf-8").read()); p.close()
    return [x.replace("/>", ">") for x in p.out]

def main(root):
    ref = "react"; rc = 0
    states = sorted(f for f in os.listdir(os.path.join(root, ref)) if f.endswith(".html"))
    runtimes = sorted(d for d in os.listdir(root) if os.path.isdir(os.path.join(root, d)) and d != ref)
    for rt in runtimes:
        bad = 0
        for st in states:
            f = os.path.join(root, rt, st)
            if not os.path.exists(f): print(f"parity: {rt}/{st} missing"); rc = bad = 1; continue
            a, b = norm(os.path.join(root, ref, st)), norm(f)
            if a != b:
                rc = 1; bad += 1
                d = [l for l in difflib.unified_diff(a, b, "react", rt, n=0, lineterm="") if l[:1] in "+-" and l[:3] not in ("+++", "---")]
                print(f"parity: {rt}/{st} differs from react:"); [print("   ", l[:200]) for l in d[:6]]
        print(f"parity: {rt} {len(states) - bad}/{len(states)} states equal to react")
    return rc

if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else ".cache/gates"))
