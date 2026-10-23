// Layout helpers: thin wrappers over the Box primitive with 8px-step gaps. No new DOM semantics.
import type { ReactNode } from "react";
import { Box, type BoxProps } from "../ui/box/box";
import { cn } from "../utils";

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

/** Thin rule. Box has no `hr` tag, so it is a presentational div. */
export function Divider({ className }: { className?: string }) {
  return <Box role="presentation" aria-hidden="true" className={cn("h-px w-full shrink-0 bg-border", className)} />;
}

export type FormProps = Omit<BoxProps, "tag"> & { action?: string; method?: "get" | "post"; children?: ReactNode };

/** <form> through Box tag="form"; BoxProps has no form attributes, they are forwarded untyped (see XGenBot note). */
export function Form({ action, method = "post", className, ...rest }: FormProps) {
  const formAttrs = { action, method } as Record<string, string | undefined>;
  return <Box tag="form" className={cn("grid gap-4", className)} {...formAttrs} {...rest} />;
}
