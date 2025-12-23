import React, { useState, useEffect, createContext, useContext } from "react";
import { a11yCtrl } from "@my-lib/core";

const A11yContext = createContext(a11yCtrl.state);

export const A11yProvider = ({ children }) => {
  const [state, setState] = useState(a11yCtrl.state);

  useEffect(() => {
    // Core 상태가 변하면 React State도 업데이트 -> 리렌더링 발생
    const unsubscribe = a11yCtrl.subscribe(setState);
    return unsubscribe;
  }, []);

  // Provider value에 상태와 메서드(a11yCtrl)를 같이 전달
  return (
    <A11yContext.Provider value={{ ...state, ctrl: a11yCtrl }}>{children}</A11yContext.Provider>
  );
};

export const useA11y = () => {
  const context = useContext(A11yContext);
  // 사용 편의를 위해 ctrl 메서드를 바로 꺼내 쓸 수 있게 매핑
  return {
    ...context,
    cycleContrast: context.ctrl.cycleContrast.bind(context.ctrl),
    // ...
  };
};
