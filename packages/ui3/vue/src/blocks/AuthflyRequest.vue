<script setup lang="ts">
// AuthflyRequest on UI8Kit 3 primitives (vue). Props identical to packages/ui3/react.
import Card from "../components/Card.vue";
import Form from "../components/Form.vue";
import Field from "../components/Field.vue";
import Button from "../ui/button/Button.vue";
import Link from "../ui/link/Link.vue";
import Input from "../ui/input/Input.vue";
import WidgetHead from "./WidgetHead.vue";
import Messages from "./Messages.vue";
import { buttonSkin, linkSkin, inputSkin, checkboxSkin, labelSkin, textSkin } from "../skin/skin";
import type { AuthflyRequestProps } from "./props";
const p = withDefaults(defineProps<AuthflyRequestProps>(), { csrf: "", error: "", info: "", token: "", kind: "email" });
const lm = { "aria-labelledby": p.landmarkLabel ? undefined : `${p.id}-title`, "aria-label": p.landmarkLabel };
const errorId = p.error ? `${p.id}-error` : undefined;
</script>
<template>
  <Card data-testid="authfly-request" v-bind="lm">
    <WidgetHead :id="p.id" :title="p.title" :text="p.text" />
    <Messages :id="p.id" :error="p.error" :info="p.info" />
    <Form method="post" :action="p.action" :error-id="errorId" data-testid="authfly-form">
      <Input type="hidden" name="csrf" :value="p.csrf" />
      <Field v-if="p.kind === 'email'" :label="p.labels.field" :html-for="`${p.id}-email`" v-slot="f">
        <Input type="email" name="email" autocomplete="email" required :id="`${p.id}-email`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe()" :aria-invalid="f.invalid" />
      </Field>
      <template v-if="p.kind === 'password'">
        <Input type="hidden" name="token" :value="p.token" />
        <Field :label="p.labels.field" :html-for="`${p.id}-password`" v-slot="f">
          <Input type="password" name="password" autocomplete="new-password" required :id="`${p.id}-password`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe()" :aria-invalid="f.invalid" />
        </Field>
        <Field :label="p.labels.confirm ?? ''" :html-for="`${p.id}-confirm`" v-slot="f">
          <Input type="password" name="confirm" autocomplete="new-password" required :id="`${p.id}-confirm`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe()" :aria-invalid="f.invalid" />
        </Field>
      </template>
      <Field v-if="p.kind === 'code'" :label="p.labels.field" :html-for="`${p.id}-code`" v-slot="f">
        <Input type="text" name="code" inputmode="numeric" autocomplete="one-time-code" required :id="`${p.id}-code`" :class="inputSkin()" data-testid="field" :aria-describedby="f.describe()" :aria-invalid="f.invalid" />
      </Field>
      <Button type="submit" :class="buttonSkin('default', 'w-full')" data-testid="submit">{{ p.labels.submit }}</Button>
    </Form>
    <Link v-if="p.labels.back" :href="p.labels.backHref" :class="linkSkin('w-fit text-sm')" data-testid="back">{{ p.labels.back }}</Link>
  </Card>
</template>
