<script setup lang="ts">
// AuthflyAccount on UI8Kit 3 primitives (vue). Props identical to packages/ui/react.
import Card from "../components/Card.vue";
import Stack from "../components/Stack.vue";
import Form from "../components/Form.vue";
import Title from "../components/Title.vue";
import Badge from "../components/Badge.vue";
import LucideIcon from "../components/LucideIcon.vue";
import Box from "../ui/box/Box.vue";
import Text from "../ui/text/Text.vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import Separator from "../ui/separator/Separator.vue";
import WidgetHead from "./WidgetHead.vue";
import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
import type { AuthflyAccountProps } from "./props";
const p = withDefaults(defineProps<AuthflyAccountProps>(), { verified: false, csrf: "" });
const lm = { "aria-labelledby": p.landmarkLabel ? undefined : `${p.id}-title`, "aria-label": p.landmarkLabel };
</script>
<template>
  <Card class="max-w-lg" data-testid="authfly-account" v-bind="lm">
    <WidgetHead :id="p.id" :title="p.title" :text="p.text" />
    <Box tag="dl" class="m-0 grid gap-4" data-testid="profile">
      <Box class="grid gap-2">
        <Box tag="dt" :class="textSkin.muted">{{ p.labels.name }}</Box>
        <Box tag="dd" class="m-0 font-semibold text-foreground" data-testid="profile-name">{{ p.name }}</Box>
      </Box>
      <Box class="grid gap-2">
        <Box tag="dt" :class="textSkin.muted">{{ p.labels.email }}</Box>
        <Box tag="dd" class="m-0 flex flex-wrap items-center gap-2 font-semibold text-foreground" data-testid="profile-email">{{ p.email }}<Badge :variant="p.verified ? 'default' : 'secondary'" data-testid="verified">{{ p.verified ? p.labels.verified : p.labels.unverified }}</Badge></Box>
      </Box>
    </Box>
    <Separator decorative class="w-full border-border" />
    <Stack gap="2">
      <Title :level="2" :id="`${p.id}-methods`">{{ p.labels.security }}</Title>
      <Box tag="ul" :aria-labelledby="`${p.id}-methods`" class="m-0 flex list-none flex-col gap-2 p-0" data-testid="methods">
        <Box v-for="m in p.methods ?? []" :key="m.id" tag="li" class="flex items-center justify-between gap-4 text-sm text-foreground" :data-method="m.id">
          <Text tag="span" class="flex items-center gap-2"><LucideIcon :name="m.icon ? m.icon : 'shield'" />{{ m.title }}</Text>
          <Badge variant="outline">{{ m.text }}</Badge>
        </Box>
      </Box>
    </Stack>
    <Form method="post" :action="p.signoutUrl" data-testid="signout-form">
      <Input type="hidden" name="csrf" :value="p.csrf" />
      <Button type="submit" :class="buttonSkin('outline', 'w-full')" data-testid="signout"><LucideIcon name="log-out" />{{ p.labels.signout }}</Button>
    </Form>
  </Card>
</template>
