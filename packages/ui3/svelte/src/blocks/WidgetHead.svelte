<script lang="ts">
  import type { Snippet } from "svelte";
  import Stack from "../components/Stack.svelte";
  import Title from "../components/Title.svelte";
  import Text from "../ui/text/Text.svelte";
  import { textSkin } from "../skin/skin";
  let { id, title, text, align = "start", role, children }: { id: string; title: string; text: string; align?: "start" | "center"; role?: "alert" | "status"; children?: Snippet } = $props();
</script>

<Stack gap="2" {align}>
  <Title level={1} id={`${id}-title`} {role}>{title}</Title>
  <Text class={textSkin.muted}>{text}</Text>
  {@render children?.()}
</Stack>
