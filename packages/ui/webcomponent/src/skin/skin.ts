// Authfly skin: class recipes applied to UI8Kit 3 primitives through `className`.
// Rules: design tokens only (bg-*, text-*, inset-ring-* from styles/theme.css), layout on the 8px step
// (gap-2/4/6/8, p-4/6/8), 4px steps only inside controls (px-3, h-6 badges). No arbitrary values, no half steps.
import { cn } from "../utils";

export type ButtonVariant = "default" | "outline" | "ghost";
const control = "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded inset-ring font-medium transition-colors";
export function buttonSkin(variant: ButtonVariant = "default", className?: string): string {
  return cn(
    control,
    "h-10 px-4 text-sm disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:inset-ring-ring",
    variant === "default" && "bg-primary text-primary-foreground inset-ring-primary",
    variant === "outline" && "bg-card text-foreground inset-ring-border hover:bg-accent hover:text-accent-foreground",
    variant === "ghost" && "bg-transparent text-foreground inset-ring-transparent hover:bg-accent hover:text-accent-foreground",
    className,
  );
}

export function linkSkin(className?: string): string {
  return cn("inline-flex items-center gap-2 font-semibold text-foreground underline-offset-4 hover:underline focus-visible:underline", className);
}

export function inputSkin(className?: string): string {
  return cn(
    "h-10 w-full min-w-0 rounded bg-background px-3 text-base text-foreground inset-ring inset-ring-input outline-none md:text-sm",
    "focus-visible:inset-ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );
}

export function labelSkin(className?: string): string {
  return cn("text-sm font-semibold text-foreground", className);
}

export function checkboxSkin(className?: string): string {
  return cn("size-4 shrink-0 accent-primary disabled:cursor-not-allowed disabled:opacity-50", className);
}

export type BadgeVariant = "default" | "secondary" | "outline";
export function badgeSkin(variant: BadgeVariant = "default", className?: string): string {
  return cn(
    "inline-flex h-6 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2 text-xs font-medium inset-ring",
    variant === "default" && "bg-primary text-primary-foreground inset-ring-primary",
    variant === "secondary" && "bg-muted text-foreground inset-ring-transparent",
    variant === "outline" && "bg-transparent text-foreground inset-ring-border",
    className,
  );
}

export type Tone = "default" | "success" | "warning" | "destructive";
// Alert is a block, not a control: 8px layout step, py-2 px-4 (one text-xs line + py-2 = the old min-h-8, so a
// one-line alert keeps its 32px height). Tones only recolour text + ring on the shared bg-muted surface.
const alertTone: Record<Tone, string> = {
  default: "text-foreground inset-ring-border",
  success: "text-success inset-ring-success",
  warning: "text-warning inset-ring-warning",
  destructive: "text-destructive inset-ring-destructive",
};
export function alertSkin(tone: Tone = "default", className?: string): string {
  return cn(
    "flex min-h-8 items-start gap-2 rounded bg-muted px-4 py-2 text-xs font-semibold inset-ring",
    alertTone[tone] ?? alertTone.default,
    className,
  );
}

export function iconBadgeSkin(tone: "default" | "destructive" = "default", className?: string): string {
  return cn(
    "inline-flex size-12 shrink-0 items-center justify-center rounded inset-ring",
    tone === "destructive" ? "bg-muted text-destructive inset-ring-destructive" : "bg-muted text-muted-foreground inset-ring-transparent",
    className,
  );
}

// Card surface only (no width, no centring): consumers place it in their own layout.
export function cardSkin(className?: string): string {
  return cn("flex w-full flex-col gap-6 rounded bg-card p-6 text-card-foreground inset-ring inset-ring-border", className);
}

// Width + centring of the six Authfly widgets (sign-in, sign-up, request, notice, consent, account): passed to Card
// as its class, so the widget HTML keeps `mx-auto max-w-sm` (account: max-w-lg).
export function widgetCardSkin(className?: string): string {
  return cn("mx-auto max-w-sm", className);
}

export const textSkin = {
  title: "text-2xl font-bold text-foreground",
  subtitle: "text-sm font-semibold text-foreground",
  muted: "text-sm text-muted-foreground",
  hint: "text-xs text-muted-foreground",
} as const;
