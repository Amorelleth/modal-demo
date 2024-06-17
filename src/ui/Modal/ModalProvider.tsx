import type { ReactNode } from "react";

import { ModalContext } from "./ModalContext";

export const ModalProvider = ({
  container = document.body,
  children,
}: {
  container: HTMLElement;
  children: ReactNode;
}) => {
  return (
    <ModalContext.Provider value={{ container }}>
      {children}
    </ModalContext.Provider>
  );
};
