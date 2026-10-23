<script setup lang="ts">
import Text from "../ui/text/Text.vue";
import { iconBadgeSkin } from "../skin/skin";
import LucideIcon from "./LucideIcon.vue";
const p = withDefaults(defineProps<{ icon: string; tone?: "default" | "destructive"; class?: string }>(), { tone: "default" });
</script>
<template><Text tag="span" data-slot="icon-badge" :class="iconBadgeSkin(p.tone, p.class)"><LucideIcon :name="p.icon" size="lg" /></Text></template>
