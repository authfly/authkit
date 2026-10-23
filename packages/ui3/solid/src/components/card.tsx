import { splitProps } from "solid-js";
import { Box, type BoxProps } from "../ui/box/box.solid";
import { cardSkin } from "../skin/skin";

/** Widget surface: a <section> landmark with the card skin. */
export function Card(props: BoxProps) {
  const [l, rest] = splitProps(props, ["class", "className", "tag"]);
  return <Box tag={l.tag ?? "section"} {...rest} class={cardSkin(l.class ?? l.className)} />;
}
