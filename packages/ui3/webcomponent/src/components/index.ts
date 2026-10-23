// Authfly middle layer for light-DOM web components: render functions over the UI8Kit 3 *.wc.ts primitives.
// Every function returns a real Element (no shadow DOM); classes come from skin/skin.ts (tokens only).
import type { Children } from "../utils/wc";
import { renderBox, type BoxElementProps } from "../ui/box/box.wc";
import { renderText, type TextElementProps } from "../ui/text/text.wc";
import { renderIcon } from "../ui/icon/icon.wc";
import type { IconSize } from "../ui/icon/icon.shared";
import { renderForm } from "../ui/form/form.wc";
import { renderLabel } from "../ui/label/label.wc";
import { cn } from "../utils";
import { alertSkin, badgeSkin, cardSkin, iconBadgeSkin, labelSkin, textSkin, type BadgeVariant, type Tone } from "../skin/skin";
import { LUCIDE } from "./lucide-icons";

const SVG = "http://www.w3.org/2000/svg";

/** Lucide glyph inside the Icon primitive (span carries size + aria-hidden / role="img"). */
export function lucideIcon(name: string, size: IconSize = "sm", label?: string, className?: string): Element {
  const svg = document.createElementNS(SVG, "svg");
  for (const [k, v] of Object.entries({ xmlns: SVG, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", width: "100%", height: "100%", "aria-hidden": "true", focusable: "false" })) svg.setAttribute(k, v);
  for (const [tag, attrs] of LUCIDE[name] ?? LUCIDE["circle"] ?? []) {
    const n = document.createElementNS(SVG, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    svg.appendChild(n);
  }
  return renderIcon({ size, label, class: className, "data-lucide": name }, [svg]);
}

export function card(props: BoxElementProps, children: Children): Element {
  const { class: className, tag = "section", ...rest } = props;
  return renderBox({ tag, ...rest, class: cardSkin(className) }, children);
}

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

export function title(level: 1 | 2 | 3, props: TextElementProps, children: Children): Element {
  const { class: className, ...rest } = props;
  return renderText({ tag: (["h1", "h2", "h3"] as const)[level - 1], ...rest, class: cn(textSkin[level === 1 ? "title" : "subtitle"], className) }, children);
}

export function alert(props: { tone?: Tone; icon?: string; role?: "alert" | "status"; id?: string; class?: string; [k: string]: unknown }, children: Children): Element {
  const { tone = "default", icon, role, class: className, ...rest } = props;
  const kids = [icon ? lucideIcon(icon) : null, ...(Array.isArray(children) ? children : [children])];
  return renderBox({ role: role ?? (tone === "destructive" ? "alert" : "status"), "aria-live": "polite", "data-slot": "alert", ...rest, class: alertSkin(tone, className) }, kids);
}

export function badge(variant: BadgeVariant, props: TextElementProps, children: Children): Element {
  const { class: className, ...rest } = props;
  return renderText({ tag: "span", "data-slot": "badge", ...rest, class: badgeSkin(variant, className) }, children);
}

export function iconBadge(icon: string, tone: "default" | "destructive" = "default"): Element {
  return renderText({ tag: "span", "data-slot": "icon-badge", class: iconBadgeSkin(tone) }, [lucideIcon(icon, "lg")]);
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
