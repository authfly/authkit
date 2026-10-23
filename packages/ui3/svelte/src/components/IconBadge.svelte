<script lang="ts">
  import Text from "../ui/text/Text.svelte";
  import { iconBadgeSkin } from "../skin/skin";
  import LucideIcon from "./LucideIcon.svelte";
  let { icon, tone = "default", class: className }: { icon: string; tone?: "default" | "destructive"; class?: string } = $props();
</script>

<Text tag="span" data-slot="icon-badge" class={iconBadgeSkin(tone, className)}><LucideIcon name={icon} size="lg" /></Text>
