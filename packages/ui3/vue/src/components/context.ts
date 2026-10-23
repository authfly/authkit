import type { InjectionKey, Ref } from "vue";
/** Id of the form-level (server) error element, provided by <Form :error-id>. */
export const FormErrorKey: InjectionKey<Ref<string | undefined>> = Symbol("authfly-form-error");
