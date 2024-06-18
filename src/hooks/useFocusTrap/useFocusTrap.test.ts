import { renderHook } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { expect, describe, it } from "vitest";

import { useFocusTrap } from "./useFocusTrap";

describe("useFocusTrap", () => {
  it("returns first focusable child", () => {
    const element = document.createElement("div");
    const button = document.createElement("button");

    element.appendChild(button);
    element.appendChild(document.createElement("input"));
    element.appendChild(document.createElement("select"));

    const { result } = renderHook(() => useFocusTrap(element));

    expect(result.current.firstFocusable).toBe(button);
  });

  it("does not return disabled element as focusable child", () => {
    const element = document.createElement("div");

    const button = document.createElement("button");
    const input = document.createElement("input");

    button.disabled = true;
    element.appendChild(button);
    element.appendChild(input);
    element.appendChild(document.createElement("select"));

    const { result } = renderHook(() => useFocusTrap(element));

    expect(result.current.firstFocusable).toBe(input);
  });

  it("returns handleTab handling tab event as expected", async () => {
    const element = document.createElement("div");

    const button = document.createElement("button");
    const input = document.createElement("input");
    const select = document.createElement("select");

    element.appendChild(button);
    element.appendChild(input);
    element.appendChild(select);

    // focusable element outside the target element
    document.body.appendChild(document.createElement("textarea"));
    document.body.appendChild(element);

    const { result } = renderHook(() => useFocusTrap(element));

    document.addEventListener("keydown", result.current.handleTab);

    result.current.firstFocusable?.focus();
    expect(button).toHaveFocus();

    await userEvent.tab();
    expect(input).toHaveFocus();

    await userEvent.tab();
    expect(select).toHaveFocus();

    await userEvent.tab();
    expect(button).toHaveFocus();

    document.removeEventListener("keydown", result.current.handleTab);
  });

  it("returns handleTab handling tab-shift event as expected", async () => {
    const element = document.createElement("div");

    const button = document.createElement("button");
    const input = document.createElement("input");
    const select = document.createElement("select");

    element.appendChild(button);
    element.appendChild(input);
    element.appendChild(select);

    // focusable element outside the target element
    document.body.appendChild(document.createElement("textarea"));
    document.body.appendChild(element);

    const { result } = renderHook(() => useFocusTrap(element));

    document.addEventListener("keydown", result.current.handleTab);

    result.current.firstFocusable?.focus();

    await userEvent.tab({ shift: true });
    expect(select).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(input).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(button).toHaveFocus();

    document.removeEventListener("keydown", result.current.handleTab);
  });
});
