import { clsx } from "clsx";

import { Button } from "../Button";
import { Cross } from "./Cross";

import styles from "./Modal.module.css";

/**
 * ModalHeader props
 */
type ModalHeaderProps = {
  /**
   * id of the label element associated with the header title
   */
  labelId: string;
  /**
   * Title text
   */
  title: string;
  /**
   * className for the header container
   */
  className?: string;
  /**
   * Aria label for close button in the header
   * @default "Close"
   */
  buttonAriaLabel?: string;
  /**
   * Function called when the modal is closed
   */
  onClose: () => void;
};

/**
 * ModalHeader component renders a header with a title and a close button.
 */
export const ModalHeader = ({
  labelId,
  title,
  className,
  buttonAriaLabel = "Close",
  onClose,
}: ModalHeaderProps) => {
  return (
    <header className={clsx(className, styles.header)}>
      <h3 className={styles.title} id={labelId}>
        {title}
      </h3>
      <Button
        shape="pill"
        onClick={onClose}
        ariaLabel={buttonAriaLabel}
        icon={Cross}
      />
    </header>
  );
};
