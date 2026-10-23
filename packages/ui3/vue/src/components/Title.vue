<script setup lang="ts">
import { computed } from "vue";
import Text from "../ui/text/Text.vue";
import { cn } from "../utils";
import { textSkin } from "../skin/skin";
defineOptions({ inheritAttrs: false });
const p = withDefaults(defineProps<{ level?: 1 | 2 | 3; size?: "title" | "subtitle"; class?: string }>(), { level: 1 });
const tag = computed(() => (["h1", "h2", "h3"] as const)[p.level - 1]);
const size = computed(() => p.size ?? (p.level === 1 ? "title" : "subtitle"));
</script>
<template><Text :tag="tag" v-bind="$attrs" :class="cn(textSkin[size], p.class)"><slot /></Text></template>
