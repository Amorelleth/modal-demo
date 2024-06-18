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

import { useFocusTrap } from "../../hooks/useFocusTrap";

import { ModalHeader } from "./Header";
import { useModal } from "./Provider";
import { ModalFooter, type ModalFooterProps } from "./Footer";

import styles from "./Modal.module.css";

/**
 * Modal component props
 */
export type ModalProps = {
  /**
   * Title displayed in the header
   */
  title: string;
  /**
   * Modal content
   */
  children: ReactNode;
  /**
   * Close modal handler
   */
  onClose: () => void;

  /**
   * Size of the modal, currently only "medium" is supported
   */
  size?: "medium";
  /**
   * Optional footer buttons
   */
  footer?: {
    action?: ModalFooterProps["action"];
    dismiss?: ModalFooterProps["dismiss"];
  };
  /**
   * Trigger element ref
   */
  triggerRef?: RefObject<HTMLElement>;
  /**
   * Aria attributes
   */
  ariaProps?: {
    closeButton?: {
      // close button 'aria-label'
      label?: string;
    };
    modal?: {
      // modal content 'aria-describedby'
      describedby?: string;
      // modal content 'aria-labelledby'
      labelledby?: string;
    };
  };
  /**
   * ModalHeader custom className
   */
  headerClassName?: string;
  /**
   * Modal content custom className
   */
  contentClassName?: string;
  /**
   * ModalFooter custom className
   */
  footerClassName?: string;
};

/**
 * Modal wraper component managing moal visibility
 */
export const Modal = ({
  isOpen,
  ...props
}: ModalProps & { isOpen: boolean }) => {
  if (!isOpen) return null;

  return <ModalOpened {...props} />;
};

// https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

/**
 * ModalOpened renders an open modal
 * Implemented in accordance with the requirements https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
const ModalOpened = ({
  title,
  size = "medium",
  children,
  footer,
  onClose,
  triggerRef,
  ariaProps,
  headerClassName,
  contentClassName,
  footerClassName,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [animation, setAnimation] = useState<"in" | "out">();

  const { container } = useModal();
  const { firstFocusable, handleTab } = useFocusTrap(ref?.current);

  const labelId = useId();
  const descriptionId = useId();

  // Function to animate opening and closing of modal
  const animatedOnClose = useCallback(() => {
    setAnimation("out");

    // Timeout is the same as CSS transition length
    setTimeout(() => {
      triggerRef?.current?.focus();
      onClose();
    }, 500);
  }, [onClose, triggerRef]);

  // Handle keyboard and click events for closing the modal
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

  // Setting animation state to "in" and focus on the first focusable element
  // when the modal opens
  useEffect(() => {
    setAnimation("in");
    firstFocusable?.focus();
  }, [firstFocusable]);

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
          ariaProps?.modal?.describedby ??
          (typeof children === "string" ? descriptionId : undefined)
        }
        aria-labelledby={ariaProps?.modal?.labelledby ?? labelId}
        className={clsx(styles.modal, { [styles.medium]: size === "medium" })}
      >
        <ModalHeader
          title={title}
          onClose={animatedOnClose}
          className={headerClassName}
          labelId={labelId}
          buttonAriaLabel={ariaProps?.closeButton?.label}
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
