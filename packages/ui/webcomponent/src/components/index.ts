// Authfly middle layer for light-DOM web components: render functions over the UI8Kit 3 *.wc.ts primitives.
// Every function returns a real Element (no shadow DOM); classes come from skin/skin.ts (tokens only).
import type { Children } from "../utils/wc";
import { renderBox } from "../ui/box/box.wc";
import { renderText, type TextElementProps } from "../ui/text/text.wc";
import { renderLabel } from "../ui/label/label.wc";
import { cn } from "../utils";
import { labelSkin, textSkin } from "../skin/skin";
export { alert } from "./alert";
export { badge, iconBadge } from "./badge";
export { card } from "./card";
export { form, group, stack, type FlexProps } from "./layout";
export { lucideIcon } from "./lucide-icon";
export { title } from "./title";

export type FieldControl = { describe: (own?: string) => string | undefined; invalid: "true" | undefined };

/** Label + control + hint + error. `control` receives { describe, invalid } to set aria-describedby / aria-invalid. */
export function field(opts: { label: string; htmlFor: string; hint?: string; error?: string; formError?: string; class?: string }, control: (f: FieldControl) => Element): Element {
  const hintId = opts.hint ? `${opts.htmlFor}-hint` : undefined;
  const errorId = opts.error ? `${opts.htmlFor}-error` : undefined;
  const f: FieldControl = {
    describe: (own) => [own, hintId, errorId, opts.formError].filter(Boolean).join(" ") || undefined,
    invalid: opts.error || opts.formError ? "true" : undefined,
  };
  return renderBox({ class: cn("flex min-w-0 flex-col gap-2", opts.class) }, [
    renderLabel({ for: opts.htmlFor, class: labelSkin() }, [opts.label]),
    control(f),
    opts.hint ? renderText({ id: hintId, class: textSkin.hint }, [opts.hint]) : null,
    opts.error ? renderText({ id: errorId, class: "text-xs font-semibold text-destructive" }, [opts.error]) : null,
  ]);
}
