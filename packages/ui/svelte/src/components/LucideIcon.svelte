<script lang="ts">
  // Lucide glyph inside the UI8Kit Icon primitive (the span carries size, aria-hidden / role="img").
  import Icon from "../ui/icon/Icon.svelte";
  import type { IconSize } from "../ui/icon/icon.shared";
  import { LUCIDE } from "./lucide-icons";
  let { name, size = "sm", label, class: className }: { name: string; size?: IconSize; label?: string; class?: string } = $props();
  const nodes = $derived(LUCIDE[name] ?? LUCIDE["circle"] ?? []);
</script>

<Icon {size} {label} class={className} data-lucide={name}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%" aria-hidden="true" focusable="false">
    {#each nodes as [tag, attrs], i (i)}<svelte:element this={tag} {...attrs} />{/each}
  </svg>
</Icon>
