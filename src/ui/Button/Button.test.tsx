import { render } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";

import { Button } from "./Button";

describe("App", () => {
  it("has correct role", () => {
    const { getByRole } = render(<Button text="Text" />);

    getByRole("button");
  });

  it("renders text", () => {
    const { getByText } = render(<Button text="Text" />);

    getByText("Text");
  });

  it("renders icon", () => {
    const icon = vi.fn();

    render(<Button icon={icon} />);
    expect(icon).toBeCalled();
  });

  it("renders text with icon", () => {
    const icon = vi.fn();

    const { getByText } = render(<Button icon={icon} text="Text" />);

    getByText("Text");
    expect(icon).toBeCalled();
  });

  it("defaults to type 'button'", () => {
    const { getByRole } = render(<Button text="Text" />);

    expect(getByRole("button")).toHaveAttribute("type", "button");
  });

  it("passes type attribute", () => {
    const { getByRole } = render(<Button text="Text" type="submit" />);

    expect(getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();

    const { getByText } = render(<Button onClick={onClick} text="Text" />);

    getByText("Text").click();
    expect(onClick).toBeCalled();
  });

  it("applies disabled prop", () => {
    const { getByRole } = render(<Button text="Text" disabled />);

    expect(getByRole("button")).toBeDisabled();
  });

  it("is not clickable if disabled", () => {
    const { getByRole } = render(<Button text="Text" disabled />);

    expect(getByRole("button")).toBeDisabled();
  });

  it("passes correct aria-disabled", () => {
    const { getByRole, rerender } = render(<Button text="Text" disabled />);

    expect(getByRole("button")).toHaveAttribute("aria-disabled", "true");

    rerender(<Button text="Text" />);

    expect(getByRole("button")).toHaveAttribute("aria-disabled", "false");
  });

  it("passes aria-label", () => {
    const { getByLabelText } = render(<Button ariaLabel="Text" />);

    getByLabelText("Text");
  });
});
