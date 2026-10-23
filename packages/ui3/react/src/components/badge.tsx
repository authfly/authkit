import { Text, type TextProps } from "../ui/text/text";
import { badgeSkin, iconBadgeSkin, type BadgeVariant } from "../skin/skin";
import { LucideIcon } from "./lucide-icon";

export type BadgeProps = Omit<TextProps, "tag"> & { variant?: BadgeVariant };

/** Pill label: Text tag="span". */
export function Badge({ variant = "default", className, ...rest }: BadgeProps) {
  return <Text tag="span" data-slot="badge" className={badgeSkin(variant, className)} {...rest} />;
}

/** Large icon tile for notices. */
export function IconBadge({ icon, tone = "default", className }: { icon: string; tone?: "default" | "destructive"; className?: string }) {
  return (
    <Text tag="span" data-slot="icon-badge" className={iconBadgeSkin(tone, className)}>
      <LucideIcon name={icon} size="lg" />
    </Text>
  );
}
