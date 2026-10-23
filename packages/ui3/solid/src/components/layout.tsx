// Stack/Group over Box (8px-step gaps) and Form over the Form primitive (+ form-level error context).
import { createContext, splitProps, type JSX } from "solid-js";
import { Box, type BoxProps } from "../ui/box/box.solid";
import { Form as UiForm, type FormProps as UiFormProps } from "../ui/form/form.solid";
import { cn } from "../utils";

type Gap = "0" | "2" | "4" | "6" | "8";
const gapCls: Record<Gap, string> = { "0": "gap-0", "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8" };
const alignCls = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" } as const;
const justifyCls = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" } as const;

export type StackProps = BoxProps & { gap?: Gap; align?: keyof typeof alignCls; justify?: keyof typeof justifyCls };

function flex(base: string, dGap: Gap, dAlign: keyof typeof alignCls) {
  return (props: StackProps) => {
    const [l, rest] = splitProps(props, ["gap", "align", "justify", "class", "className"]);
    return <Box {...rest} class={cn(base, gapCls[l.gap ?? dGap], alignCls[l.align ?? dAlign], l.justify && justifyCls[l.justify], l.class ?? l.className)} />;
  };
}
/** Vertical flex stack. */
export const Stack = flex("flex flex-col", "4", "stretch");
/** Horizontal flex row. */
export const Group = flex("flex min-w-0", "2", "center");

/** Id of the form-level (server) error element, provided by <Form errorId>. */
export const FormErrorContext = createContext<() => string | undefined>(() => undefined);

export type FormProps = Omit<UiFormProps, "method"> & { method?: "get" | "post"; errorId?: string; children?: JSX.Element };

/** The UI8Kit Form primitive with the Authfly grid and the form-level error context. */
export function Form(props: FormProps) {
  const [l, rest] = splitProps(props, ["method", "errorId", "class", "className", "children"]);
  return (
    <FormErrorContext.Provider value={() => l.errorId}>
      <UiForm {...rest} method={l.method ?? "post"} class={cn("grid gap-4", l.class ?? l.className)}>{l.children}</UiForm>
    </FormErrorContext.Provider>
  );
}
