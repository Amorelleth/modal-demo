import type { ReactNode } from "react";

import { ModalContext } from "./Context";

export const ModalProvider = ({
  container,
  children,
}: {
  container?: HTMLElement | null;
  children: ReactNode;
}) => {
  return (
    <ModalContext.Provider value={{ container: container ?? document.body }}>
      {children}
    </ModalContext.Provider>
  );
};