// AuthflyAccount on UI8Kit 3 primitives (solid). Props identical to packages/ui/react.
import { For, mergeProps } from "solid-js";
import { Card } from "../components/card";
import { Stack, Form } from "../components/layout";
import { Title } from "../components/title";
import { Badge } from "../components/badge";
import { LucideIcon } from "../components/lucide-icon";
import { Box } from "../ui/box/box.solid";
import { Text } from "../ui/text/text.solid";
import { Button } from "../ui/button/button.solid";
import { Separator } from "../ui/separator/separator.solid";
import { buttonSkin, textSkin, widgetCardSkin } from "../skin/skin";
import { WidgetHead, Hidden, landmark } from "./_parts";
import type { AuthflyAccountProps } from "./props";
export type { AuthflyAccountProps };

export function AuthflyAccount(props: AuthflyAccountProps) {
  const p = mergeProps({ verified: false, csrf: "" }, props);
  return (
    <Card class={widgetCardSkin("max-w-lg")} data-testid="authfly-account" {...landmark(p.id, p.landmarkLabel)}>
      <WidgetHead id={p.id} title={p.title} text={p.text} />
      <Box tag="dl" class="m-0 grid gap-4" data-testid="profile">
        <Box class="grid gap-2">
          <Box tag="dt" class={textSkin.muted}>{p.labels.name}</Box>
          <Box tag="dd" class="m-0 font-semibold text-foreground" data-testid="profile-name">{p.name}</Box>
        </Box>
        <Box class="grid gap-2">
          <Box tag="dt" class={textSkin.muted}>{p.labels.email}</Box>
          <Box tag="dd" class="m-0 flex flex-wrap items-center gap-2 font-semibold text-foreground" data-testid="profile-email">{p.email}<Badge variant={p.verified ? "default" : "secondary"} data-testid="verified">{p.verified ? p.labels.verified : p.labels.unverified}</Badge></Box>
        </Box>
      </Box>
      <Separator decorative class="w-full border-border" />
      <Stack gap="2">
        <Title level={2} id={`${p.id}-methods`}>{p.labels.security}</Title>
        <Box tag="ul" aria-labelledby={`${p.id}-methods`} class="m-0 flex list-none flex-col gap-2 p-0" data-testid="methods">
          <For each={p.methods ?? []}>{(m) => (
            <Box tag="li" class="flex items-center justify-between gap-4 text-sm text-foreground" data-method={m.id}>
              <Text tag="span" class="flex items-center gap-2"><LucideIcon name={m.icon ? m.icon : "shield"} />{m.title}</Text>
              <Badge variant="outline">{m.text}</Badge>
            </Box>
          )}</For>
        </Box>
      </Stack>
      <Form method="post" action={p.signoutUrl} data-testid="signout-form">
        <Hidden name="csrf" value={p.csrf} />
        <Button type="submit" class={buttonSkin("outline", "w-full")} data-testid="signout"><LucideIcon name="log-out" />{p.labels.signout}</Button>
      </Form>
    </Card>
  );
}
