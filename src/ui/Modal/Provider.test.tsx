import { render } from "@testing-library/react";

import { expect, describe, it } from "vitest";

import { ModalProvider } from "./Provider";
import { useModal } from "./Context";

describe("ModalProvider", () => {
  it("renders children", () => {
    const { getByText } = render(<ModalProvider>children</ModalProvider>);
    getByText("children");
  });

  it("passes value to context", () => {
    let container;

    const Component = () => {
      const context = useModal();
      container = context.container;
      return null;
    };

    const customContainer = document.createElement("div");

    render(
      <ModalProvider container={customContainer}>
        <Component />
      </ModalProvider>
    );

    expect(container).toEqual(customContainer);
  });

  it("context.container defaults to document.body", () => {
    let container;

    const Component = () => {
      const context = useModal();
      container = context.container;
      return null;
    };

    render(
      <ModalProvider>
        <Component />
      </ModalProvider>
    );

    expect(container).toEqual(document.body);
  });
});
