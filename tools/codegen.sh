#!/usr/bin/env bash
# Run the pinned authfly/codegen (deps.lock) against this checkout.
#   tools/codegen.sh <shared|widgets|registry|all> [--check]
#   tools/codegen.sh publish <ui8kit-site-checkout>     build the brand registry and copy it into ui8kit/site r/authfly/
# Developing codegen itself: AUTHFLY_DEPS_SRC=<dir with authfly-codegen/> or CODEGEN=<path> to use a local checkout.
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd); cd "$root"
if [ -z "${CODEGEN:-}" ]; then bash tools/deps.sh >/dev/null; CODEGEN=$root/.deps/codegen; fi
if [ "${1:-}" = publish ]; then exec bash "$CODEGEN/scripts/publish-registry.sh" "${2:?site checkout}" "$root"; fi
exec bun "$CODEGEN/src/cli.ts" "$@" --root "$root"
