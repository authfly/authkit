<script setup lang="ts">
import Box from "../ui/box/Box.vue";
import { cn } from "../utils";
import { gapCls, alignCls, justifyCls, type Gap, type Align, type Justify } from "./layout";
defineOptions({ inheritAttrs: false });
const p = withDefaults(defineProps<{ gap?: Gap; align?: Align; justify?: Justify; class?: string }>(), { gap: "2", align: "center" });
</script>
<template><Box v-bind="$attrs" :class="cn('flex min-w-0', gapCls[p.gap], alignCls[p.align], p.justify && justifyCls[p.justify], p.class)"><slot /></Box></template>
