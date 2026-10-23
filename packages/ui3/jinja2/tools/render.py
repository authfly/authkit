"""Renders the shared parity states (argv[1] = states.json) to argv[2]/<name>.html."""

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from authfly_jinja import environment  # noqa: E402


def block(widget: str) -> str:
    return "blocks/authfly-" + re.sub(r"(?<!^)([A-Z])", r"-\1", widget[7:]).lower() + ".html.j2"


if __name__ == "__main__":
    env = environment()
    os.makedirs(sys.argv[2], exist_ok=True)
    for s in json.load(open(sys.argv[1])):
        with open(os.path.join(sys.argv[2], s["name"] + ".html"), "w") as f:
            f.write(env.get_template(block(s["widget"])).render(p=s["props"]))
