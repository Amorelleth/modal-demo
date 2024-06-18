import { createContext, useContext } from "react";

/**
 * Modal context providing access to the modal container element
 */
export const ModalContext = createContext<{ container: HTMLElement }>({
  container: document.body, // default container
});

/**
 * Hook that provides access to the ModalContext
 * Use this hook to access the modal container element from any component within the ModalContext provider
 */
export const useModal = () => {
  return useContext(ModalContext);
};
