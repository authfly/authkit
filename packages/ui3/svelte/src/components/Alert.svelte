<script lang="ts">
  import type { Snippet } from "svelte";
  import Box from "../ui/box/Box.svelte";
  import { alertSkin, type Tone } from "../skin/skin";
  import LucideIcon from "./LucideIcon.svelte";
  let { tone = "default", icon, role, class: className, children, ...rest }: { tone?: Tone; icon?: string; role?: "alert" | "status"; class?: string; children?: Snippet; [k: string]: unknown } = $props();
</script>

<Box role={role ?? (tone === "destructive" ? "alert" : "status")} aria-live="polite" data-slot="alert" {...rest} class={alertSkin(tone, className)}>{#if icon}<LucideIcon name={icon} />{/if}{@render children?.()}</Box>
