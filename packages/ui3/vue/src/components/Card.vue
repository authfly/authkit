<script setup lang="ts">
import Box from "../ui/box/Box.vue";
import { cardSkin } from "../skin/skin";
defineOptions({ inheritAttrs: false });
defineProps<{ class?: string }>();
</script>
<template><Box tag="section" v-bind="$attrs" :class="cardSkin($props.class)"><slot /></Box></template>
