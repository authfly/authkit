// Authfly middle layer for light-DOM web components: render functions over the UI8Kit 3 *.wc.ts primitives.
// Every function returns a real Element (no shadow DOM); classes come from skin/skin.ts (tokens only).
import type { Children } from "../utils/wc";
import { renderBox, type BoxElementProps } from "../ui/box/box.wc";
import { renderText, type TextElementProps } from "../ui/text/text.wc";
import { renderForm } from "../ui/form/form.wc";
import { renderLabel } from "../ui/label/label.wc";
import { cn } from "../utils";
import { labelSkin, textSkin } from "../skin/skin";
export { alert } from "./alert";
export { badge, iconBadge } from "./badge";
export { card } from "./card";
export { lucideIcon } from "./lucide-icon";
export { title } from "./title";

type Gap = "0" | "2" | "4" | "6" | "8";
const gapCls: Record<Gap, string> = { "0": "gap-0", "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8" };
const alignCls = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" } as const;
const justifyCls = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" } as const;
export type FlexProps = BoxElementProps & { gap?: Gap; align?: keyof typeof alignCls; justify?: keyof typeof justifyCls };
const flex = (base: string, dGap: Gap, dAlign: keyof typeof alignCls) => (props: FlexProps, children: Children): Element => {
  const { gap = dGap, align = dAlign, justify, class: className, ...rest } = props;
  return renderBox({ ...rest, class: cn(base, gapCls[gap], alignCls[align], justify && justifyCls[justify], className) }, children);
};
export const stack = flex("flex flex-col", "4", "stretch");
export const group = flex("flex min-w-0", "2", "center");

/** Form primitive with the Authfly grid. errorId (server error element) is wired into fields by field(). */
export function form(props: { action?: string; method?: "get" | "post"; class?: string; [k: string]: unknown }, children: Children): Element {
  const { method = "post", class: className, ...rest } = props;
  return renderForm({ ...rest, method, class: cn("grid gap-4", className) }, children);
}

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
