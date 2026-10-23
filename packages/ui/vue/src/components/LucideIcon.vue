<script setup lang="ts">
// Lucide glyph inside the UI8Kit Icon primitive (the span carries size, aria-hidden / role="img").
import { computed } from "vue";
import Icon from "../ui/icon/Icon.vue";
import type { IconSize } from "../ui/icon/icon.shared";
import { LUCIDE } from "./lucide-icons";
const props = withDefaults(defineProps<{ name: string; size?: IconSize; label?: string; class?: string }>(), { size: "sm" });
const nodes = computed(() => LUCIDE[props.name] ?? LUCIDE["circle"] ?? []);
</script>
<template>
  <Icon :size="props.size" :label="props.label" :class="props.class" :data-lucide="props.name">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%" aria-hidden="true" focusable="false">
      <component :is="tag" v-for="([tag, attrs], i) in nodes" :key="i" v-bind="attrs" />
    </svg>
  </Icon>
</template>
