<script lang="ts">
  import type { Snippet } from "svelte";
  import Box from "../ui/box/Box.svelte";
  import { cn } from "../utils";
  import { gapCls, alignCls, justifyCls, type Gap, type Align, type Justify } from "./layout";
  let { gap = "2", align = "center", justify, class: className, children, ...rest }: { gap?: Gap; align?: Align; justify?: Justify; class?: string; children?: Snippet; [k: string]: unknown } = $props();
</script>

<Box {...rest} class={cn("flex min-w-0", gapCls[gap], alignCls[align], justify && justifyCls[justify], className)}>{@render children?.()}</Box>
