// A form field: label, control (children), hint and error text. `htmlFor` ties the label to the control id.
// Pass `hintId`/`errorId` to the control's aria-describedby when you render a hint or an error.
import type { ReactNode } from "react";
import { Box } from "../ui/box/box";
import { Label } from "../ui/label/label";
import { Text } from "../ui/text/text";
import { cn } from "../utils";
import { labelSkin, textSkin } from "../skin/skin";

export type FieldProps = { label: string; htmlFor: string; hint?: string; error?: string; className?: string; children?: ReactNode };

export function Field({ label, htmlFor, hint, error, className, children }: FieldProps) {
  return (
    <Box className={cn("flex min-w-0 flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className={labelSkin()}>{label}</Label>
      {children}
      {hint ? <Text id={`${htmlFor}-hint`} className={textSkin.hint}>{hint}</Text> : null}
      {error ? <Text id={`${htmlFor}-error`} role="alert" className="text-xs font-semibold text-destructive">{error}</Text> : null}
    </Box>
  );
}
