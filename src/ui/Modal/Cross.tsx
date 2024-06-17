import type { SVGProps } from "react";

export type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export const Cross = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 490 490" width="20" height="20" {...props}>
    <path d="M456.851 0 245 212.564 33.149 0 .708 32.337l211.961 212.667L.708 457.678 33.149 490 245 277.443 456.851 490l32.441-32.322-211.961-212.674L489.292 32.337z" />
  </svg>
);
