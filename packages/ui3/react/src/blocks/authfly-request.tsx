// Authfly request on UI8Kit 3 primitives: forgot (email), reset (password + confirm, token hidden), code. Props as xgen.
import { Card } from "../components/card";
import { Form } from "../components/layout";
import { Field } from "../components/field";
import { Button } from "../ui/button/button";
import { Link } from "../ui/link/link";
import { Input } from "../ui/input/input";
import { buttonSkin, linkSkin, inputSkin } from "../skin/skin";
import { WidgetHead, Messages, Hidden, landmark } from "./_parts";
import type { RequestLabels } from "./authfly-request.types";

export type AuthflyRequestProps = {
  id: string;
  title: string;
  text: string;
  action: string;
  csrf?: string;
  error?: string;
  info?: string;
  labels: RequestLabels;
  token?: string;
  kind?: "email" | "password" | "code";
  landmarkLabel?: string;
};

export function AuthflyRequest({ id, title, text, action, csrf = "", error = "", info = "", labels, token = "", kind = "email", landmarkLabel }: AuthflyRequestProps) {
  return (
    <Card data-testid="authfly-request" {...landmark(id, landmarkLabel)}>
      <WidgetHead id={id} title={title} text={text} />
      <Messages error={error} info={info} />
      <Form method="post" action={action} data-testid="authfly-form">
        <Hidden name="csrf" value={csrf} />
        {kind === "email" ? (
          <Field label={labels.field} htmlFor={`${id}-email`}>
            <Input type="email" name="email" autoComplete="email" required id={`${id}-email`} className={inputSkin()} data-testid="field" />
          </Field>
        ) : null}
        {kind === "password" ? (
          <>
            <Hidden name="token" value={token} />
            <Field label={labels.field} htmlFor={`${id}-password`}>
              <Input type="password" name="password" autoComplete="new-password" required id={`${id}-password`} className={inputSkin()} data-testid="field" />
            </Field>
            <Field label={labels.confirm ?? ""} htmlFor={`${id}-confirm`}>
              <Input type="password" name="confirm" autoComplete="new-password" required id={`${id}-confirm`} className={inputSkin()} data-testid="field" />
            </Field>
          </>
        ) : null}
        {kind === "code" ? (
          <Field label={labels.field} htmlFor={`${id}-code`}>
            <Input type="text" name="code" inputMode="numeric" autoComplete="one-time-code" required id={`${id}-code`} className={inputSkin()} data-testid="field" />
          </Field>
        ) : null}
        <Button type="submit" className={buttonSkin("default", "w-full")} data-testid="submit">{labels.submit}</Button>
      </Form>
      {labels.back ? <Link href={labels.backHref} className={linkSkin("w-fit text-sm")} data-testid="back">{labels.back}</Link> : null}
    </Card>
  );
}
