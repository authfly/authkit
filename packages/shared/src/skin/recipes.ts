// Authfly skin recipes: THE single source of the widget classes for all 9 runtimes.
// Rules: design tokens only (bg-*, text-*, inset-ring-* from styles/theme.css), layout on the 8px step
// (gap-2/4/6/8, p-4/6/8), 4px steps only inside controls (px-3, h-6 badges). No arbitrary values, no half steps.
// tools/gen-shared.ts copies this file into the 5 JS runtimes and generates the Go / PHP / Python tables from it.

/** base: class groups in order; variants: one group per variant; fallback: variant used for an unknown one. */
export type Recipe = { base: readonly string[]; variants?: Readonly<Record<string, string>>; fallback?: string };

const control = "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded inset-ring font-medium transition-colors";

export const RECIPES = {
  button: {
    base: [control, "h-10 px-4 text-sm disabled:pointer-events-none disabled:opacity-50", "focus-visible:inset-ring-ring"],
    variants: {
      default: "bg-primary text-primary-foreground inset-ring-primary",
      outline: "bg-card text-foreground inset-ring-border hover:bg-accent hover:text-accent-foreground",
      ghost: "bg-transparent text-foreground inset-ring-transparent hover:bg-accent hover:text-accent-foreground",
    },
  },
  link: { base: ["inline-flex items-center gap-2 font-semibold text-foreground underline-offset-4 hover:underline focus-visible:underline"] },
  input: {
    base: [
      "h-10 w-full min-w-0 rounded bg-background px-3 text-base text-foreground inset-ring inset-ring-input outline-none md:text-sm",
      "focus-visible:inset-ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    ],
  },
  label: { base: ["text-sm font-semibold text-foreground"] },
  checkbox: { base: ["size-4 shrink-0 accent-primary disabled:cursor-not-allowed disabled:opacity-50"] },
  badge: {
    base: ["inline-flex h-6 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2 text-xs font-medium inset-ring"],
    variants: {
      default: "bg-primary text-primary-foreground inset-ring-primary",
      secondary: "bg-muted text-foreground inset-ring-transparent",
      outline: "bg-transparent text-foreground inset-ring-border",
    },
  },
  // Alert is a block, not a control: 8px layout step, py-2 px-4 (one text-xs line + py-2 = the old min-h-8, so a
  // one-line alert keeps its 32px height). Tones only recolour text + ring on the shared bg-muted surface.
  alert: {
    base: ["flex min-h-8 items-start gap-2 rounded bg-muted px-4 py-2 text-xs font-semibold inset-ring"],
    variants: {
      default: "text-foreground inset-ring-border",
      success: "text-success inset-ring-success",
      warning: "text-warning inset-ring-warning",
      destructive: "text-destructive inset-ring-destructive",
    },
    fallback: "default",
  },
  iconBadge: {
    base: ["inline-flex size-12 shrink-0 items-center justify-center rounded inset-ring"],
    variants: {
      default: "bg-muted text-muted-foreground inset-ring-transparent",
      destructive: "bg-muted text-destructive inset-ring-destructive",
    },
    fallback: "default",
  },
  // Card surface only (no width, no centring): consumers place it in their own layout.
  card: { base: ["flex w-full flex-col gap-6 rounded bg-card p-6 text-card-foreground inset-ring inset-ring-border"] },
  // Width + centring of the six Authfly widgets, passed to Card as its class (account: max-w-lg).
  widgetCard: { base: ["mx-auto max-w-sm"] },
} as const satisfies Record<string, Recipe>;

export const TEXT = {
  title: "text-2xl font-bold text-foreground",
  subtitle: "text-sm font-semibold text-foreground",
  muted: "text-sm text-muted-foreground",
  hint: "text-xs text-muted-foreground",
} as const;

export const GAP = { "0": "gap-0", "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8" } as const;
export const ALIGN = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" } as const;
export const JUSTIFY = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" } as const;

/** Class groups of one recipe + variant, in order (the runtimes pass them to their cn). */
export function recipe(name: keyof typeof RECIPES, variant?: string): string[] {
  const r: Recipe = RECIPES[name];
  const v = r.variants ? (r.variants[variant ?? ""] ?? (r.fallback ? r.variants[r.fallback] : undefined)) : undefined;
  return v ? [...r.base, v] : [...r.base];
}
