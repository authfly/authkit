<script setup lang="ts">
// AuthflyConsent on UI8Kit 3 primitives (vue). Props identical to packages/ui/react.
import Card from "../components/Card.vue";
import Stack from "../components/Stack.vue";
import Group from "../components/Group.vue";
import Form from "../components/Form.vue";
import Title from "../components/Title.vue";
import LucideIcon from "../components/LucideIcon.vue";
import Box from "../ui/box/Box.vue";
import Text from "../ui/text/Text.vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import WidgetHead from "./WidgetHead.vue";
import Messages from "./Messages.vue";
import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
import type { AuthflyConsentProps } from "./props";
const p = withDefaults(defineProps<AuthflyConsentProps>(), { csrf: "", error: "", info: "" });
const lm = { "aria-labelledby": p.landmarkLabel ? undefined : `${p.id}-title`, "aria-label": p.landmarkLabel };
const errorId = p.error ? `${p.id}-error` : undefined;
</script>
<template>
  <Card data-testid="authfly-consent" :data-client="p.client" v-bind="lm">
    <WidgetHead :id="p.id" :title="p.title" :text="p.text" />
    <Messages :id="p.id" :error="p.error" :info="p.info" />
    <Text class="text-sm text-foreground" data-testid="account">{{ p.labels.account }} <Text tag="strong" class="font-semibold">{{ p.account }}</Text></Text>
    <Stack gap="2">
      <Title :level="2" :id="`${p.id}-scopes`">{{ p.labels.scopes }}</Title>
      <Box tag="ul" :aria-labelledby="`${p.id}-scopes`" class="m-0 flex list-none flex-col gap-2 p-0" data-testid="scopes">
        <Box v-for="s in p.scopes ?? []" :key="s.id" tag="li" class="flex items-center gap-2 text-sm text-foreground" :data-scope="s.id"><LucideIcon name="check" />{{ s.title }}</Box>
      </Box>
    </Stack>
    <Group gap="2" justify="between">
      <Form method="post" :action="p.action" class="flex-1" data-testid="deny">
        <Input type="hidden" name="csrf" :value="p.csrf" />
        <Input type="hidden" name="decision" value="deny" />
        <Button type="submit" :class="buttonSkin('outline', 'w-full')">{{ p.labels.deny }}</Button>
      </Form>
      <Form method="post" :action="p.action" class="flex-1" data-testid="approve">
        <Input type="hidden" name="csrf" :value="p.csrf" />
        <Input type="hidden" name="decision" value="approve" />
        <Button type="submit" :class="buttonSkin('default', 'w-full')">{{ p.labels.approve }}</Button>
      </Form>
    </Group>
  </Card>
</template>
