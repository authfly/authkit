// AuthflyRequest on UI8Kit 3 primitives (solid). Props identical to packages/ui3/react.
import { Show, mergeProps } from "solid-js";
import { Card } from "../components/card";
import { Form } from "../components/layout";
import { Field } from "../components/field";
import { Button } from "../ui/button/button.solid";
import { Link } from "../ui/link/link.solid";
import { Input } from "../ui/input/input.solid";
import { buttonSkin, linkSkin, inputSkin } from "../skin/skin";
import { WidgetHead, Messages, Hidden, landmark, errorIdOf } from "./_parts";
import type { AuthflyRequestProps } from "./props";
export type { AuthflyRequestProps };

export function AuthflyRequest(props: AuthflyRequestProps) {
  const p = mergeProps({ csrf: "", error: "", info: "", token: "", kind: "email" as const }, props);
  return (
    <Card data-testid="authfly-request" {...landmark(p.id, p.landmarkLabel)}>
      <WidgetHead id={p.id} title={p.title} text={p.text} />
      <Messages id={p.id} error={p.error} info={p.info} />
      <Form method="post" action={p.action} errorId={errorIdOf(p.id, p.error)} data-testid="authfly-form">
        <Hidden name="csrf" value={p.csrf} />
        <Show when={p.kind === "email"}>
          <Field label={p.labels.field} htmlFor={`${p.id}-email`}>{(f) => (
            <Input type="email" name="email" autocomplete="email" required id={`${p.id}-email`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />
          )}</Field>
        </Show>
        <Show when={p.kind === "password"}>
          <Hidden name="token" value={p.token} />
          <Field label={p.labels.field} htmlFor={`${p.id}-password`}>{(f) => (
            <Input type="password" name="password" autocomplete="new-password" required id={`${p.id}-password`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />
          )}</Field>
          <Field label={p.labels.confirm ?? ""} htmlFor={`${p.id}-confirm`}>{(f) => (
            <Input type="password" name="confirm" autocomplete="new-password" required id={`${p.id}-confirm`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />
          )}</Field>
        </Show>
        <Show when={p.kind === "code"}>
          <Field label={p.labels.field} htmlFor={`${p.id}-code`}>{(f) => (
            <Input type="text" name="code" inputmode="numeric" autocomplete="one-time-code" required id={`${p.id}-code`} class={inputSkin()} data-testid="field" aria-describedby={f.describe()} aria-invalid={f.invalid} />
          )}</Field>
        </Show>
        <Button type="submit" class={buttonSkin("default", "w-full")} data-testid="submit">{p.labels.submit}</Button>
      </Form>
      <Show when={p.labels.back}><Link href={p.labels.backHref} class={linkSkin("w-fit text-sm")} data-testid="back">{p.labels.back}</Link></Show>
    </Card>
  );
}
