import { render } from "@testing-library/react";

import { expect, describe, it, vi } from "vitest";

import { ModalHeader } from "./Header";

describe("ModalHeader", () => {
  it("renders title", () => {
    const { getByText } = render(
      <ModalHeader title="Title" labelId="label" onClose={vi.fn()} />
    );
    getByText("Title");
  });

  it("passes labelId", () => {
    const { container } = render(
      <ModalHeader title="Title" labelId="label" onClose={vi.fn()} />
    );
    expect(container.querySelector("#label")).toBeInTheDocument();
  });

  it("passes custom className", () => {
    const { container } = render(
      <ModalHeader
        title="Title"
        labelId="label"
        onClose={vi.fn()}
        className="customClassName"
      />
    );
    expect(container.querySelector(".customClassName")).toBeInTheDocument();
  });

  it("renders close button", () => {
    const { getByLabelText } = render(
      <ModalHeader
        title="Title"
        labelId="label"
        onClose={vi.fn()}
        buttonAriaLabel="close"
      />
    );
    getByLabelText("close");
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();

    const { getByLabelText } = render(
      <ModalHeader
        title="Title"
        labelId="label"
        onClose={onClose}
        buttonAriaLabel="close"
      />
    );
    getByLabelText("close").click();
    expect(onClose).toBeCalled();
  });
});
