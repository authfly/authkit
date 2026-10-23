// Lucide glyph inside the UI8Kit Icon primitive (the span carries size, aria-hidden / role="img").
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Icon } from "../ui/icon/icon.solid";
import type { IconSize } from "../ui/icon/icon.shared";
import { LUCIDE } from "./lucide-icons";

export type LucideIconProps = { name: string; size?: IconSize; label?: string; class?: string };

export function LucideIcon(props: LucideIconProps) {
  const nodes = () => LUCIDE[props.name] ?? LUCIDE["circle"] ?? [];
  return (
    <Icon size={props.size ?? "sm"} label={props.label} class={props.class} data-lucide={props.name}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%" aria-hidden="true" {...{ focusable: "false" }}>
        <For each={nodes()}>{([tag, attrs]) => <Dynamic component={tag} {...attrs} />}</For>
      </svg>
    </Icon>
  );
}
