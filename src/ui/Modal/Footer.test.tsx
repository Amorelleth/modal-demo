import { render } from "@testing-library/react";

import { expect, describe, it, vi } from "vitest";

import { ModalFooter } from "./Footer";

describe("ModalFooter", () => {
  it("renders action button if passed", () => {
    const { getByText } = render(
      <ModalFooter action={{ text: "Action" }} onClose={vi.fn()} />
    );
    getByText("Action");
  });

  it("renders dismiss button if passed", () => {
    const { getByText } = render(
      <ModalFooter dismiss={{ text: "Dismiss" }} onClose={vi.fn()} />
    );
    getByText("Dismiss");
  });

  it("passes custom className", () => {
    const { container } = render(
      <ModalFooter
        dismiss={{ text: "Dismiss" }}
        onClose={vi.fn()}
        className="customClassName"
      />
    );
    expect(container.querySelector(".customClassName")).toBeInTheDocument();
  });

  it("calls action.onClick when action button clicked", () => {
    const onClick = vi.fn();

    const { getByText } = render(
      <ModalFooter action={{ text: "Action", onClick }} onClose={vi.fn()} />
    );

    getByText("Action").click();
    expect(onClick).toBeCalled();
  });

  it("calls onClose after action.onClick when action button clicked", () => {
    const onClose = vi.fn();

    const { getByText } = render(
      <ModalFooter
        action={{ text: "Action", onClick: vi.fn() }}
        onClose={onClose}
      />
    );

    getByText("Action").click();
    expect(onClose).toBeCalled();
  });

  it("calls dismiss.onClick when dismiss button clicked", () => {
    const onClick = vi.fn();

    const { getByText } = render(
      <ModalFooter dismiss={{ text: "Dismiss", onClick }} onClose={vi.fn()} />
    );

    getByText("Dismiss").click();
    expect(onClick).toBeCalled();
  });

  it("calls onClose after dismiss.onClick when dismiss button clicked", () => {
    const onClose = vi.fn();

    const { getByText } = render(
      <ModalFooter
        dismiss={{ text: "Dismiss", onClick: () => {} }}
        onClose={onClose}
      />
    );

    getByText("Dismiss").click();
    expect(onClose).toBeCalled();
  });
});
