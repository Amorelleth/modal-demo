import { useCallback, useState, useEffect } from "react";

const focusableSelectors = [
  "a[href]:not([disabled])",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
];

export function useFocusTrap(element: HTMLElement | null) {
  const [focusable, setFocusable] = useState<{
    first: HTMLElement;
    last: HTMLElement;
  }>();

  useEffect(() => {
    if (!element) return;

    const focusableElements = element.querySelectorAll<HTMLElement>(
      focusableSelectors.join(",")
    );

    setFocusable({
      first: focusableElements[0],
      last: focusableElements[focusableElements.length - 1],
    });
  }, [element]);

  return {
    handleTab: useCallback(
      (event: KeyboardEvent) => {
        if (event.key !== "Tab") return;

        if (event.shiftKey) {
          if (document.activeElement === focusable?.first) {
            focusable.last.focus();
            event.preventDefault();
          }
        } else if (document.activeElement === focusable?.last) {
          focusable.first?.focus();
          event.preventDefault();
        }
      },
      [focusable]
    ),
  };
}
