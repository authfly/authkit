// Authfly account on UI8Kit 3 primitives: profile, verified badge, sign-in methods, sign out. Props as xgen.
import { Card } from "../components/card";
import { Stack, Form, Divider } from "../components/layout";
import { Title } from "../components/title";
import { Badge } from "../components/badge";
import { LucideIcon } from "../components/lucide-icon";
import { Box } from "../ui/box/box";
import { Text } from "../ui/text/text";
import { Button } from "../ui/button/button";
import { buttonSkin, textSkin } from "../skin/skin";
import { WidgetHead, Hidden, landmark } from "./_parts";
import type { AccountLabels } from "./authfly-account.types";
import type { Feature } from "./feature-grid.types";

export type AuthflyAccountProps = {
  id: string;
  title: string;
  text: string;
  name: string;
  email: string;
  verified?: boolean;
  methods: Feature[];
  labels: AccountLabels;
  signoutUrl: string;
  csrf?: string;
  landmarkLabel?: string;
};

export function AuthflyAccount({ id, title, text, name, email, verified = false, methods, labels, signoutUrl, csrf = "", landmarkLabel }: AuthflyAccountProps) {
  return (
    <Card className="max-w-lg" data-testid="authfly-account" {...landmark(id, landmarkLabel)}>
      <WidgetHead id={id} title={title} text={text} />
      <Box tag="dl" className="m-0 grid gap-4" data-testid="profile">
        <Box className="grid gap-2">
          <Box tag="dt" className={textSkin.muted}>{labels.name}</Box>
          <Box tag="dd" className="m-0 font-semibold text-foreground" data-testid="profile-name">{name}</Box>
        </Box>
        <Box className="grid gap-2">
          <Box tag="dt" className={textSkin.muted}>{labels.email}</Box>
          <Box tag="dd" className="m-0 flex flex-wrap items-center gap-2 font-semibold text-foreground" data-testid="profile-email">
            {email}
            <Badge variant={verified ? "default" : "secondary"} data-testid="verified">{verified ? labels.verified : labels.unverified}</Badge>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Stack gap="2">
        <Title level={2} id={`${id}-methods`}>{labels.security}</Title>
        <Box tag="ul" aria-labelledby={`${id}-methods`} className="m-0 flex list-none flex-col gap-2 p-0" data-testid="methods">
          {(methods ?? []).map((m) => (
            <Box tag="li" key={m.id} className="flex items-center justify-between gap-4 text-sm text-foreground" data-method={m.id}>
              <Text tag="span" className="flex items-center gap-2">
                <LucideIcon name={m.icon ? m.icon : "shield"} />
                {m.title}
              </Text>
              <Badge variant="outline">{m.text}</Badge>
            </Box>
          ))}
        </Box>
      </Stack>
      <Form method="post" action={signoutUrl} data-testid="signout-form">
        <Hidden name="csrf" value={csrf} />
        <Button type="submit" className={buttonSkin("outline", "w-full")} data-testid="signout">
          <LucideIcon name="log-out" />
          {labels.signout}
        </Button>
      </Form>
    </Card>
  );
}
