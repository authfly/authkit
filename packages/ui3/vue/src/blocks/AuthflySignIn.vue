<script setup lang="ts">
// AuthflySignIn on UI8Kit 3 primitives (vue). Props identical to packages/ui3/react.
import Card from "../components/Card.vue";
import Stack from "../components/Stack.vue";
import Form from "../components/Form.vue";
import Field from "../components/Field.vue";
import LucideIcon from "../components/LucideIcon.vue";
import Text from "../ui/text/Text.vue";
import Button from "../ui/button/Button.vue";
import Link from "../ui/link/Link.vue";
import Input from "../ui/input/Input.vue";
import WidgetHead from "./WidgetHead.vue";
import Messages from "./Messages.vue";
import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
import type { AuthflySignInProps } from "./props";
const p = withDefaults(defineProps<AuthflySignInProps>(), { csrf: "", error: "", method: "password", identifier: "any", social: "none" });
const lm = { "aria-labelledby": p.landmarkLabel ? undefined : `${p.id}-title`, "aria-label": p.landmarkLabel };
const errorId = p.error ? `${p.id}-error` : undefined;
</script>
<template>
  <Card data-testid="authfly-sign-in" v-bind="lm">
    <WidgetHead :id="p.id" :title="p.title" :text="p.text" />
    <Messages :id="p.id" :error="p.error" />
    <Stack v-if="p.social === 'show'" gap="2" role="group" :aria-label="p.labels.providers" data-testid="authfly-providers">
      <Button v-for="pr in p.providers ?? []" :key="pr.id" :href="`${p.labels.socialUrl ?? ''}/${pr.id}`" :class="buttonSkin('outline', 'w-full')" :data-provider="pr.id">
        <LucideIcon :name="pr.icon" />{{ pr.title }}
      </Button>
    </Stack>
    <Form method="post" :action="p.action" :error-id="errorId" data-testid="authfly-form">
      <Input type="hidden" name="csrf" :value="p.csrf" />
      <Field :label="p.labels.identifier" :html-for="`${p.id}-identifier`" v-slot="f">
        <Input :type="p.identifier === 'email' ? 'email' : 'text'" name="identifier" :autocomplete="p.identifier === 'email' ? 'email' : 'username'" required :id="`${p.id}-identifier`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe()" :aria-invalid="f.invalid" />
      </Field>
      <template v-if="p.method === 'password'">
        <Field :label="p.labels.password" :html-for="`${p.id}-password`" v-slot="f">
          <Input type="password" name="password" autocomplete="current-password" required :id="`${p.id}-password`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe()" :aria-invalid="f.invalid" />
        </Field>
        <Link v-if="p.labels.forgot" :href="p.labels.forgotHref" :class="linkSkin('w-fit text-sm')" data-testid="forgot">{{ p.labels.forgot }}</Link>
      </template>
      <Button type="submit" :class="buttonSkin('default', 'w-full')" data-testid="submit">{{ p.labels.submit }}</Button>
    </Form>
    <Button v-if="p.labels.magic" :href="p.labels.magicHref" :class="buttonSkin('outline', 'w-full')" data-testid="switch-method">{{ p.labels.magic }}</Button>
    <Text v-if="p.labels.signupLink" :class="textSkin.muted">{{ p.labels.signupText }} <Link :href="p.labels.signupHref" :class="linkSkin()" data-testid="signup-link">{{ p.labels.signupLink }}</Link></Text>
  </Card>
</template>
