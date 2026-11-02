// Shared parts of the Authfly widgets (light-DOM render functions): landmark, head, messages, form controls.
import { renderText as text } from "../ui/text/text.wc";
import { renderButton as button } from "../ui/button/button.wc";
import { renderInput as input } from "../ui/input/input.wc";
import { alert, stack, title } from "../components";
import { buttonSkin, inputSkin, textSkin } from "../skin/skin";

export const lm = (id: string, landmarkLabel?: string) => ({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
export const head = (id: string, t: string, x: string, align: "start" | "center" = "start", role?: "alert" | "status", extra: (Element | null)[] = []) =>
  stack({ gap: "2", align, role }, [title(1, { id: `${id}-title` }, [t]), text({ class: textSkin.muted }, [x]), ...extra]);
export const messages = (id: string, error?: string, info?: string) => [
  error ? alert({ id: `${id}-error`, tone: "destructive", icon: "circle-alert", "data-testid": "authfly-error" }, [error]) : null,
  info ? alert({ tone: "default", icon: "info", "data-testid": "authfly-info" }, [info]) : null,
];
export { hidden } from "../components/field";
export const errOf = (id: string, error?: string) => (error ? `${id}-error` : undefined);
export const ctl = (props: Record<string, unknown>) => (f: { describe: (o?: string) => string | undefined; invalid?: string }) =>
  input({ ...props, class: inputSkin(), "data-testid": "field", "aria-describedby": f.describe(), "aria-invalid": f.invalid } as never);
export const submit = (label: string, variant: "default" | "outline" = "default", testid?: string, kids: (Element | string)[] = []) =>
  button({ type: "submit", class: buttonSkin(variant, "w-full"), "data-testid": testid }, [...kids, label]);
