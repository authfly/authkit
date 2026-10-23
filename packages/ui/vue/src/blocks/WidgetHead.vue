<script setup lang="ts">
import Stack from "../components/Stack.vue";
import Title from "../components/Title.vue";
import Text from "../ui/text/Text.vue";
import { textSkin } from "../skin/skin";
const p = withDefaults(defineProps<{ id: string; title: string; text: string; align?: "start" | "center"; role?: "alert" | "status" }>(), { align: "start" });
</script>
<template>
  <Stack gap="2" :align="p.align" :role="p.role">
    <Title :level="1" :id="`${p.id}-title`">{{ p.title }}</Title>
    <Text :class="textSkin.muted">{{ p.text }}</Text>
    <slot />
  </Stack>
</template>
