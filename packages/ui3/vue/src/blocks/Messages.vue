<script setup lang="ts">
import Alert from "../components/Alert.vue";
const p = defineProps<{ id: string; error?: string; info?: string }>();
</script>
<template>
  <Alert v-if="p.error" :id="`${p.id}-error`" tone="destructive" icon="circle-alert" data-testid="authfly-error">{{ p.error }}</Alert>
  <Alert v-if="p.info" tone="success" icon="info" data-testid="authfly-info">{{ p.info }}</Alert>
</template>
