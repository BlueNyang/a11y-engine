// packages/core/src/A11yController.js
import { A11yContrast /* 필요한 Enum들 import */ } from "./a11yEnums.js";
import { saveA11y, loadA11y } from "./a11y-storage.js";

// 초기 상태 (Redux initial state 참고)
const initialState = {
  contrastLevel: 0,
  // ... 나머지 상태들
};

export class A11yController {
  constructor() {
    this.state = { ...initialState, ...loadA11y() };
    this.listeners = new Set();
    this.init();
  }

  // 상태 구독 (React, Vue 등에서 사용)
  subscribe(listener) {
    this.listeners.add(listener);
    // 구독 즉시 현재 상태 전달
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  // 상태 업데이트 및 알림
  setState(newState) {
    this.state = { ...this.state, ...newState };
    saveA11y(this.state);
    this.applyEffects();
    this.listeners.forEach((listener) => listener(this.state));
  }

  // === 액션 메서드들 (Redux Reducers 대체) ===
  cycleContrast() {
    const nextLevel = (this.state.contrastLevel + 1) % A11yContrast.OPTION_SIZE;
    this.setState({ contrastLevel: nextLevel });
  }

  // ... toggleScreenReader 등 나머지 메서드 구현 ...

  // === DOM 조작 (useA11yEffect 대체) ===
  applyEffects() {
    const root = document.documentElement;
    // ... 기존 useEffect 안에 있던 classList.add/remove 로직을 여기에 그대로 붙여넣기 ...
  }

  init() {
    this.applyEffects();
    // 스크린 리더 이벤트 리스너 등록 등
  }
}

// 싱글톤 인스턴스 export
export const a11yCtrl = new A11yController();
