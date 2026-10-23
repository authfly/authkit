<script lang="ts">
  import type { Snippet } from "svelte";
  import Box from "../ui/box/Box.svelte";
  import { cardSkin } from "../skin/skin";
  let { class: className, children, ...rest }: { class?: string; children?: Snippet; [k: string]: unknown } = $props();
</script>

<Box tag="section" {...rest} class={cardSkin(className)}>{@render children?.()}</Box>
