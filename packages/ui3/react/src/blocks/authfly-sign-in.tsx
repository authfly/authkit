// Authfly sign-in on UI8Kit 3 primitives. Axes: method (password | magic), identifier (any | email | username),
// social (none | show: provider buttons, an extension point). Props identical to the xgen widget.
import { Card } from "../components/card";
import { Stack, Form } from "../components/layout";
import { Field } from "../components/field";
import { LucideIcon } from "../components/lucide-icon";
import { Text } from "../ui/text/text";
import { Button } from "../ui/button/button";
import { Link } from "../ui/link/link";
import { Input } from "../ui/input/input";
import { buttonSkin, linkSkin, inputSkin, textSkin } from "../skin/skin";
import { WidgetHead, Messages, Hidden, landmark } from "./_parts";
import type { SignInLabels } from "./authfly-sign-in.types";
import type { Feature } from "./feature-grid.types";

export type AuthflySignInProps = {
  id: string;
  title: string;
  text: string;
  action: string;
  csrf?: string;
  error?: string;
  labels: SignInLabels;
  providers: Feature[];
  method?: "password" | "magic";
  identifier?: "any" | "email" | "username";
  social?: "none" | "show";
  landmarkLabel?: string;
};

export function AuthflySignIn({ id, title, text, action, csrf = "", error = "", labels, providers, method = "password", identifier = "any", social = "none", landmarkLabel }: AuthflySignInProps) {
  const email = identifier === "email";
  return (
    <Card data-testid="authfly-sign-in" {...landmark(id, landmarkLabel)}>
      <WidgetHead id={id} title={title} text={text} />
      <Messages error={error} />
      {social === "show" ? (
        <Stack gap="2" role="group" aria-label={labels.providers} data-testid="authfly-providers">
          {(providers ?? []).map((p) => (
            <Button key={p.id} href={`${labels.socialUrl ?? ""}/${p.id}`} className={buttonSkin("outline", "w-full")} data-provider={p.id}>
              <LucideIcon name={p.icon} />
              {p.title}
            </Button>
          ))}
        </Stack>
      ) : null}
      <Form method="post" action={action} data-testid="authfly-form">
        <Hidden name="csrf" value={csrf} />
        <Field label={labels.identifier} htmlFor={`${id}-identifier`}>
          <Input type={email ? "email" : "text"} name="identifier" autoComplete={email ? "email" : "username"} required id={`${id}-identifier`} className={inputSkin()} data-testid="field" />
        </Field>
        {method === "password" ? (
          <>
            <Field label={labels.password} htmlFor={`${id}-password`}>
              <Input type="password" name="password" autoComplete="current-password" required id={`${id}-password`} className={inputSkin()} data-testid="field" />
            </Field>
            {labels.forgot ? (
              <Link href={labels.forgotHref} className={linkSkin("w-fit text-sm")} data-testid="forgot">{labels.forgot}</Link>
            ) : null}
          </>
        ) : null}
        <Button type="submit" className={buttonSkin("default", "w-full")} data-testid="submit">{labels.submit}</Button>
      </Form>
      {labels.magic ? (
        <Button href={labels.magicHref} className={buttonSkin("outline", "w-full")} data-testid="switch-method">{labels.magic}</Button>
      ) : null}
      {labels.signupLink ? (
        <Text className={textSkin.muted}>
          {labels.signupText}{" "}
          <Link href={labels.signupHref} className={linkSkin()} data-testid="signup-link">{labels.signupLink}</Link>
        </Text>
      ) : null}
    </Card>
  );
}
