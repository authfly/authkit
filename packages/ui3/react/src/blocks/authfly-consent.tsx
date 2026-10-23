// Authfly OIDC consent on UI8Kit 3 primitives: account, requested scopes, deny / approve. Props as xgen.
import { Card } from "../components/card";
import { Stack, Group, Form } from "../components/layout";
import { Title } from "../components/title";
import { LucideIcon } from "../components/lucide-icon";
import { Box } from "../ui/box/box";
import { Text } from "../ui/text/text";
import { Button } from "../ui/button/button";
import { buttonSkin } from "../skin/skin";
import { WidgetHead, Messages, Hidden, landmark } from "./_parts";
import type { ConsentLabels } from "./authfly-consent.types";
import type { Feature } from "./feature-grid.types";

export type AuthflyConsentProps = {
  id: string;
  title: string;
  text: string;
  action: string;
  csrf?: string;
  error?: string;
  info?: string;
  client: string;
  account: string;
  scopes: Feature[];
  labels: ConsentLabels;
  landmarkLabel?: string;
};

export function AuthflyConsent({ id, title, text, action, csrf = "", error = "", info = "", client, account, scopes, labels, landmarkLabel }: AuthflyConsentProps) {
  return (
    <Card data-testid="authfly-consent" data-client={client} {...landmark(id, landmarkLabel)}>
      <WidgetHead id={id} title={title} text={text} />
      <Messages error={error} info={info} />
      <Text className="text-sm text-foreground" data-testid="account">
        {labels.account}{" "}
        <Text tag="strong" className="font-semibold">{account}</Text>
      </Text>
      <Stack gap="2">
        <Title level={2} id={`${id}-scopes`}>{labels.scopes}</Title>
        <Box tag="ul" aria-labelledby={`${id}-scopes`} className="m-0 flex list-none flex-col gap-2 p-0" data-testid="scopes">
          {(scopes ?? []).map((s) => (
            <Box tag="li" key={s.id} className="flex items-center gap-2 text-sm text-foreground" data-scope={s.id}>
              <LucideIcon name="check" />
              {s.title}
            </Box>
          ))}
        </Box>
      </Stack>
      <Group gap="2" justify="between">
        <Form method="post" action={action} className="flex-1" data-testid="deny">
          <Hidden name="csrf" value={csrf} />
          <Hidden name="decision" value="deny" />
          <Button type="submit" className={buttonSkin("outline", "w-full")}>{labels.deny}</Button>
        </Form>
        <Form method="post" action={action} className="flex-1" data-testid="approve">
          <Hidden name="csrf" value={csrf} />
          <Hidden name="decision" value="approve" />
          <Button type="submit" className={buttonSkin("default", "w-full")}>{labels.approve}</Button>
        </Form>
      </Group>
    </Card>
  );
}
