import { clsx } from "clsx";

import { Button, type ButtonProps } from "../../Button";

import styles from "./Footer.module.css";

/**
 * ModalFooter props
 */
export type ModalFooterProps = {
  /**
   * Action button props
   */
  action?: Omit<ButtonProps, "variant">;
  /**
   * Dismiss button props
   */
  dismiss?: Omit<ButtonProps, "variant">;
  /**
   * className for the footer container
   */
  className?: string;
  /**
   * Function called when the modal is closed
   */
  onClose: () => void;
};

/**
 * ModalFooter component displays action and dismiss buttons at the bottom of a modal
 * Handles button clicks and triggers the onClose callback appropriately
 */
export const ModalFooter = ({
  action,
  dismiss,
  className,
  onClose,
}: ModalFooterProps) => {
  return (
    <div className={clsx(className, styles.footer)}>
      {action && (
        <Button
          {...action}
          variant="action"
          onClick={() => {
            action?.onClick?.();
            onClose(); // Close modal after control clicked
          }}
        />
      )}
      {dismiss && (
        <Button
          {...dismiss}
          variant="default"
          onClick={() => {
            dismiss?.onClick?.();
            onClose(); // Close modal after control clicked
          }}
        />
      )}
    </div>
  );
};
