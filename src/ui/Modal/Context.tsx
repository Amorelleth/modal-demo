import { createContext, useContext } from "react";

export const ModalContext = createContext<{ container: HTMLElement }>({
  container: document.body,
});

export const useModal = () => {
  return useContext(ModalContext);
};
