import { clsx } from "clsx";
import type { SVGProps } from "react";

import styles from "./Button.module.css";

export const Button = ({
  variant = "default",
  shape = "rounded",
  text,
  type,
  onClick,
  icon: Icon,
  ...props
}: {
  variant?: "action" | "default";
  shape?: "pill" | "rounded";
  text?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}) => {
  return (
    <button
      {...props}
      type={type}
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
};
