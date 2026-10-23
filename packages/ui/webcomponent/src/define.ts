// Registers <authfly-sign-in>, <authfly-sign-up>, <authfly-request>, <authfly-notice>, <authfly-consent>, <authfly-account>.
// Light DOM: the element renders the widget as its only child. Props: JSON in the `props` attribute, or the `.props` property.
import { renderAuthflyAccount, renderAuthflyConsent, renderAuthflyNotice, renderAuthflyRequest, renderAuthflySignIn, renderAuthflySignUp } from "./blocks/widgets";

const widgets = {
  "authfly-sign-in": renderAuthflySignIn, "authfly-sign-up": renderAuthflySignUp, "authfly-request": renderAuthflyRequest,
  "authfly-notice": renderAuthflyNotice, "authfly-consent": renderAuthflyConsent, "authfly-account": renderAuthflyAccount,
} as const;

export function defineAuthflyElements(): void {
  if (typeof customElements === "undefined") return;
  for (const [tag, render] of Object.entries(widgets)) {
    if (customElements.get(tag)) continue;
    customElements.define(tag, class extends HTMLElement {
      static observedAttributes = ["props"];
      #props: unknown;
      get props(): unknown { return this.#props ?? JSON.parse(this.getAttribute("props") || "null"); }
      set props(v: unknown) { this.#props = v; this.update(); }
      connectedCallback(): void { this.update(); }
      attributeChangedCallback(): void { this.update(); }
      update(): void { const p = this.props; if (p && this.isConnected) this.replaceChildren((render as (p: never) => Element)(p as never)); }
    });
  }
}

defineAuthflyElements();
