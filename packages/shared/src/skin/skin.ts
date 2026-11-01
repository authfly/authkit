// Authfly skin: class recipes (./recipes.ts) applied to UI8Kit 3 primitives through `className`.
import { cn } from "../utils";
import { recipe, TEXT } from "./recipes";

export type ButtonVariant = "default" | "outline" | "ghost";
export function buttonSkin(variant: ButtonVariant = "default", className?: string): string {
  return cn(...recipe("button", variant), className);
}

export function linkSkin(className?: string): string {
  return cn(...recipe("link"), className);
}

export function inputSkin(className?: string): string {
  return cn(...recipe("input"), className);
}

export function labelSkin(className?: string): string {
  return cn(...recipe("label"), className);
}

export function checkboxSkin(className?: string): string {
  return cn(...recipe("checkbox"), className);
}

export type BadgeVariant = "default" | "secondary" | "outline";
export function badgeSkin(variant: BadgeVariant = "default", className?: string): string {
  return cn(...recipe("badge", variant), className);
}

export type Tone = "default" | "success" | "warning" | "destructive";
export function alertSkin(tone: Tone = "default", className?: string): string {
  return cn(...recipe("alert", tone), className);
}

export function iconBadgeSkin(tone: "default" | "destructive" = "default", className?: string): string {
  return cn(...recipe("iconBadge", tone), className);
}

export function cardSkin(className?: string): string {
  return cn(...recipe("card"), className);
}

export function widgetCardSkin(className?: string): string {
  return cn(...recipe("widgetCard"), className);
}

export const textSkin = TEXT;
