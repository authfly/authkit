<script lang="ts">
  // AuthflyAccount on UI8Kit 3 primitives (svelte 5). Props identical to packages/ui/react.
  import Card from "../components/Card.svelte";
  import Stack from "../components/Stack.svelte";
  import Form from "../components/Form.svelte";
  import Title from "../components/Title.svelte";
  import Badge from "../components/Badge.svelte";
  import LucideIcon from "../components/LucideIcon.svelte";
  import Box from "../ui/box/Box.svelte";
  import Text from "../ui/text/Text.svelte";
  import Button from "../ui/button/Button.svelte";
  import Input from "../ui/input/Input.svelte";
  import Separator from "../ui/separator/Separator.svelte";
  import WidgetHead from "./WidgetHead.svelte";
  import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
  import type { AuthflyAccountProps } from "./props";
  let { id, title, text, name, email, verified = false, methods, labels, signoutUrl, csrf = "", landmarkLabel }: AuthflyAccountProps = $props();
  const lm = $derived({ "aria-labelledby": landmarkLabel ? undefined : `${id}-title`, "aria-label": landmarkLabel });
</script>

<Card class="max-w-lg" data-testid="authfly-account" {...lm}>
  <WidgetHead {id} {title} {text} />
  <Box tag="dl" class="m-0 grid gap-4" data-testid="profile">
    <Box class="grid gap-2">
      <Box tag="dt" class={textSkin.muted}>{labels.name}</Box>
      <Box tag="dd" class="m-0 font-semibold text-foreground" data-testid="profile-name">{name}</Box>
    </Box>
    <Box class="grid gap-2">
      <Box tag="dt" class={textSkin.muted}>{labels.email}</Box>
      <Box tag="dd" class="m-0 flex flex-wrap items-center gap-2 font-semibold text-foreground" data-testid="profile-email">{email}<Badge variant={verified ? "default" : "secondary"} data-testid="verified">{verified ? labels.verified : labels.unverified}</Badge></Box>
    </Box>
  </Box>
  <Separator decorative class="w-full border-border" />
  <Stack gap="2">
    <Title level={2} id={`${id}-methods`}>{labels.security}</Title>
    <Box tag="ul" aria-labelledby={`${id}-methods`} class="m-0 flex list-none flex-col gap-2 p-0" data-testid="methods">
      {#each methods ?? [] as m (m.id)}
        <Box tag="li" class="flex items-center justify-between gap-4 text-sm text-foreground" data-method={m.id}>
          <Text tag="span" class="flex items-center gap-2"><LucideIcon name={m.icon ? m.icon : "shield"} />{m.title}</Text>
          <Badge variant="outline">{m.text}</Badge>
        </Box>
      {/each}
    </Box>
  </Stack>
  <Form method="post" action={signoutUrl} data-testid="signout-form">
    <Input type="hidden" name="csrf" value={csrf} />
    <Button type="submit" class={buttonSkin("outline", "w-full")} data-testid="signout"><LucideIcon name="log-out" />{labels.signout}</Button>
  </Form>
</Card>
