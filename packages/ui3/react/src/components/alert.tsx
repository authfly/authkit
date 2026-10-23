import type { ReactNode } from "react";
import { Box } from "../ui/box/box";
import { alertSkin, type Tone } from "../skin/skin";
import { LucideIcon } from "./lucide-icon";

export type AlertProps = { tone?: Tone; icon?: string; role?: "alert" | "status"; id?: string; className?: string; children?: ReactNode; "data-testid"?: string };

/** Inline message (error / info). role="alert" for errors, "status" for info; aria-live polite. */
export function Alert({ tone = "default", icon, role = tone === "destructive" ? "alert" : "status", className, children, ...rest }: AlertProps) {
  return (
    <Box role={role} aria-live="polite" data-slot="alert" className={alertSkin(tone, className)} {...rest}>
      {icon ? <LucideIcon name={icon} /> : null}
      {children}
    </Box>
  );
}
