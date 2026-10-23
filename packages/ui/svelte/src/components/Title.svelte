<script lang="ts">
  import type { Snippet } from "svelte";
  import Text from "../ui/text/Text.svelte";
  import { cn } from "../utils";
  import { textSkin } from "../skin/skin";
  let { level = 1, size, class: className, children, ...rest }: { level?: 1 | 2 | 3; size?: "title" | "subtitle"; class?: string; children?: Snippet; [k: string]: unknown } = $props();
  const tag = $derived((["h1", "h2", "h3"] as const)[level - 1]);
  const sz = $derived(size ?? (level === 1 ? "title" : "subtitle"));
</script>

<Text {tag} {...rest} class={cn(textSkin[sz], className)}>{@render children?.()}</Text>
