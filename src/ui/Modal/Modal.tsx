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

import { Button, type ButtonProps } from "../Button";
import { useModal } from "./ModalContext";
import { Cross } from "./Cross";
import { useFocusTrap } from "./useFocusTrap";

import styles from "./Modal.module.css";

export type ModalProps = {
  title: string;
  size?: "medium";
  children: ReactNode;
  footer?: {
    action?: Omit<ButtonProps, "variant">;
    dismiss?: Omit<ButtonProps, "variant">;
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

export const ModalOpened = ({
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

  const labelId = useId();
  const descriptionId = useId();

  const animatedOnClose = useCallback(() => {
    setAnimation("out");
    setTimeout(() => {
      triggerRef?.current?.focus();
      onClose();
    }, 500);
  }, [onClose, triggerRef]);

  const { handleTab } = useFocusTrap(ref?.current);

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

const ModalHeader = ({
  labelId,
  title,
  className,
  buttonRef,
  onClose,
}: {
  labelId: string;
  title: string;
  className?: string;
  buttonRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
}) => {
  return (
    <header className={clsx(className, styles.header)}>
      <h3 className={styles.title} id={labelId}>
        {title}
      </h3>
      <Button
        shape="pill"
        onClick={onClose}
        ariaLabel="Close"
        ref={buttonRef}
        icon={Cross}
      />
    </header>
  );
};

const ModalFooter = ({
  action,
  dismiss,
  className,
  onClose,
}: {
  action?: Omit<ButtonProps, "variant">;
  dismiss?: Omit<ButtonProps, "variant">;
  className?: string;
  onClose: () => void;
}) => {
  return (
    <div className={clsx(className, styles.footer)}>
      {action && (
        <Button
          variant="action"
          onClick={() => {
            action?.onClick?.();
            onClose();
          }}
          {...action}
        />
      )}
      {dismiss && (
        <Button
          variant="default"
          onClick={() => {
            dismiss?.onClick?.();
            onClose();
          }}
          {...dismiss}
        />
      )}
    </div>
  );
};
