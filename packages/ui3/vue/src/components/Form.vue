<script setup lang="ts">
// The UI8Kit Form primitive with the Authfly grid; provides the form-level error id to every Field inside.
import { provide, toRef } from "vue";
import UiForm from "../ui/form/Form.vue";
import { cn } from "../utils";
import { FormErrorKey } from "./context";
defineOptions({ inheritAttrs: false });
const p = withDefaults(defineProps<{ method?: "get" | "post"; errorId?: string; class?: string }>(), { method: "post" });
provide(FormErrorKey, toRef(p, "errorId"));
</script>
<template><UiForm v-bind="$attrs" :method="p.method" :class="cn('grid gap-4', p.class)"><slot /></UiForm></template>
