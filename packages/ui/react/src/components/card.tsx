// Widget surface: a <section> landmark (Box) with the card skin.
import { Box, type BoxProps } from "../ui/box/box";
import { cardSkin } from "../skin/skin";

export function Card({ className, tag = "section", ...rest }: BoxProps) {
  return <Box tag={tag} className={cardSkin(className)} {...rest} />;
}
