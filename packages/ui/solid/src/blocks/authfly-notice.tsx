// AuthflyNotice on UI8Kit 3 primitives (solid). Props identical to packages/ui/react.
import { Show, mergeProps } from "solid-js";
import { Card } from "../components/card";
import { Form } from "../components/layout";
import { IconBadge } from "../components/badge";
import { Text } from "../ui/text/text.solid";
import { Button } from "../ui/button/button.solid";
import { Link } from "../ui/link/link.solid";
import { buttonSkin, linkSkin, widgetCardSkin } from "../skin/skin";
import { WidgetHead, Hidden, landmark } from "./_parts";
import type { AuthflyNoticeProps } from "./props";
export type { AuthflyNoticeProps };

export function AuthflyNotice(props: AuthflyNoticeProps) {
  const p = mergeProps({ detail: "", icon: "mail-check", actionUrl: "", csrf: "", tone: "default" as const, action: "link" as const }, props);
  return (
    <Card class={widgetCardSkin("items-center text-center")} data-testid="authfly-notice" data-tone={p.tone} {...landmark(p.id, p.landmarkLabel)}>
      <IconBadge icon={p.icon} tone={p.tone === "error" ? "destructive" : "default"} />
      <WidgetHead id={p.id} title={p.title} text={p.text} align="center" role={p.tone === "error" ? "alert" : "status"}>
        <Show when={p.detail}><Text class="text-sm font-semibold text-foreground" data-testid="detail">{p.detail}</Text></Show>
      </WidgetHead>
      <Show when={p.action === "form"} fallback={<Button href={p.labels.ctaHref} class={buttonSkin("default", "w-full")} data-testid="cta">{p.labels.cta}</Button>}>
        <Form method="post" action={p.actionUrl} class="w-full" data-testid="authfly-form">
          <Hidden name="csrf" value={p.csrf} />
          <Button type="submit" class={buttonSkin("default", "w-full")} data-testid="submit">{p.labels.cta}</Button>
        </Form>
      </Show>
      <Show when={p.labels.secondary}><Link href={p.labels.secondaryHref} class={linkSkin("text-sm")} data-testid="secondary">{p.labels.secondary}</Link></Show>
    </Card>
  );
}
