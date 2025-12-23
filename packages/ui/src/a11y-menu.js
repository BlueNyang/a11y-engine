import { LitElement, html } from "lit";
import { a11yCtrl } from "@my-lib/core"; // Core 로직 가져오기

export class A11yMenu extends LitElement {
  static properties = {
    open: { type: Boolean },
    state: { type: Object }, // 상태 저장용
  };

  constructor() {
    super();
    this.state = a11yCtrl.state;
    this.open = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Core 상태 구독
    this.unsubscribe = a11yCtrl.subscribe((newState) => {
      this.state = newState;
      this.requestUpdate(); // 화면 갱신 요청
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  render() {
    // shadcn/ui 대신 표준 HTML/CSS 사용
    return html`
      <button @click="${() => (this.open = !this.open)}">
        접근성 (${this.state.contrastLevel})
      </button>

      ${this.open
        ? html`
            <div class="menu">
              <button @click="${() => a11yCtrl.cycleContrast()}">대비 변경</button>
            </div>
          `
        : ""}
    `;
  }
}

customElements.define("a11y-menu", A11yMenu);
