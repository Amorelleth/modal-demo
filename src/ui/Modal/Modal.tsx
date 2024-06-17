import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { useModal } from "./ModalContext";

import styles from "./Modal.module.css";

export const Modal = ({
  isOpen,
  title,
  onClose,
  children,
}: {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) => {
  const ref = useRef(null);

  const { container } = useModal();

  useEffect(() => {
    const close = (event: MouseEvent | TouchEvent) => {
      if (event.target === ref.current) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", close);
    } else {
      document.removeEventListener("click", close);
    }

    return () => {
      document.removeEventListener("click", close);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div ref={ref} className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </header>
        {children}
      </div>
    </div>,
    container
  );
};
