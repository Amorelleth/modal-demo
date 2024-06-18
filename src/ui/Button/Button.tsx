import { clsx } from "clsx";
import { forwardRef, type ForwardedRef, type SVGProps } from "react";

import styles from "./Button.module.css";

/**
 * Button component props
 */
export type ButtonProps = {
  /**
   * Visual variant of the button
   * @default "default"
   */
  variant?: "action" | "default";
  /**
   * Button shape
   * @default "rounded"
   */
  shape?: "pill" | "rounded";
  /**
   * Text displayed on the button
   */
  text?: string;
  /**
   * Type of button
   * @default "button"
   */
  type?: "submit" | "reset" | "button";
  /**
   * If the button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Aria label for accessibility purposes
   */
  ariaLabel?: string;
  /**
   * Function called when the button is clicked
   */
  onClick?: () => void;
  /**
   * Optional icon component to render inside the button with or instead of 'text' prop
   */
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

/**
 * Button component rendering a styled button with optional icon and text
 * Forwards ref to the underlying button element
 * Implemented in accordance with the requirements https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const Button = forwardRef(
  (
    {
      variant = "default",
      shape = "rounded",
      type = "button",
      disabled = false,
      text,
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
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled}
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
