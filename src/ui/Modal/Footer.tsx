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
          {...action}
          variant="action"
          onClick={() => {
            action?.onClick?.();
            onClose();
          }}
        />
      )}
      {dismiss && (
        <Button
          {...dismiss}
          variant="default"
          onClick={() => {
            dismiss?.onClick?.();
            onClose();
          }}
        />
      )}
    </div>
  );
};
