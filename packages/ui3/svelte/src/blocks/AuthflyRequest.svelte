<script lang="ts">
  // AuthflyRequest on UI8Kit 3 primitives (svelte 5). Props identical to packages/ui3/react.
  import Card from "../components/Card.svelte";
  import Form from "../components/Form.svelte";
  import Field from "../components/Field.svelte";
  import Button from "../ui/button/Button.svelte";
  import Link from "../ui/link/Link.svelte";
  import Input from "../ui/input/Input.svelte";
  import WidgetHead from "./WidgetHead.svelte";
  import Messages from "./Messages.svelte";
  import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
  import type { AuthflyRequestProps } from "./props";
  let { id, title, text, action, csrf = "", error = "", info = "", labels, token = "", kind = "email", landmarkLabel }: AuthflyRequestProps = $props();
  const lm = $derived({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
</script>

<Card data-testid="authfly-request" {...lm}>
  <WidgetHead {id} {title} {text} />
  <Messages {id} {error} {info} />
  <Form method="post" {action} errorId={error ? `${id}-error` : undefined} data-testid="authfly-form">
    <Input type="hidden" name="csrf" value={csrf} />
    {#if kind === "email"}
      <Field label={labels.field} htmlFor={`${id}-email`}>
        {#snippet children(f)}<Input type="email" name="email" autocomplete="email" required id={`${id}-email`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />{/snippet}
      </Field>
    {/if}
    {#if kind === "password"}
      <Input type="hidden" name="token" value={token} />
      <Field label={labels.field} htmlFor={`${id}-password`}>
        {#snippet children(f)}<Input type="password" name="password" autocomplete="new-password" required id={`${id}-password`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />{/snippet}
      </Field>
      <Field label={labels.confirm ?? ""} htmlFor={`${id}-confirm`}>
        {#snippet children(f)}<Input type="password" name="confirm" autocomplete="new-password" required id={`${id}-confirm`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />{/snippet}
      </Field>
    {/if}
    {#if kind === "code"}
      <Field label={labels.field} htmlFor={`${id}-code`}>
        {#snippet children(f)}<Input type="text" name="code" inputmode="numeric" autocomplete="one-time-code" required id={`${id}-code`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />{/snippet}
      </Field>
    {/if}
    <Button type="submit" class={buttonSkin("default", "w-full")} data-testid="submit">{labels.submit}</Button>
  </Form>
  {#if labels.back}<Link href={labels.backHref} class={linkSkin("w-fit text-sm")} data-testid="back">{labels.back}</Link>{/if}
</Card>
