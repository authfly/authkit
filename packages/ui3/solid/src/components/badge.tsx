import { splitProps } from "solid-js";
import { Text, type TextProps } from "../ui/text/text.solid";
import { badgeSkin, iconBadgeSkin, type BadgeVariant } from "../skin/skin";
import { LucideIcon } from "./lucide-icon";

export type BadgeProps = Omit<TextProps, "tag"> & { variant?: BadgeVariant };

/** Pill label: Text tag="span". */
export function Badge(props: BadgeProps) {
  const [l, rest] = splitProps(props, ["variant", "class", "className"]);
  return <Text tag="span" data-slot="badge" {...rest} class={badgeSkin(l.variant ?? "default", l.class ?? l.className)} />;
}

/** Large icon tile for notices. */
export function IconBadge(props: { icon: string; tone?: "default" | "destructive"; class?: string }) {
  return (
    <Text tag="span" data-slot="icon-badge" class={iconBadgeSkin(props.tone ?? "default", props.class)}>
      <LucideIcon name={props.icon} size="lg" />
    </Text>
  );
}
