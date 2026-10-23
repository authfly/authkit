# Vendored: @codegen-x/ui-gates 0.1.0

Source: codegen-x/ui8kit, branch `ui8kit3`, `packages/ui-gates` @ 313885e6 (bin/, src/, package.json copied verbatim; do not edit here —
fix upstream and re-vendor). Deps pinned by `bun.lock` here (html-validate, axe-core, jsdom); `tools/gates.sh` installs them on first run.

Run: `bun run gates` (= `bash tools/gates.sh`) from the repo root:
1. source gate over every runtime's Authfly layer (CLI-owned `ui/` excluded) and `site/` (`site/dist` excluded);
2. html gate (html-validate + axe-core in jsdom) over the 20 widget states rendered by all 9 runtimes (180 cases) into `.cache/gates/`.
