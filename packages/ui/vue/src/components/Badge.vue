<script setup lang="ts">
import Text from "../ui/text/Text.vue";
import { badgeSkin, type BadgeVariant } from "../skin/skin";
defineOptions({ inheritAttrs: false });
const p = withDefaults(defineProps<{ variant?: BadgeVariant; class?: string }>(), { variant: "default" });
</script>
<template><Text tag="span" data-slot="badge" v-bind="$attrs" :class="badgeSkin(p.variant, p.class)"><slot /></Text></template>
