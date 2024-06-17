import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { clsx } from "clsx";

import { useModal } from "./ModalContext";

import { Button } from "../Button";

import { Cross } from "./Cross";

import styles from "./Modal.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  disabled?: boolean;
  name?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};

type ModalProps = {
  title: string;
  size?: "medium";
  children: ReactNode;
  footer?: {
    action?: ButtonProps;
    dismiss?: ButtonProps;
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

  useEffect(() => {
    const close = (event: MouseEvent | TouchEvent) => {
      if (event.target === ref.current) {
        setAnimation("out");
        setTimeout(onClose, 500);
      }
    };

    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("click", close);
    };
  }, [onClose]);

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
      <Button shape="pill" onClick={onClose} icon={Cross} />
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
      {action && <Button variant="action" text={action.text} />}
      {dismiss && <Button variant="default" text={dismiss.text} />}
    </div>
  );
};
