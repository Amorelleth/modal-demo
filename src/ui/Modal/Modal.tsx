import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useId,
  type RefObject,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";

import { ModalHeader } from "./Header";
import { ModalFooter, type FooterProps } from "./Footer";
import { useModal } from "./Context";
import { useFocusTrap } from "./useFocusTrap";

import styles from "./Modal.module.css";

export type ModalProps = {
  title: string;
  size?: "medium";
  children: ReactNode;
  footer?: {
    action?: FooterProps["action"];
    dismiss?: FooterProps["dismiss"];
  };
  onClose: () => void;
  triggerRef?: RefObject<HTMLElement>;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
};

export const Modal = ({
  isOpen,
  ...props
}: ModalProps & { isOpen: boolean }) => {
  if (!isOpen) return null;

  return <ModalOpened {...props} />;
};

const ModalOpened = ({
  title,
  size = "medium",
  children,
  footer,
  onClose,
  triggerRef,
  headerClassName,
  contentClassName,
  footerClassName,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const [animation, setAnimation] = useState<"in" | "out">();

  const { container } = useModal();
  const { handleTab } = useFocusTrap(ref?.current);

  const labelId = useId();
  const descriptionId = useId();

  const animatedOnClose = useCallback(() => {
    setAnimation("out");
    setTimeout(() => {
      triggerRef?.current?.focus();
      onClose();
    }, 500);
  }, [onClose, triggerRef]);

  useEffect(() => {
    const close = (event: MouseEvent | TouchEvent) => {
      if (event.target === ref.current) {
        animatedOnClose();
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      handleTab(event);

      if (event.key === "Escape") {
        animatedOnClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", close);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", close);
    };
  }, [onClose, animatedOnClose, handleTab]);

  useEffect(() => {
    setAnimation("in");
    closeButton.current?.focus();
  }, []);

  return createPortal(
    <div
      ref={ref}
      className={clsx(styles.overlay, {
        [styles.fadeIn]: animation === "in",
        [styles.fadeOut]: animation === "out",
      })}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-describedby={
          typeof children === "string" ? descriptionId : undefined
        }
        aria-labelledby={labelId}
        className={clsx(styles.modal, { [styles.medium]: size === "medium" })}
      >
        <ModalHeader
          title={title}
          buttonRef={closeButton}
          onClose={animatedOnClose}
          className={headerClassName}
          labelId={labelId}
        />

        <div
          id={descriptionId}
          className={clsx(contentClassName, styles.content)}
        >
          {children}
        </div>

        {(footer?.action || footer?.dismiss) && (
          <ModalFooter
            {...footer}
            className={footerClassName}
            onClose={animatedOnClose}
          />
        )}
      </div>
    </div>,
    container
  );
};
