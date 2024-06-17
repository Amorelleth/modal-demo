import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";

import { Button, type ButtonProps } from "../Button";
import { useModal } from "./ModalContext";
import { Cross } from "./Cross";

import styles from "./Modal.module.css";

type ModalProps = {
  title: string;
  size?: "medium";
  children: ReactNode;
  footer?: {
    action?: Omit<ButtonProps, "variant">;
    dismiss?: Omit<ButtonProps, "variant">;
  };
  onClose: () => void;
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
  headerClassName,
  contentClassName,
  footerClassName,
}: ModalProps) => {
  const ref = useRef(null);

  const [animation, setAnimation] = useState<"in" | "out">();

  const { container } = useModal();

  const animatedOnClose = useCallback(() => {
    setAnimation("out");
    setTimeout(onClose, 500);
  }, [onClose]);

  useEffect(() => {
    const close = (event: MouseEvent | TouchEvent) => {
      if (event.target === ref.current) {
        animatedOnClose();
      }
    };

    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("click", close);
    };
  }, [onClose, animatedOnClose]);

  useEffect(() => {
    setAnimation("in");
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
        className={clsx(styles.modal, { [styles.medium]: size === "medium" })}
      >
        <ModalHeader
          title={title}
          onClose={animatedOnClose}
          className={headerClassName}
        />

        <div className={clsx(contentClassName, styles.content)}>{children}</div>

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
      <Button shape="pill" onClick={onClose} icon={Cross} />
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
