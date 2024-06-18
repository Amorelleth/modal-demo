import { clsx } from "clsx";

import { Button, type ButtonProps } from "../Button";

import styles from "./Modal.module.css";

export type FooterProps = {
  action?: Omit<ButtonProps, "variant">;
  dismiss?: Omit<ButtonProps, "variant">;
  className?: string;
  onClose: () => void;
};

export const ModalFooter = ({
  action,
  dismiss,
  className,
  onClose,
}: FooterProps) => {
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
