// A form field: label, control, hint and error. `children` is a function receiving { describe, invalid }:
// set them on the control (aria-describedby / aria-invalid). describedby = own ids + hint + field error + form error.
import { Show, useContext, type JSX } from "solid-js";
import { Box } from "../ui/box/box.solid";
import { Label } from "../ui/label/label.solid";
import { Text } from "../ui/text/text.solid";
import { cn } from "../utils";
import { labelSkin, textSkin } from "../skin/skin";
import { FormErrorContext } from "./layout";

export type FieldControl = { describe: (own?: string) => string | undefined; invalid: "true" | undefined };
export type FieldProps = { label: string; htmlFor: string; hint?: string; error?: string; class?: string; children: (f: FieldControl) => JSX.Element };

export function Field(props: FieldProps) {
  const formError = useContext(FormErrorContext);
  const hintId = () => (props.hint ? `${props.htmlFor}-hint` : undefined);
  const errorId = () => (props.error ? `${props.htmlFor}-error` : undefined);
  const ctl: FieldControl = {
    describe: (own) => [own, hintId(), errorId(), formError()].filter(Boolean).join(" ") || undefined,
    get invalid() { return props.error || formError() ? "true" : undefined; },
  };
  return (
    <Box class={cn("flex min-w-0 flex-col gap-2", props.class)}>
      <Label for={props.htmlFor} class={labelSkin()}>{props.label}</Label>
      {props.children(ctl)}
      <Show when={props.hint}><Text id={hintId()} class={textSkin.hint}>{props.hint}</Text></Show>
      <Show when={props.error}><Text id={errorId()} class="text-xs font-semibold text-destructive">{props.error}</Text></Show>
    </Box>
  );
}
