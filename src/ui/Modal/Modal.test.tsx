import { describe, it } from "vitest";

describe("ModalHeader", () => {
  it("renders title", () => {});
  it("passes labelId", () => {});
  it("passes custom className", () => {});
  it("renders close button", () => {});
  it("calls onClose when close button clicked", () => {});
});

describe("ModalFooter", () => {
  it("renders action button if passed", () => {});
  it("renders dismiss button if passed", () => {});
  it("passes custom className", () => {});
  it("calls action.onClick when action button clicked", () => {});
  it("calls onClose after action.onClick when action button clicked", () => {});
  it("calls dismiss.onClick when dismiss button clicked", () => {});
  it("calls onClose after dismiss.onClick when dismiss button clicked", () => {});
});

describe("ModalProvider", () => {
  it("renders children", () => {});
  it("passes value to context", () => {});
  it("context.container defaults to document.body", () => {});
});

describe("useFocusTrap", () => {
  it("returns first focusable child", () => {});
  it("returns handleTab", () => {});
  it("returns handleTab working as expected", () => {});
});

describe("Modal", () => {
  it("renders null when isOpen is false", () => {});
  it("renders when isOpen is true", () => {});
  it("renders children", () => {});
  it("renders to the container from context", () => {});

  // a11y
  it("has correct role", () => {});
  it("passes aria-modal true", () => {});
  it("passes aria-describedby equal to children container id if children is string", () => {});
  it("passes aria-labelledby equal to labelId passed to ModalHeader");
  it("focuses first focusable element after opening", () => {});
  it("calls onClose on outside click", () => {});
  // keyboard
  it("traps focus inside the modal on tab press", () => {});
  it("traps focus inside the modal on shift tab press", () => {});
  it("returns focus to triggerRef after closing", () => {});
  it("calls onClose on pressing escape", () => {});

  // classNames
  it("passes contentClassName to content wrapper", () => {});
  it("passes footerClassName to ModalFooter", () => {});
  it("passes headerClassName to ModalHeader", () => {});

  // passing props to child components
  it("passes title to ModalHeader", () => {});
  it("passes onClose to ModalHeader", () => {});
  it("passes onClose to ModalFooter", () => {});
  it("renders ModalFooter if not empty footer prop passed", () => {});
  it("passes footer prop to ModalFooter", () => {});
});
