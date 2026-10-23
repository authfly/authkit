import { Text, type TextProps } from "../ui/text/text";
import { cn } from "../utils";
import { textSkin } from "../skin/skin";

export type TitleProps = Omit<TextProps, "tag"> & { level?: 1 | 2 | 3; size?: "title" | "subtitle" };

/** Heading via the Text primitive (h1..h3). */
export function Title({ level = 1, size = level === 1 ? "title" : "subtitle", className, ...rest }: TitleProps) {
  const tag = (["h1", "h2", "h3"] as const)[level - 1];
  return <Text tag={tag} className={cn(textSkin[size], className)} {...rest} />;
}
