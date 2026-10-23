<script lang="ts">
  import Alert from "../components/Alert.svelte";
  let { id, error, info }: { id: string; error?: string; info?: string } = $props();
</script>

{#if error}<Alert id={`${id}-error`} tone="destructive" icon="circle-alert" data-testid="authfly-error">{error}</Alert>{/if}
{#if info}<Alert tone="success" icon="info" data-testid="authfly-info">{info}</Alert>{/if}
