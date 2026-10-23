// Layout helpers: Stack/Group over Box (8px-step gaps) and Form over the Form primitive (+ error context).
import { Box, type BoxProps } from "../ui/box/box";
import { Form as UiForm, type FormProps as UiFormProps } from "../ui/form/form";
import { cn } from "../utils";
import { FormErrorContext } from "./field";

type Gap = "0" | "2" | "4" | "6" | "8";
const gapCls: Record<Gap, string> = { "0": "gap-0", "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8" };
const alignCls = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" } as const;
const justifyCls = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" } as const;

export type StackProps = BoxProps & { gap?: Gap; align?: keyof typeof alignCls; justify?: keyof typeof justifyCls };

/** Vertical flex stack. */
export function Stack({ gap = "4", align = "stretch", justify, className, ...rest }: StackProps) {
  return <Box className={cn("flex flex-col", gapCls[gap], alignCls[align], justify && justifyCls[justify], className)} {...rest} />;
}

/** Horizontal flex row. */
export function Group({ gap = "2", align = "center", justify, className, ...rest }: StackProps) {
  return <Box className={cn("flex min-w-0", gapCls[gap], alignCls[align], justify && justifyCls[justify], className)} {...rest} />;
}

export type FormProps = Omit<UiFormProps, "method"> & {
  method?: "get" | "post";
  /** id of the server error element; every Field inside points aria-describedby at it and sets aria-invalid. */
  errorId?: string;
};

/** The UI8Kit Form primitive with the Authfly grid and the form-level error context. */
export function Form({ method = "post", className, errorId, ...rest }: FormProps) {
  return (
    <FormErrorContext.Provider value={errorId}>
      <UiForm method={method} className={cn("grid gap-4", className)} {...rest} />
    </FormErrorContext.Provider>
  );
}
