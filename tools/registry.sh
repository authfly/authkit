#!/usr/bin/env bash
# Authfly brand registry (packages/registry): build + install smoke. Nothing is published anywhere.
#   bash tools/registry.sh build   manifests (tools/codegen.sh registry) -> `ui8kit build` -> packages/registry/r/<rt>/ (gitignored)
#   bash tools/registry.sh smoke   build, serve r/ on 127.0.0.1, then per runtime in a clean dir:
#                                  ui8kit init (primitives @ui8kit/registry@3.3.0 from unpkg) + ui8kit add <every Authfly item>
#                                  from the local server; ui8kit check; installed tree == packages/ui/<rt> (byte-identical);
#                                  render the 20 states from the installed copy; parity with react (tools/parity.py).
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd); cd "$root"
RT=(react vue svelte solid webcomponent templ twig latte jinja2)
CLI=(npx --yes ui8kit@3.4.0)
export UI8KIT_EXPERIMENTAL=webcomponent
P=3.3.0; R=packages/registry; U=packages/ui
build() {
  bash tools/codegen.sh registry
  for r in "${RT[@]}"; do rm -rf "$R/r/$r"; (cd "$U/$r" && "${CLI[@]}" build "../../registry/src/$r/registry.json" -o "../../registry/r/$r" >/dev/null); done
  echo "built $R/r/{${RT[*]}}"
}
[ "${1:-}" = build ] && { build; exit 0; }
[ "${1:-}" = smoke ] || { echo "usage: $0 build|smoke" >&2; exit 2; }
build
port=${PORT:-8765}; python3 -m http.server "$port" -b 127.0.0.1 -d "$R/r" >/dev/null 2>&1 & srv=$!; trap 'kill $srv' EXIT; sleep 1
T=${SMOKE_DIR:-$root/.cache/registry-smoke}; out=$T/out; rm -rf "$T"; mkdir -p "$T/ui" "$out"
for r in "${RT[@]}"; do
  echo "== $r"; d=$T/ui/$r; mkdir -p "$d"; dir=$(jq -r '.dir' "$U/$r/ui8kit.config.json")
  # a consumer brings its own module manifest first: the CLI rewrites Go import paths to the go.mod module
  for m in go.mod go.sum package.json composer.json pyproject.toml; do [ -f "$U/$r/$m" ] && cp "$U/$r/$m" "$d/"; done
  (cd "$d" && "${CLI[@]}" init --yes --framework "$r" --dir "$dir" --registry-url "https://unpkg.com/@ui8kit/registry@$P/r/$r" >/dev/null)
  items=$(jq -r '.items[].name' "$R/src/$r/registry.json" | tr '\n' ' ')
  # bricks the package has installed but no Authfly item uses (dialog, meter, ...) come from the primitives registry directly
  extra=$(jq -r --arg u "https://unpkg.com/@ui8kit/registry@$P/r/$r" '.items[]|select(.name!="utils" and .name!="rules")|"\($u)/components/ui/\(.name).json"' "$U/$r/ui8kit.lock.json" | tr '\n' ' ')
  (cd "$d" && "${CLI[@]}" add $items --registry-url "http://127.0.0.1:$port/$r" --strict-cdn >/dev/null && "${CLI[@]}" add $extra >/dev/null)
  (cd "$d" && "${CLI[@]}" check)
  if [ $r = twig ] || [ $r = latte ]; then
    # ui8kit 3.4.0 limitation: with "dir": "." a target "src/X" is read as a legacy src-root path and installed as X
    # (resolveFileInstallPath). The PHP lib (PSR-4 Authfly\\<Rt>\\ -> src/) is moved back after `check` passed.
    mkdir -p "$d/src"; for f in $(jq -r '.items[]|select(.name=="authfly-lib").files[].target' "$R/src/$r/registry.json"); do mv "$d/${f#src/}" "$d/$f"; done
  fi
  # registry-owned files: every Authfly item file + every file in the package's ui8kit.lock.json
  owned=$( (jq -r '.items[].files[].path' "$R/src/$r/registry.json"; jq -r '.items[].files|keys[]' "$U/$r/ui8kit.lock.json") | sort -u)
  bad=0; for f in $owned; do cmp -s "$U/$r/$f" "$d/$f" || { echo "differs: $r/$f"; bad=1; }; done
  # the package's own files (package.json, go.mod, composer.json, tests, render tools) on top, for rendering
  for f in $(cd "$U/$r" && git ls-files | grep -vxF "$owned"); do mkdir -p "$d/$(dirname "$f")"; cp "$U/$r/$f" "$d/$f"; done
  [ -d "$U/$r/node_modules" ] && ln -s "$root/$U/$r/node_modules" "$d/node_modules"
  [ -f "$d/composer.json" ] && (cd "$d" && composer install -q --no-interaction --no-progress)
  [ $bad = 0 ] || exit 1; echo "$(echo "$owned" | wc -l) installed files == $U/$r"
done
S=$T/ui/react/tests/states.json
(cd $T/ui/react && bun tests/render.tsx "$out/react" >/dev/null)
for r in vue svelte solid webcomponent; do (cd $T/ui/$r && bun tests/render.ts "$out/$r" >/dev/null); done
(cd $T/ui/templ && go run ./tools/render "$S" "$out/templ" >/dev/null)
for r in twig latte; do (cd $T/ui/$r && php tools/render.php "$S" "$out/$r" >/dev/null); done
(cd $T/ui/jinja2 && python3 tools/render.py "$S" "$out/jinja2" >/dev/null)
python3 tools/parity.py "$out"
