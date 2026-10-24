// AuthflySignIn on UI8Kit 3 primitives (solid). Props identical to packages/ui/react.
import { For, Show, mergeProps } from "solid-js";
import { Card } from "../components/card";
import { Stack, Form } from "../components/layout";
import { Field } from "../components/field";
import { LucideIcon } from "../components/lucide-icon";
import { Text } from "../ui/text/text.solid";
import { Button } from "../ui/button/button.solid";
import { Link } from "../ui/link/link.solid";
import { Input } from "../ui/input/input.solid";
import { buttonSkin, linkSkin, inputSkin, textSkin, widgetCardSkin } from "../skin/skin";
import { WidgetHead, Messages, Hidden, landmark, errorIdOf } from "./_parts";
import type { AuthflySignInProps } from "./props";
export type { AuthflySignInProps };

export function AuthflySignIn(props: AuthflySignInProps) {
  const p = mergeProps({ csrf: "", error: "", method: "password" as const, identifier: "any" as const, social: "none" as const }, props);
  return (
    <Card class={widgetCardSkin()} data-testid="authfly-sign-in" {...landmark(p.id, p.landmarkLabel)}>
      <WidgetHead id={p.id} title={p.title} text={p.text} />
      <Messages id={p.id} error={p.error} />
      <Show when={p.social === "show"}>
        <Stack gap="2" role="group" aria-label={p.labels.providers} data-testid="authfly-providers">
          <For each={p.providers ?? []}>{(pr) => (
            <Button href={`${p.labels.socialUrl ?? ""}/${pr.id}`} class={buttonSkin("outline", "w-full")} data-provider={pr.id}><LucideIcon name={pr.icon} />{pr.title}</Button>
          )}</For>
        </Stack>
      </Show>
      <Form method="post" action={p.action} errorId={errorIdOf(p.id, p.error)} data-testid="authfly-form">
        <Hidden name="csrf" value={p.csrf} />
        <Field label={p.labels.identifier} htmlFor={`${p.id}-identifier`}>{(f) => (
          <Input type={p.identifier === "email" ? "email" : "text"} name="identifier" autocomplete={p.identifier === "email" ? "email" : "username"} required id={`${p.id}-identifier`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />
        )}</Field>
        <Show when={p.method === "password"}>
          <Field label={p.labels.password} htmlFor={`${p.id}-password`}>{(f) => (
            <Input type="password" name="password" autocomplete="current-password" required id={`${p.id}-password`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />
          )}</Field>
          <Show when={p.labels.forgot}><Link href={p.labels.forgotHref} class={linkSkin("w-fit text-sm")} data-testid="forgot">{p.labels.forgot}</Link></Show>
        </Show>
        <Button type="submit" class={buttonSkin("default", "w-full")} data-testid="submit">{p.labels.submit}</Button>
      </Form>
      <Show when={p.labels.magic}><Button href={p.labels.magicHref} class={buttonSkin("outline", "w-full")} data-testid="switch-method">{p.labels.magic}</Button></Show>
      <Show when={p.labels.signupLink}><Text class={textSkin.muted}>{p.labels.signupText}{" "}<Link href={p.labels.signupHref} class={linkSkin()} data-testid="signup-link">{p.labels.signupLink}</Link></Text></Show>
    </Card>
  );
}
