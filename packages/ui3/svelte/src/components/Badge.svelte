<script lang="ts">
  import type { Snippet } from "svelte";
  import Text from "../ui/text/Text.svelte";
  import { badgeSkin, type BadgeVariant } from "../skin/skin";
  let { variant = "default", class: className, children, ...rest }: { variant?: BadgeVariant; class?: string; children?: Snippet; [k: string]: unknown } = $props();
</script>

<Text tag="span" data-slot="badge" {...rest} class={badgeSkin(variant, className)}>{@render children?.()}</Text>
