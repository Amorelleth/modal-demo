import { clsx } from "clsx";

import { Button } from "../Button";
import { Cross } from "./Cross";

import styles from "./Modal.module.css";

export const ModalHeader = ({
  labelId,
  title,
  className,
  buttonAriaLabel = "Close",
  onClose,
}: {
  labelId: string;
  title: string;
  className?: string;
  buttonAriaLabel?: string;
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
        ariaLabel={buttonAriaLabel}
        icon={Cross}
      />
    </header>
  );
};
