import {
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { clsx } from "clsx";

import { useModal } from "./ModalContext";

import styles from "./Modal.module.css";

// - body with any random content
// - a footer with "Close" and "Save" buttons
// - responsive with the header and footer static but body part being scrollable
// - opens with a fade-in transition and closes with a fade-out transition.

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  disabled?: boolean;
  name?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};

export const Modal = ({
  isOpen,
  title,
  children,
  footer,
  onClose,

  headerClassName,
  contentClassName,
  footerClassName,
}: {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  footer?: {
    action?: ButtonProps;
    dismiss?: ButtonProps;
  };
  onClose: () => void;

  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
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
  console.log(footer?.action);
  return createPortal(
    <div ref={ref} className={styles.overlay}>
      <div className={styles.modal}>
        <ModalHeader
          title={title}
          onClose={onClose}
          className={headerClassName}
        />

        <div className={clsx(contentClassName, styles.content)}>{children}</div>

        {(footer?.action || footer?.dismiss) && (
          <ModalFooter {...footer} className={footerClassName} />
        )}
      </div>
    </div>,
    container
  );
};

const ModalHeader = ({
  title,
  className,
  onClose,
}: {
  title: string;
  className?: string;
  onClose: () => void;
}) => {
  return (
    <header className={clsx(className, styles.header)}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
    </header>
  );
};

const ModalFooter = ({
  action,
  dismiss,
  className,
}: {
  action?: ButtonProps;
  dismiss?: ButtonProps;
  className?: string;
}) => {
  return (
    <div className={clsx(className, styles.footer)}>
      {action && <button>{action.text}</button>}
      {dismiss && <button>{dismiss.text}</button>}
    </div>
  );
};
