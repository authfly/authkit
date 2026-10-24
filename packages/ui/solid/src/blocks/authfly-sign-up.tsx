// AuthflySignUp on UI8Kit 3 primitives (solid). Props identical to packages/ui/react.
import { Show, mergeProps } from "solid-js";
import { Card } from "../components/card";
import { Group, Form } from "../components/layout";
import { Field } from "../components/field";
import { Text } from "../ui/text/text.solid";
import { Button } from "../ui/button/button.solid";
import { Link } from "../ui/link/link.solid";
import { Input } from "../ui/input/input.solid";
import { Label } from "../ui/label/label.solid";
import { Checkbox } from "../ui/checkbox/checkbox.solid";
import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin, widgetCardSkin } from "../skin/skin";
import { WidgetHead, Messages, Hidden, landmark, errorIdOf } from "./_parts";
import type { AuthflySignUpProps } from "./props";
export type { AuthflySignUpProps };

export function AuthflySignUp(props: AuthflySignUpProps) {
  const p = mergeProps({ csrf: "", error: "", info: "", terms: "show" as const }, props);
  return (
    <Card class={widgetCardSkin()} data-testid="authfly-sign-up" {...landmark(p.id, p.landmarkLabel)}>
      <WidgetHead id={p.id} title={p.title} text={p.text} />
      <Messages id={p.id} error={p.error} info={p.info} />
      <Form method="post" action={p.action} errorId={errorIdOf(p.id, p.error)} data-testid="authfly-form">
        <Hidden name="csrf" value={p.csrf} />
        <Field label={p.labels.name} htmlFor={`${p.id}-name`}>{(f) => (
          <Input type="text" name="name" autocomplete="name" id={`${p.id}-name`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />
        )}</Field>
        <Field label={p.labels.username} htmlFor={`${p.id}-username`}>{(f) => (
          <Group gap="2">
            <Input type="text" name="username" autocomplete="username" required id={`${p.id}-username`} class={inputSkin()} data-testid="field" aria-describedby={f.describe(p.labels.domain ? `${p.id}-domain` : undefined)} aria-invalid={f.invalid} />
            <Show when={p.labels.domain}><Text tag="span" id={`${p.id}-domain`} class={textSkin.muted} data-testid="domain">{p.labels.domain}</Text></Show>
          </Group>
        )}</Field>
        <Field label={p.labels.password} htmlFor={`${p.id}-password`} hint={p.labels.hint}>{(f) => (
          <Input type="password" name="password" autocomplete="new-password" required id={`${p.id}-password`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />
        )}</Field>
        <Show when={p.terms === "show"}>
          <Group gap="2" class="w-fit">
            <Checkbox name="terms" required id={`${p.id}-terms`} class={checkboxSkin()} />
            <Label for={`${p.id}-terms`} class={labelSkin("font-normal")}>{p.labels.terms}</Label>
          </Group>
        </Show>
        <Button type="submit" class={buttonSkin("default", "w-full")} data-testid="submit">{p.labels.submit}</Button>
      </Form>
      <Show when={p.labels.signinLink}><Text class={textSkin.muted}>{p.labels.signinText}{" "}<Link href={p.labels.signinHref} class={linkSkin()} data-testid="signin-link">{p.labels.signinLink}</Link></Text></Show>
    </Card>
  );
}
