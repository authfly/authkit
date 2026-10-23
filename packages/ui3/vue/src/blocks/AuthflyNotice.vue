<script setup lang="ts">
// AuthflyNotice on UI8Kit 3 primitives (vue). Props identical to packages/ui3/react.
import Card from "../components/Card.vue";
import Form from "../components/Form.vue";
import IconBadge from "../components/IconBadge.vue";
import Text from "../ui/text/Text.vue";
import Button from "../ui/button/Button.vue";
import Link from "../ui/link/Link.vue";
import Input from "../ui/input/Input.vue";
import WidgetHead from "./WidgetHead.vue";
import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
import type { AuthflyNoticeProps } from "./props";
const p = withDefaults(defineProps<AuthflyNoticeProps>(), { detail: "", icon: "mail-check", actionUrl: "", csrf: "", tone: "default", action: "link" });
const lm = { "aria-labelledby": p.landmarkLabel ? undefined : `${p.id}-title`, "aria-label": p.landmarkLabel };
</script>
<template>
  <Card class="items-center text-center" data-testid="authfly-notice" :data-tone="p.tone" v-bind="lm">
    <IconBadge :icon="p.icon" :tone="p.tone === 'error' ? 'destructive' : 'default'" />
    <WidgetHead :id="p.id" :title="p.title" :text="p.text" align="center" :role="p.tone === 'error' ? 'alert' : 'status'">
      <Text v-if="p.detail" class="text-sm font-semibold text-foreground" data-testid="detail">{{ p.detail }}</Text>
    </WidgetHead>
    <Form v-if="p.action === 'form'" method="post" :action="p.actionUrl" class="w-full" data-testid="authfly-form">
      <Input type="hidden" name="csrf" :value="p.csrf" />
      <Button type="submit" :class="buttonSkin('default', 'w-full')" data-testid="submit">{{ p.labels.cta }}</Button>
    </Form>
    <Button v-else :href="p.labels.ctaHref" :class="buttonSkin('default', 'w-full')" data-testid="cta">{{ p.labels.cta }}</Button>
    <Link v-if="p.labels.secondary" :href="p.labels.secondaryHref" :class="linkSkin('text-sm')" data-testid="secondary">{{ p.labels.secondary }}</Link>
  </Card>
</template>
