import { getContext, setContext } from "svelte";
const KEY = Symbol("authfly-form-error");
/** Form-level (server) error id, set by <Form errorId>; a getter so it stays reactive. */
export const setFormError = (get: () => string | undefined) => setContext(KEY, get);
export const getFormError = (): string | undefined => (getContext<(() => string | undefined) | undefined>(KEY) ?? (() => undefined))();
