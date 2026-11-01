#!/usr/bin/env bash
# Copy the built Authfly brand registry into a ui8kit/site checkout: packages/registry/r/<rt>/ -> <site>/r/authfly/<rt>/.
# A push of ui8kit/site main deploys r/ as https://registry.buildy.tw/ (so items are at /authfly/<rt>/index.json).
#   tools/publish-registry.sh <path-to-ui8kit-site-checkout>
# Only r/authfly/ is written (replaced as a whole). Nothing is committed or pushed here: review `git -C <site> status`,
# run the site's checks (bun run registry:validate; scripts/check-schemas.mjs), commit only r/authfly/**, push.
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd); cd "$root"
site=${1:?usage: $0 <ui8kit-site-checkout>}
[ -f "$site/r/vercel.json" ] && [ -d "$site/r/react" ] || { echo "publish: $site is not a ui8kit/site checkout" >&2; exit 1; }
[ -z "$(git status --porcelain)" ] || { echo "publish: authkit working tree not clean" >&2; exit 1; }
bash tools/registry.sh build
rm -rf "$site/r/authfly"; mkdir -p "$site/r/authfly"
cp -R packages/registry/r/. "$site/r/authfly/"
printf 'Authfly brand registry, built from https://github.com/authfly/authkit/tree/%s/packages/registry by tools/publish-registry.sh. Do not edit here.\n' "$(git rev-parse HEAD)" > "$site/r/authfly/SOURCE.txt"
echo "copied to $site/r/authfly/ (authkit $(git rev-parse --short HEAD)); URLs: https://registry.buildy.tw/authfly/<rt>/index.json"
