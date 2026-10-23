// Lucide glyph inside the UI8Kit Icon primitive (the span carries size, aria-hidden / role="img").
import { createElement } from "react";
import { Icon } from "../ui/icon/icon";
import type { IconSize } from "../ui/icon/icon.shared";
import { LUCIDE } from "./lucide-icons";

export type LucideIconProps = { name: string; size?: IconSize; label?: string; className?: string };

export function LucideIcon({ name, size = "sm", label, className }: LucideIconProps) {
  const nodes = LUCIDE[name] ?? LUCIDE["circle"] ?? [];
  return (
    <Icon size={size} label={label} className={className} data-lucide={name}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%" aria-hidden="true" focusable="false">
        {nodes.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
      </svg>
    </Icon>
  );
}
