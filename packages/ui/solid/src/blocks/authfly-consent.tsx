// AuthflyConsent on UI8Kit 3 primitives (solid). Props identical to packages/ui/react.
import { For, mergeProps } from "solid-js";
import { Card } from "../components/card";
import { Stack, Group, Form } from "../components/layout";
import { Title } from "../components/title";
import { LucideIcon } from "../components/lucide-icon";
import { Box } from "../ui/box/box.solid";
import { Text } from "../ui/text/text.solid";
import { Button } from "../ui/button/button.solid";
import { buttonSkin } from "../skin/skin";
import { WidgetHead, Messages, Hidden, landmark } from "./_parts";
import type { AuthflyConsentProps } from "./props";
export type { AuthflyConsentProps };

export function AuthflyConsent(props: AuthflyConsentProps) {
  const p = mergeProps({ csrf: "", error: "", info: "" }, props);
  return (
    <Card data-testid="authfly-consent" data-client={p.client} {...landmark(p.id, p.landmarkLabel)}>
      <WidgetHead id={p.id} title={p.title} text={p.text} />
      <Messages id={p.id} error={p.error} info={p.info} />
      <Text class="text-sm text-foreground" data-testid="account">{p.labels.account}{" "}<Text tag="strong" class="font-semibold">{p.account}</Text></Text>
      <Stack gap="2">
        <Title level={2} id={`${p.id}-scopes`}>{p.labels.scopes}</Title>
        <Box tag="ul" aria-labelledby={`${p.id}-scopes`} class="m-0 flex list-none flex-col gap-2 p-0" data-testid="scopes">
          <For each={p.scopes ?? []}>{(s) => <Box tag="li" class="flex items-center gap-2 text-sm text-foreground" data-scope={s.id}><LucideIcon name="check" />{s.title}</Box>}</For>
        </Box>
      </Stack>
      <Group gap="2" justify="between">
        <Form method="post" action={p.action} class="flex-1" data-testid="deny">
          <Hidden name="csrf" value={p.csrf} />
          <Hidden name="decision" value="deny" />
          <Button type="submit" class={buttonSkin("outline", "w-full")}>{p.labels.deny}</Button>
        </Form>
        <Form method="post" action={p.action} class="flex-1" data-testid="approve">
          <Hidden name="csrf" value={p.csrf} />
          <Hidden name="decision" value="approve" />
          <Button type="submit" class={buttonSkin("default", "w-full")}>{p.labels.approve}</Button>
        </Form>
      </Group>
    </Card>
  );
}
