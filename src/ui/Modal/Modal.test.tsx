import type { RefObject } from "react";

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { expect, describe, it, vi } from "vitest";

import { Modal } from "./Modal";
import { ModalProvider } from "./Provider";

import * as modalFooterModule from "./Footer";
import * as modalHeaderModule from "./Header";

describe("Modal", () => {
  it("renders null when isOpen is false", () => {
    const container = document.createElement("div");
    document.body.append(container);

    render(
      <>
        <ModalProvider container={container}>
          <Modal isOpen={false} title="Title" onClose={vi.fn()}>
            children
          </Modal>
        </ModalProvider>
      </>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders when isOpen is true", () => {
    const container = document.createElement("div");
    document.body.append(container);

    render(
      <>
        <ModalProvider container={container}>
          <Modal isOpen title="Title" onClose={vi.fn()}>
            children
          </Modal>
        </ModalProvider>
      </>
    );
    expect(container).not.toBeEmptyDOMElement();
  });

  it("renders children when open", () => {
    const { getByText } = render(
      <Modal isOpen title="Title" onClose={vi.fn()}>
        children
      </Modal>
    );
    getByText("children");
  });

  /**
   * Checking a11y tests
   */
  it("has correct role", () => {
    const { getByRole } = render(
      <Modal isOpen title="Title" onClose={vi.fn()}>
        children
      </Modal>
    );
    getByRole("dialog");
  });

  it("passes aria-modal true", () => {
    const { getByRole } = render(
      <Modal isOpen title="Title" onClose={vi.fn()}>
        children
      </Modal>
    );
    expect(getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("focuses first focusable element after opening", () => {
    const { getByLabelText } = render(
      <Modal
        isOpen
        title="Title"
        onClose={vi.fn()}
        ariaProps={{ closeButton: { label: "close" } }}
      >
        children
      </Modal>
    );
    expect(getByLabelText("close")).toHaveFocus();
  });

  it("calls onClose on pressing escape", async () => {
    const onClose = vi.fn();
    render(
      <Modal
        isOpen
        title="Title"
        onClose={onClose}
        ariaProps={{ closeButton: { label: "close" } }}
      >
        children
      </Modal>
    );

    await userEvent.keyboard("{Escape}");
    await vi.waitFor(() => expect(onClose).toBeCalled(), { timeout: 600 });
  });

  it("returns focus to triggerRef after closing", async () => {
    const focus = vi.fn();

    render(
      <Modal
        isOpen
        title="Title"
        triggerRef={{ current: { focus } } as unknown as RefObject<HTMLElement>}
        onClose={() => {}}
        ariaProps={{ closeButton: { label: "close" } }}
      >
        children
      </Modal>
    );

    await userEvent.keyboard("{Escape}");
    await vi.waitFor(() => expect(focus).toBeCalled(), { timeout: 600 });
  });

  it("calls onClose on outside click", async () => {
    const onClose = vi.fn();

    const { getByRole } = render(
      <>
        <div>outside element</div>
        <Modal
          isOpen
          title="Title"
          onClose={onClose}
          ariaProps={{ closeButton: { label: "close" } }}
        >
          children
        </Modal>
      </>
    );

    getByRole("dialog").parentElement?.click();
    await vi.waitFor(() => expect(onClose).toBeCalled(), { timeout: 600 });
  });

  it("passes aria-describedby", () => {
    const { getByRole } = render(
      <Modal
        isOpen
        title="Title"
        ariaProps={{ modal: { describedby: "description" } }}
        onClose={vi.fn()}
      >
        <div id="description">description</div>
      </Modal>
    );
    expect(getByRole("dialog")).toHaveAccessibleDescription("description");
  });

  it("passes aria-labelledby", () => {
    const { getByRole } = render(
      <Modal
        isOpen
        title="Title"
        ariaProps={{ modal: { labelledby: "label" } }}
        onClose={vi.fn()}
      >
        <div id="label">label</div>
      </Modal>
    );
    expect(getByRole("dialog")).toHaveAccessibleName("label");
  });

  it("defaults aria-describedby equal to children container id if children is string", () => {
    const { getByRole } = render(
      <Modal isOpen title="Title" onClose={vi.fn()}>
        children
      </Modal>
    );
    expect(getByRole("dialog")).toHaveAccessibleDescription("children");
  });

  it("defaults aria-labelledby equal to labelId passed to ModalHeader", () => {
    const { getByRole } = render(
      <Modal isOpen title="Title" onClose={vi.fn()}>
        children
      </Modal>
    );
    expect(getByRole("dialog")).toHaveAccessibleName("Title");
  });

  /**
   * Child components tests
   */
  it("renders ModalHeader, passing all the props", () => {
    const ModalHeaderSpy = vi
      .spyOn(modalHeaderModule, "ModalHeader")
      .mockReturnValue(<></>);

    render(
      <Modal
        isOpen
        title="Title"
        onClose={vi.fn()}
        headerClassName="customClassName"
        ariaProps={{ closeButton: { label: "Close" } }}
      >
        children
      </Modal>
    );

    expect(ModalHeaderSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Title",
        className: "customClassName",
        buttonAriaLabel: "Close",
      }),
      expect.anything()
    );

    ModalHeaderSpy.mockRestore();
  });

  it("renders ModalFooter, passing all the props", () => {
    const ModalFooterSpy = vi
      .spyOn(modalFooterModule, "ModalFooter")
      .mockReturnValue(<></>);

    render(
      <Modal
        isOpen
        title="Title"
        onClose={vi.fn()}
        footer={{
          action: { text: "Action" },
          dismiss: { text: "Close" },
        }}
        footerClassName="customClassName"
      >
        children
      </Modal>
    );

    expect(ModalFooterSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: { text: "Action" },
        dismiss: { text: "Close" },
        className: "customClassName",
      }),
      expect.anything()
    );

    ModalFooterSpy.mockRestore();
  });

  it("does not render ModalFooter if footer.action and footer.dismiss are not passed", () => {
    const ModalFooterSpy = vi
      .spyOn(modalFooterModule, "ModalFooter")
      .mockReturnValue(<></>);

    render(
      <Modal isOpen title="Title" onClose={vi.fn()} footer={{}}>
        children
      </Modal>
    );
    expect(ModalFooterSpy).not.toHaveBeenCalled();

    ModalFooterSpy.mockRestore();
  });

  /**
   * Passing classNames tests
   */
  it("passes contentClassName", () => {
    render(
      <Modal
        isOpen
        title="Title"
        onClose={vi.fn()}
        contentClassName="contentClassName"
      >
        children
      </Modal>
    );
    expect(
      document.body.querySelector(".contentClassName")
    ).toBeInTheDocument();
  });

  it("passes footerClassName", () => {
    render(
      <Modal
        isOpen
        title="Title"
        onClose={vi.fn()}
        footerClassName="footerClassName"
        footer={{ action: { text: "text" } }}
      >
        children
      </Modal>
    );
    expect(document.body.querySelector(".footerClassName")).toBeInTheDocument();
  });

  it("passes headerClassName", () => {
    render(
      <Modal
        isOpen
        title="Title"
        onClose={vi.fn()}
        headerClassName="headerClassName"
      >
        children
      </Modal>
    );
    expect(document.body.querySelector(".headerClassName")).toBeInTheDocument();
  });
});
