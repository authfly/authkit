<script lang="ts">
  // AuthflySignUp on UI8Kit 3 primitives (svelte 5). Props identical to packages/ui/react.
  import Card from "../components/Card.svelte";
  import Group from "../components/Group.svelte";
  import Form from "../components/Form.svelte";
  import Field from "../components/Field.svelte";
  import Text from "../ui/text/Text.svelte";
  import Button from "../ui/button/Button.svelte";
  import Link from "../ui/link/Link.svelte";
  import Input from "../ui/input/Input.svelte";
  import Label from "../ui/label/Label.svelte";
  import Checkbox from "../ui/checkbox/Checkbox.svelte";
  import WidgetHead from "./WidgetHead.svelte";
  import Messages from "./Messages.svelte";
  import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
  import type { AuthflySignUpProps } from "./props";
  let { id, title, text, action, csrf = "", error = "", info = "", labels, terms = "show", landmarkLabel }: AuthflySignUpProps = $props();
  const lm = $derived({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
</script>

<Card data-testid="authfly-sign-up" {...lm}>
  <WidgetHead {id} {title} {text} />
  <Messages {id} {error} {info} />
  <Form method="post" {action} errorId={error ? `${id}-error` : undefined} data-testid="authfly-form">
    <Input type="hidden" name="csrf" value={csrf} />
    <Field label={labels.name} htmlFor={`${id}-name`}>
      {#snippet children(f)}<Input type="text" name="name" autocomplete="name" id={`${id}-name`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />{/snippet}
    </Field>
    <Field label={labels.username} htmlFor={`${id}-username`}>
      {#snippet children(f)}
        <Group gap="2">
          <Input type="text" name="username" autocomplete="username" required id={`${id}-username`} class={inputSkin()} data-testid="field" aria-describedby={f.describe(labels.domain ? `${id}-domain` : undefined)} aria-invalid={f.invalid} />
          {#if labels.domain}<Text tag="span" id={`${id}-domain`} class={textSkin.muted} data-testid="domain">{labels.domain}</Text>{/if}
        </Group>
      {/snippet}
    </Field>
    <Field label={labels.password} htmlFor={`${id}-password`} hint={labels.hint}>
      {#snippet children(f)}<Input type="password" name="password" autocomplete="new-password" required id={`${id}-password`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />{/snippet}
    </Field>
    {#if terms === "show"}
      <Group gap="2" class="w-fit">
        <Checkbox name="terms" required id={`${id}-terms`} class={checkboxSkin()} />
        <Label for={`${id}-terms`} class={labelSkin("font-normal")}>{labels.terms}</Label>
      </Group>
    {/if}
    <Button type="submit" class={buttonSkin("default", "w-full")} data-testid="submit">{labels.submit}</Button>
  </Form>
  {#if labels.signinLink}<Text class={textSkin.muted}>{labels.signinText} <Link href={labels.signinHref} class={linkSkin()} data-testid="signin-link">{labels.signinLink}</Link></Text>{/if}
</Card>
