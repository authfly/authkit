import { Show, type JSX } from "solid-js";
import { Box } from "../ui/box/box.solid";
import { alertSkin, type Tone } from "../skin/skin";
import { LucideIcon } from "./lucide-icon";

export type AlertProps = { tone?: Tone; icon?: string; role?: "alert" | "status"; id?: string; class?: string; children?: JSX.Element; "data-testid"?: string };

/** Inline message (error / info). role="alert" for errors, "status" for info; aria-live polite. */
export function Alert(props: AlertProps) {
  const tone = () => props.tone ?? "default";
  return (
    <Box role={props.role ?? (tone() === "destructive" ? "alert" : "status")} aria-live="polite" data-slot="alert" id={props.id} data-testid={props["data-testid"]} class={alertSkin(tone(), props.class)}>
      <Show when={props.icon}>{(i) => <LucideIcon name={i()} />}</Show>
      {props.children}
    </Box>
  );
}
