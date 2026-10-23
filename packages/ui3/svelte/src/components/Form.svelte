<script lang="ts">
  // The UI8Kit Form primitive with the Authfly grid; shares the form-level error id with every Field inside.
  import type { Snippet } from "svelte";
  import UiForm from "../ui/form/Form.svelte";
  import { cn } from "../utils";
  import { setFormError } from "./context";
  let { method = "post", errorId, class: className, children, ...rest }: { method?: "get" | "post"; errorId?: string; class?: string; children?: Snippet; [k: string]: unknown } = $props();
  setFormError(() => errorId);
</script>

<UiForm {...rest} {method} class={cn("grid gap-4", className)}>{@render children?.()}</UiForm>
