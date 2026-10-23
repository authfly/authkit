// Authfly widget on UI8Kit 3 primitives. Props mirror packages/ui/react (xgen) one to one.
import type { ReactNode } from "react";
import { Stack } from "../components/layout";
import { Title } from "../components/title";
import { Alert } from "../components/alert";
import { Input } from "../ui/input/input";
import { Text } from "../ui/text/text";
import { textSkin } from "../skin/skin";

/** Title + lead text of every widget. */
export function WidgetHead({ id, title, text, align = "start", role, children }: { id: string; title: string; text: string; align?: "start" | "center"; role?: "alert" | "status"; children?: ReactNode }) {
  return (
    <Stack gap="2" align={align} role={role}>
      <Title level={1} id={`${id}-title`}>{title}</Title>
      <Text className={textSkin.muted}>{text}</Text>
      {children}
    </Stack>
  );
}

/** Error and info slots shared by the form widgets. */
export function Messages({ id, error, info }: { id: string; error?: string; info?: string }) {
  return (
    <>
      {error ? <Alert id={`${id}-error`} tone="destructive" icon="circle-alert" data-testid="authfly-error">{error}</Alert> : null}
      {info ? <Alert tone="success" icon="info" data-testid="authfly-info">{info}</Alert> : null}
    </>
  );
}

export function Hidden({ name, value }: { name: string; value: string }) {
  return <Input type="hidden" name={name} value={value} />;
}

export const landmark = (id: string, landmarkLabel?: string) => ({
  "aria-labelledby": landmarkLabel ? undefined : `${id}-title`,
  "aria-label": landmarkLabel,
});
export type Children = { children?: ReactNode };

/** Form-level error id for <Form errorId>, only when an error is shown. */
export const errorIdOf = (id: string, error?: string) => (error ? `${id}-error` : undefined);
