<script lang="ts" module>
  export type FieldControl = { describe: (own?: string) => string | undefined; invalid: "true" | undefined };
</script>

<script lang="ts">
  // A form field: label, control (children snippet), hint and error. The snippet receives { describe, invalid }:
  // spread them on the control (aria-describedby / aria-invalid). describedby = own ids + hint + field error + form error.
  import type { Snippet } from "svelte";
  import Box from "../ui/box/Box.svelte";
  import Label from "../ui/label/Label.svelte";
  import Text from "../ui/text/Text.svelte";
  import { cn } from "../utils";
  import { labelSkin, textSkin } from "../skin/skin";
  import { getFormError } from "./context";
  let { label, htmlFor, hint, error, class: className, children }: { label: string; htmlFor: string; hint?: string; error?: string; class?: string; children: Snippet<[FieldControl]> } = $props();
  const formError = getFormError();
  const hintId = $derived(hint ? `${htmlFor}-hint` : undefined);
  const errorId = $derived(error ? `${htmlFor}-error` : undefined);
  const ctl: FieldControl = $derived({
    describe: (own?: string) => [own, hintId, errorId, formError].filter(Boolean).join(" ") || undefined,
    invalid: error || formError ? "true" : undefined,
  });
</script>

<Box class={cn("flex min-w-0 flex-col gap-2", className)}>
  <Label for={htmlFor} class={labelSkin()}>{label}</Label>
  {@render children(ctl)}
  {#if hint}<Text id={hintId} class={textSkin.hint}>{hint}</Text>{/if}
  {#if error}<Text id={errorId} class="text-xs font-semibold text-destructive">{error}</Text>{/if}
</Box>
