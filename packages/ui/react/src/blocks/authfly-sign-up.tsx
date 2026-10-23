// Authfly sign-up on UI8Kit 3 primitives: name, username at the mail domain, password, terms. Props identical to xgen.
import { Card } from "../components/card";
import { Group, Form } from "../components/layout";
import { Field } from "../components/field";
import { Text } from "../ui/text/text";
import { Button } from "../ui/button/button";
import { Link } from "../ui/link/link";
import { Input } from "../ui/input/input";
import { Label } from "../ui/label/label";
import { Checkbox } from "../ui/checkbox/checkbox";
import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
import { WidgetHead, Messages, Hidden, landmark, errorIdOf } from "./_parts";
import type { SignUpLabels } from "./authfly-sign-up.types";

export type AuthflySignUpProps = {
  id: string;
  title: string;
  text: string;
  action: string;
  csrf?: string;
  error?: string;
  info?: string;
  labels: SignUpLabels;
  terms?: "show" | "none";
  landmarkLabel?: string;
};

export function AuthflySignUp({ id, title, text, action, csrf = "", error = "", info = "", labels, terms = "show", landmarkLabel }: AuthflySignUpProps) {
  return (
    <Card data-testid="authfly-sign-up" {...landmark(id, landmarkLabel)}>
      <WidgetHead id={id} title={title} text={text} />
      <Messages id={id} error={error} info={info} />
      <Form method="post" action={action} errorId={errorIdOf(id, error)} data-testid="authfly-form">
        <Hidden name="csrf" value={csrf} />
        <Field label={labels.name} htmlFor={`${id}-name`}>
          <Input type="text" name="name" autoComplete="name" id={`${id}-name`} className={inputSkin()} data-testid="field" />
        </Field>
        <Field label={labels.username} htmlFor={`${id}-username`}>
          <Group gap="2">
            <Input type="text" name="username" autoComplete="username" required id={`${id}-username`} aria-describedby={labels.domain ? `${id}-domain` : undefined} className={inputSkin()} data-testid="field" />
            {labels.domain ? <Text tag="span" id={`${id}-domain`} className={textSkin.muted} data-testid="domain">{labels.domain}</Text> : null}
          </Group>
        </Field>
        <Field label={labels.password} htmlFor={`${id}-password`} hint={labels.hint}>
          <Input type="password" name="password" autoComplete="new-password" required id={`${id}-password`} className={inputSkin()} data-testid="field" />
        </Field>
        {terms === "show" ? (
          <Group gap="2" className="w-fit">
            <Checkbox name="terms" required id={`${id}-terms`} className={checkboxSkin()} />
            <Label htmlFor={`${id}-terms`} className={labelSkin("font-normal")}>{labels.terms}</Label>
          </Group>
        ) : null}
        <Button type="submit" className={buttonSkin("default", "w-full")} data-testid="submit">{labels.submit}</Button>
      </Form>
      {labels.signinLink ? (
        <Text className={textSkin.muted}>
          {labels.signinText}{" "}
          <Link href={labels.signinHref} className={linkSkin()} data-testid="signin-link">{labels.signinLink}</Link>
        </Text>
      ) : null}
    </Card>
  );
}
