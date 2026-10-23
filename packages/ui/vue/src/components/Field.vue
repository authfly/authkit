<script setup lang="ts">
// A form field: label, control (default slot), hint and error. The slot receives `describe(ownIds?)` and `invalid`:
// bind them on the control as :aria-describedby / :aria-invalid. describedby = own ids + hint + field error + form error.
import { computed, inject } from "vue";
import Box from "../ui/box/Box.vue";
import Label from "../ui/label/Label.vue";
import Text from "../ui/text/Text.vue";
import { cn } from "../utils";
import { labelSkin, textSkin } from "../skin/skin";
import { FormErrorKey } from "./context";
const p = defineProps<{ label: string; htmlFor: string; hint?: string; error?: string; class?: string }>();
const formError = inject(FormErrorKey, undefined);
const hintId = computed(() => (p.hint ? `${p.htmlFor}-hint` : undefined));
const errorId = computed(() => (p.error ? `${p.htmlFor}-error` : undefined));
const invalid = computed(() => (p.error || formError?.value ? "true" : undefined));
const describe = (own?: string) => [own, hintId.value, errorId.value, formError?.value].filter(Boolean).join(" ") || undefined;
</script>
<template>
  <Box :class="cn('flex min-w-0 flex-col gap-2', p.class)">
    <Label :for="p.htmlFor" :class="labelSkin()">{{ p.label }}</Label>
    <slot :describe="describe" :invalid="invalid" />
    <Text v-if="p.hint" :id="hintId" :class="textSkin.hint">{{ p.hint }}</Text>
    <Text v-if="p.error" :id="errorId" class="text-xs font-semibold text-destructive">{{ p.error }}</Text>
  </Box>
</template>
