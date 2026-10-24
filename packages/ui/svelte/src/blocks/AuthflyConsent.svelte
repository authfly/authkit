<script lang="ts">
  // AuthflyConsent on UI8Kit 3 primitives (svelte 5). Props identical to packages/ui/react.
  import Card from "../components/Card.svelte";
  import Stack from "../components/Stack.svelte";
  import Group from "../components/Group.svelte";
  import Form from "../components/Form.svelte";
  import Title from "../components/Title.svelte";
  import LucideIcon from "../components/LucideIcon.svelte";
  import Box from "../ui/box/Box.svelte";
  import Text from "../ui/text/Text.svelte";
  import Button from "../ui/button/Button.svelte";
  import Input from "../ui/input/Input.svelte";
  import WidgetHead from "./WidgetHead.svelte";
  import Messages from "./Messages.svelte";
  import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin, widgetCardSkin } from "../skin/skin";
  import type { AuthflyConsentProps } from "./props";
  let { id, title, text, action, csrf = "", error = "", info = "", client, account, scopes, labels, landmarkLabel }: AuthflyConsentProps = $props();
  const lm = $derived({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
</script>

<Card class={widgetCardSkin()} data-testid="authfly-consent" data-client={client} {...lm}>
  <WidgetHead {id} {title} {text} />
  <Messages {id} {error} {info} />
  <Text class="text-sm text-foreground" data-testid="account">{labels.account} <Text tag="strong" class="font-semibold">{account}</Text></Text>
  <Stack gap="2">
    <Title level={2} id={`${id}-scopes`}>{labels.scopes}</Title>
    <Box tag="ul" aria-labelledby={`${id}-scopes`} class="m-0 flex list-none flex-col gap-2 p-0" data-testid="scopes">
      {#each scopes ?? [] as s (s.id)}<Box tag="li" class="flex items-center gap-2 text-sm text-foreground" data-scope={s.id}><LucideIcon name="check" />{s.title}</Box>{/each}
    </Box>
  </Stack>
  <Group gap="2" justify="between">
    <Form method="post" {action} class="flex-1" data-testid="deny">
      <Input type="hidden" name="csrf" value={csrf} />
      <Input type="hidden" name="decision" value="deny" />
      <Button type="submit" class={buttonSkin("outline", "w-full")}>{labels.deny}</Button>
    </Form>
    <Form method="post" {action} class="flex-1" data-testid="approve">
      <Input type="hidden" name="csrf" value={csrf} />
      <Input type="hidden" name="decision" value="approve" />
      <Button type="submit" class={buttonSkin("default", "w-full")}>{labels.approve}</Button>
    </Form>
  </Group>
</Card>
