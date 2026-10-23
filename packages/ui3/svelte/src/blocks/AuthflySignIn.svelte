<script lang="ts">
  // AuthflySignIn on UI8Kit 3 primitives (svelte 5). Props identical to packages/ui3/react.
  import Card from "../components/Card.svelte";
  import Stack from "../components/Stack.svelte";
  import Form from "../components/Form.svelte";
  import Field from "../components/Field.svelte";
  import LucideIcon from "../components/LucideIcon.svelte";
  import Text from "../ui/text/Text.svelte";
  import Button from "../ui/button/Button.svelte";
  import Link from "../ui/link/Link.svelte";
  import Input from "../ui/input/Input.svelte";
  import WidgetHead from "./WidgetHead.svelte";
  import Messages from "./Messages.svelte";
  import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
  import type { AuthflySignInProps } from "./props";
  let { id, title, text, action, csrf = "", error = "", labels, providers, method = "password", identifier = "any", social = "none", landmarkLabel }: AuthflySignInProps = $props();
  const lm = $derived({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
</script>

<Card data-testid="authfly-sign-in" {...lm}>
  <WidgetHead {id} {title} {text} />
  <Messages {id} {error} />
  {#if social === "show"}
    <Stack gap="2" role="group" aria-label={labels.providers} data-testid="authfly-providers">
      {#each providers ?? [] as pr (pr.id)}
        <Button href={`${labels.socialUrl ?? ""}/${pr.id}`} class={buttonSkin("outline", "w-full")} data-provider={pr.id}><LucideIcon name={pr.icon} />{pr.title}</Button>
      {/each}
    </Stack>
  {/if}
  <Form method="post" {action} errorId={error ? `${id}-error` : undefined} data-testid="authfly-form">
    <Input type="hidden" name="csrf" value={csrf} />
    <Field label={labels.identifier} htmlFor={`${id}-identifier`}>
      {#snippet children(f)}<Input type={identifier === "email" ? "email" : "text"} name="identifier" autocomplete={identifier === "email" ? "email" : "username"} required id={`${id}-identifier`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />{/snippet}
    </Field>
    {#if method === "password"}
      <Field label={labels.password} htmlFor={`${id}-password`}>
        {#snippet children(f)}<Input type="password" name="password" autocomplete="current-password" required id={`${id}-password`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />{/snippet}
      </Field>
      {#if labels.forgot}<Link href={labels.forgotHref} class={linkSkin("w-fit text-sm")} data-testid="forgot">{labels.forgot}</Link>{/if}
    {/if}
    <Button type="submit" class={buttonSkin("default", "w-full")} data-testid="submit">{labels.submit}</Button>
  </Form>
  {#if labels.magic}<Button href={labels.magicHref} class={buttonSkin("outline", "w-full")} data-testid="switch-method">{labels.magic}</Button>{/if}
  {#if labels.signupLink}<Text class={textSkin.muted}>{labels.signupText} <Link href={labels.signupHref} class={linkSkin()} data-testid="signup-link">{labels.signupLink}</Link></Text>{/if}
</Card>
