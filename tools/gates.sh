#!/usr/bin/env bash
# UI8Kit HTML/ARIA gates (vendored @codegen-x/ui8kit packages/ui-gates, see tools/ui-gates/VENDORED.md).
#   1. source gate: no raw HTML where a UI8Kit primitive exists, Box/Text tag allowlist — every runtime's Authfly layer
#      (CLI-owned ui/ and utils excluded) and the docs site.
#   2. html gate: html-validate + axe-core (jsdom) over the 20 widget states rendered by every runtime.
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd); cd "$root"
G="node tools/ui-gates/bin/ui-gates.mjs"
[ -d tools/ui-gates/node_modules ] || (cd tools/ui-gates && bun install --frozen-lockfile >/dev/null)
U=packages/ui; S=$U/react/tests/states.json; out=${GATES_OUT:-$root/.cache/gates}; rm -rf "$out"; mkdir -p "$out"
src=(); ex=()
for r in react vue svelte solid webcomponent; do src+=("$U/$r/src"); ex+=(--exclude "$U/$r/src/ui"); done
for r in templ twig latte jinja2; do for d in authfly blocks; do [ -d "$U/$r/$d" ] && src+=("$U/$r/$d"); done; done
src+=(site); ex+=(--exclude site/dist)
rc=0
echo "== source gate"; $G source "${src[@]}" "${ex[@]}" || rc=1
echo "== render states"
(cd $U/react && bun tests/render.tsx "$out/react")
for r in vue svelte solid webcomponent; do (cd $U/$r && bun tests/render.ts "$out/$r" >/dev/null); done
(cd $U/templ && go run ./tools/render "$root/$S" "$out/templ" >/dev/null)
for r in twig latte; do (cd $U/$r && php tools/render.php "$root/$S" "$out/$r" >/dev/null); done
(cd $U/jinja2 && python3 tools/render.py "$root/$S" "$out/jinja2" >/dev/null)
# react-dom serialises camelCase prop names (autoComplete, inputMode); HTML attribute names are case-insensitive,
# so the react cases are lower-cased before html-validate (attr-case) sees them.
node -e '
const fs=require("fs"),p=require("path"),o=process.argv[1],c=[];
for(const r of fs.readdirSync(o).sort()) for(const f of fs.readdirSync(p.join(o,r)).sort()) if(f.endsWith(".html")) {let h=fs.readFileSync(p.join(o,r,f),"utf8");if(r==="react")h=h.replace(/<[a-z][^>]*>/g,t=>t.replace(/\s[a-zA-Z][\w:-]*(?==)/g,m=>m.toLowerCase()));c.push({id:r+"/"+f.slice(0,-5),html:h});}
fs.writeFileSync(p.join(o,"cases.json"),JSON.stringify(c));console.log(c.length+" cases");' "$out"
echo "== html gate"; $G html "$out/cases.json" || rc=1
exit $rc
