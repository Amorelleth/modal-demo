import type { ReactNode } from "react";

import { ModalContext } from "./Context";

/**
 * ModalProvider wraps its children with ModalContext.Provider
 *
 * @param container Optional HTML element where modals will be rendered
 * @param children React nodes that are wrapped by the ModalProvider
 */
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
