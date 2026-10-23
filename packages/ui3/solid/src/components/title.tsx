import { splitProps } from "solid-js";
import { Text, type TextProps } from "../ui/text/text.solid";
import { cn } from "../utils";
import { textSkin } from "../skin/skin";

export type TitleProps = Omit<TextProps, "tag"> & { level?: 1 | 2 | 3; size?: "title" | "subtitle" };

/** Heading via the Text primitive (h1..h3). */
export function Title(props: TitleProps) {
  const [l, rest] = splitProps(props, ["level", "size", "class", "className"]);
  const level = () => l.level ?? 1;
  return <Text tag={(["h1", "h2", "h3"] as const)[level() - 1]} {...rest} class={cn(textSkin[l.size ?? (level() === 1 ? "title" : "subtitle")], l.class ?? l.className)} />;
}
