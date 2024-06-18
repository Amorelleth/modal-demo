import { clsx } from "clsx";
import { forwardRef, type ForwardedRef, type SVGProps } from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  variant?: "action" | "default";
  shape?: "pill" | "rounded";
  text?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const Button = forwardRef(
  (
    {
      variant = "default",
      shape = "rounded",
      text,
      type,
      disabled = false,
      onClick,
      icon: Icon,
      ariaLabel,
    }: ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={onClick}
        className={clsx(styles.button, {
          [styles.action]: variant === "action",
          [styles.default]: variant === "default",
          [styles.pill]: shape === "pill",
          [styles.rounded]: shape === "rounded",
        })}
      >
        {Icon && <Icon />}
        {text}
      </button>
    );
  }
);
