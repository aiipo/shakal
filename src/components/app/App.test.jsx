import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";

describe("<App/>", () => {
  it("should be render App with embedded content", () => {
    const { container } = render(<App />);
    screen.debug();
    expect(container.firstChild).toHaveClass("app");
  });

  it("should contain a video element on the page", () => {
    const { container } = render(<App />);
    expect(container).toContainHTML("video");
  });
});
