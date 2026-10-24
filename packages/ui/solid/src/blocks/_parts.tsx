import { Show, type JSX } from "solid-js";
import { Stack } from "../components/layout";
import { Title } from "../components/title";
import { Alert } from "../components/alert";
import { Input } from "../ui/input/input.solid";
import { Text } from "../ui/text/text.solid";
import { textSkin } from "../skin/skin";

/** Title + lead text of every widget. */
export function WidgetHead(props: { id: string; title: string; text: string; align?: "start" | "center"; role?: "alert" | "status"; children?: JSX.Element }) {
  return (
    <Stack gap="2" align={props.align ?? "start"} role={props.role}>
      <Title level={1} id={`${props.id}-title`}>{props.title}</Title>
      <Text class={textSkin.muted}>{props.text}</Text>
      {props.children}
    </Stack>
  );
}

/** Error and info slots shared by the form widgets. */
export function Messages(props: { id: string; error?: string; info?: string }) {
  return (
    <>
      <Show when={props.error}><Alert id={`${props.id}-error`} tone="destructive" icon="circle-alert" data-testid="authfly-error">{props.error}</Alert></Show>
      <Show when={props.info}><Alert tone="default" icon="info" data-testid="authfly-info">{props.info}</Alert></Show>
    </>
  );
}

export const Hidden = (props: { name: string; value: string }) => <Input type="hidden" name={props.name} value={props.value} />;
export const landmark = (id: string, landmarkLabel?: string) => ({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
export const errorIdOf = (id: string, error?: string) => (error ? `${id}-error` : undefined);
