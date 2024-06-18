import { render } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import { App } from "./App";

describe("App", () => {
  it("renders title", () => {
    const { getByText } = render(<App />);

    expect(getByText("Demo Page")).toBeInTheDocument();
  });
});
