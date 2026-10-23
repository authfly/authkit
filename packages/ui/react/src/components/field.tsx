// A form field: label, control (children), hint and error text. `htmlFor` ties the label to the control id.
// The control (the child element whose id === htmlFor, searched two levels deep) gets:
//   aria-describedby = its own ids + `${htmlFor}-hint` + `${htmlFor}-error` + the form-level error (FormErrorContext)
//   aria-invalid="true" when the field has an error or the form reports a server error.
import { Children, cloneElement, createContext, isValidElement, useContext, type ReactElement, type ReactNode } from "react";
import { Box } from "../ui/box/box";
import { Label } from "../ui/label/label";
import { Text } from "../ui/text/text";
import { cn } from "../utils";
import { labelSkin, textSkin } from "../skin/skin";

/** Id of the form-level (server) error element; set by <Form errorId>. */
export const FormErrorContext = createContext<string | undefined>(undefined);

export type FieldProps = { label: string; htmlFor: string; hint?: string; error?: string; className?: string; children?: ReactNode };

type Ctl = ReactElement<{ id?: string; children?: ReactNode; "aria-describedby"?: string; "aria-invalid"?: unknown }>;

function wire(node: ReactNode, id: string, describedBy: string[], invalid: boolean, depth = 0): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement(child)) return child;
    const el = child as Ctl;
    if (el.props.id === id) {
      const ids = [el.props["aria-describedby"], ...describedBy].filter(Boolean).join(" ");
      return cloneElement(el, { "aria-describedby": ids || undefined, "aria-invalid": invalid ? "true" : el.props["aria-invalid"] } as Partial<Ctl["props"]>);
    }
    if (depth < 2 && el.props.children !== undefined) return cloneElement(el, {}, wire(el.props.children, id, describedBy, invalid, depth + 1));
    return el;
  });
}

export function Field({ label, htmlFor, hint, error, className, children }: FieldProps) {
  const formError = useContext(FormErrorContext);
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;
  const describedBy = [hintId, errorId, formError].filter((x): x is string => !!x);
  return (
    <Box className={cn("flex min-w-0 flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className={labelSkin()}>{label}</Label>
      {wire(children, htmlFor, describedBy, !!error || !!formError)}
      {hint ? <Text id={hintId} className={textSkin.hint}>{hint}</Text> : null}
      {error ? <Text id={errorId} className="text-xs font-semibold text-destructive">{error}</Text> : null}
    </Box>
  );
}
