<script setup lang="ts">
// AuthflySignUp on UI8Kit 3 primitives (vue). Props identical to packages/ui/react.
import Card from "../components/Card.vue";
import Group from "../components/Group.vue";
import Form from "../components/Form.vue";
import Field from "../components/Field.vue";
import Text from "../ui/text/Text.vue";
import Button from "../ui/button/Button.vue";
import Link from "../ui/link/Link.vue";
import Input from "../ui/input/Input.vue";
import Label from "../ui/label/Label.vue";
import Checkbox from "../ui/checkbox/Checkbox.vue";
import WidgetHead from "./WidgetHead.vue";
import Messages from "./Messages.vue";
import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
import type { AuthflySignUpProps } from "./props";
const p = withDefaults(defineProps<AuthflySignUpProps>(), { csrf: "", error: "", info: "", terms: "show" });
const lm = { "aria-labelledby": p.landmarkLabel ? undefined : `${p.id}-title`, "aria-label": p.landmarkLabel };
const errorId = p.error ? `${p.id}-error` : undefined;
</script>
<template>
  <Card data-testid="authfly-sign-up" v-bind="lm">
    <WidgetHead :id="p.id" :title="p.title" :text="p.text" />
    <Messages :id="p.id" :error="p.error" :info="p.info" />
    <Form method="post" :action="p.action" :error-id="errorId" data-testid="authfly-form">
      <Input type="hidden" name="csrf" :value="p.csrf" />
      <Field :label="p.labels.name" :html-for="`${p.id}-name`" v-slot="f">
        <Input type="text" name="name" autocomplete="name" :id="`${p.id}-name`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe()" :aria-invalid="f.invalid" />
      </Field>
      <Field :label="p.labels.username" :html-for="`${p.id}-username`" v-slot="f">
        <Group gap="2">
          <Input type="text" name="username" autocomplete="username" required :id="`${p.id}-username`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe(p.labels.domain ? `${p.id}-domain` : undefined)" :aria-invalid="f.invalid" />
          <Text v-if="p.labels.domain" tag="span" :id="`${p.id}-domain`" :class="textSkin.muted" data-testid="domain">{{ p.labels.domain }}</Text>
        </Group>
      </Field>
      <Field :label="p.labels.password" :html-for="`${p.id}-password`" :hint="p.labels.hint" v-slot="f">
        <Input type="password" name="password" autocomplete="new-password" required :id="`${p.id}-password`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe()" :aria-invalid="f.invalid" />
      </Field>
      <Group v-if="p.terms === 'show'" gap="2" class="w-fit">
        <Checkbox name="terms" required :id="`${p.id}-terms`" :class="checkboxSkin()" />
        <Label :for="`${p.id}-terms`" :class="labelSkin('font-normal')">{{ p.labels.terms }}</Label>
      </Group>
      <Button type="submit" :class="buttonSkin('default', 'w-full')" data-testid="submit">{{ p.labels.submit }}</Button>
    </Form>
    <Text v-if="p.labels.signinLink" :class="textSkin.muted">{{ p.labels.signinText }} <Link :href="p.labels.signinHref" :class="linkSkin()" data-testid="signin-link">{{ p.labels.signinLink }}</Link></Text>
  </Card>
</template>
