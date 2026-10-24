// Authfly notice on UI8Kit 3 primitives: check email, verified, link error, sign out (form). Props as xgen.
import { Card } from "../components/card";
import { Form } from "../components/layout";
import { IconBadge } from "../components/badge";
import { Text } from "../ui/text/text";
import { Button } from "../ui/button/button";
import { Link } from "../ui/link/link";
import { buttonSkin, linkSkin, widgetCardSkin } from "../skin/skin";
import { WidgetHead, Hidden, landmark } from "./_parts";
import type { NoticeLabels } from "./authfly-notice.types";

export type AuthflyNoticeProps = {
  id: string;
  title: string;
  text: string;
  detail?: string;
  icon?: string;
  labels: NoticeLabels;
  actionUrl?: string;
  csrf?: string;
  tone?: "default" | "success" | "error";
  action?: "link" | "form";
  landmarkLabel?: string;
};

export function AuthflyNotice({ id, title, text, detail = "", icon = "mail-check", labels, actionUrl = "", csrf = "", tone = "default", action = "link", landmarkLabel }: AuthflyNoticeProps) {
  const isError = tone === "error";
  return (
    <Card className={widgetCardSkin("items-center text-center")} data-testid="authfly-notice" data-tone={tone} {...landmark(id, landmarkLabel)}>
      <IconBadge icon={icon} tone={isError ? "destructive" : "default"} />
      <WidgetHead id={id} title={title} text={text} align="center" role={isError ? "alert" : "status"}>
        {detail ? <Text className="text-sm font-semibold text-foreground" data-testid="detail">{detail}</Text> : null}
      </WidgetHead>
      {action === "form" ? (
        <Form method="post" action={actionUrl} className="w-full" data-testid="authfly-form">
          <Hidden name="csrf" value={csrf} />
          <Button type="submit" className={buttonSkin("default", "w-full")} data-testid="submit">{labels.cta}</Button>
        </Form>
      ) : (
        <Button href={labels.ctaHref} className={buttonSkin("default", "w-full")} data-testid="cta">{labels.cta}</Button>
      )}
      {labels.secondary ? <Link href={labels.secondaryHref} className={linkSkin("text-sm")} data-testid="secondary">{labels.secondary}</Link> : null}
    </Card>
  );
}
