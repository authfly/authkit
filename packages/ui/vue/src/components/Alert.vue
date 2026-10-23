<script setup lang="ts">
import Box from "../ui/box/Box.vue";
import { alertSkin, type Tone } from "../skin/skin";
import LucideIcon from "./LucideIcon.vue";
defineOptions({ inheritAttrs: false });
const p = withDefaults(defineProps<{ tone?: Tone; icon?: string; role?: "alert" | "status"; class?: string }>(), { tone: "default" });
</script>
<template>
  <Box :role="p.role ?? (p.tone === 'destructive' ? 'alert' : 'status')" aria-live="polite" data-slot="alert" v-bind="$attrs" :class="alertSkin(p.tone, p.class)">
    <LucideIcon v-if="p.icon" :name="p.icon" /><slot />
  </Box>
</template>
