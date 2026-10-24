<script lang="ts">
  // AuthflyNotice on UI8Kit 3 primitives (svelte 5). Props identical to packages/ui/react.
  import Card from "../components/Card.svelte";
  import Form from "../components/Form.svelte";
  import IconBadge from "../components/IconBadge.svelte";
  import Text from "../ui/text/Text.svelte";
  import Button from "../ui/button/Button.svelte";
  import Link from "../ui/link/Link.svelte";
  import Input from "../ui/input/Input.svelte";
  import WidgetHead from "./WidgetHead.svelte";
  import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin, widgetCardSkin } from "../skin/skin";
  import type { AuthflyNoticeProps } from "./props";
  let { id, title, text, detail = "", icon = "mail-check", labels, actionUrl = "", csrf = "", tone = "default", action = "link", landmarkLabel }: AuthflyNoticeProps = $props();
  const lm = $derived({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
</script>

<Card class={widgetCardSkin("items-center text-center")} data-testid="authfly-notice" data-tone={tone} {...lm}>
  <IconBadge {icon} tone={tone === "error" ? "destructive" : "default"} />
  <WidgetHead {id} {title} {text} align="center" role={tone === "error" ? "alert" : "status"}>
    {#if detail}<Text class="text-sm font-semibold text-foreground" data-testid="detail">{detail}</Text>{/if}
  </WidgetHead>
  {#if action === "form"}
    <Form method="post" action={actionUrl} class="w-full" data-testid="authfly-form">
      <Input type="hidden" name="csrf" value={csrf} />
      <Button type="submit" class={buttonSkin("default", "w-full")} data-testid="submit">{labels.cta}</Button>
    </Form>
  {:else}
    <Button href={labels.ctaHref} class={buttonSkin("default", "w-full")} data-testid="cta">{labels.cta}</Button>
  {/if}
  {#if labels.secondary}<Link href={labels.secondaryHref} class={linkSkin("text-sm")} data-testid="secondary">{labels.secondary}</Link>{/if}
</Card>
