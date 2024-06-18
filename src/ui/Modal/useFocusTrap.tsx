import { useCallback, useState, useEffect } from "react";

// focusable elements selectors
const focusableSelectors = [
  "a[href]:not([disabled])",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
];

type FocusTrapReturnType = {
  firstFocusable?: HTMLElement;
  handleTab: (event: KeyboardEvent) => void;
};

/**
 * Hook managing focus trapping within a specified element
 *
 * @param element HTML element to trap focus within.
 * @returns {FocusTrapReturnType}
 */
export function useFocusTrap(element: HTMLElement | null): FocusTrapReturnType {
  const [focusable, setFocusable] = useState<{
    first: HTMLElement;
    last: HTMLElement;
  }>();

  useEffect(() => {
    if (!element) return;

    // Select all focusable elements within the provided element
    const focusableElements = element.querySelectorAll<HTMLElement>(
      focusableSelectors.join(",")
    );

    setFocusable({
      first: focusableElements[0],
      last: focusableElements[focusableElements.length - 1],
    });
  }, [element]);

  return {
    firstFocusable: focusable?.first,

    handleTab: useCallback(
      (event: KeyboardEvent) => {
        if (event.key !== "Tab") return;

        if (event.shiftKey) {
          // Handle shift + tab to move focus backward
          if (document.activeElement === focusable?.first) {
            focusable.last.focus();
            event.preventDefault();
          }
        } else {
          // Handle tab to move focus forward
          if (document.activeElement === focusable?.last) {
            focusable.first?.focus();
            event.preventDefault();
          }
        }
      },
      [focusable]
    ),
  };
}
