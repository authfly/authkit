#!/usr/bin/env bash
# Shared-copy gate: files the 5 JS runtimes keep as byte-identical copies (until they move to a shared registry item).
# Fails on drift and prints which runtime differs from react.   bash tools/copies.sh
set -euo pipefail
cd "$(dirname "$0")/../packages/ui"
rts=(react vue svelte solid webcomponent)
files=(src/skin/skin.ts src/components/lucide-icons.ts src/utils/cn.ts src/styles/theme.css)
for f in react/src/blocks/*.types.ts; do files+=("src/blocks/${f##*/}"); done
rc=0
for f in "${files[@]}"; do
  ref=$(sha256sum < "react/$f")
  for r in "${rts[@]:1}"; do
    if [ ! -f "$r/$f" ]; then echo "copies: $r/$f missing" >&2; rc=1
    elif [ "$(sha256sum < "$r/$f")" != "$ref" ]; then echo "copies: $r/$f differs from react/$f" >&2; diff <(cat "react/$f") "$r/$f" | head -6 >&2 || true; rc=1; fi
  done
done
[ $rc = 0 ] && echo "copies: ${#files[@]} files identical in ${#rts[@]} runtimes"
exit $rc
