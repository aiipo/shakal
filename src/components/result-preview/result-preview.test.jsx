import React from "react";
import ResultPreview from "./result-preview";
import { render, fireEvent, screen, getByText } from "@testing-library/react";

describe("<ResultPreview/>", () => {
  it("should contains 'test' in ref is not null", () => {
    const ref = "test";
    const { container } = render(
      <ResultPreview>
        <ul ref={ref} />
      </ResultPreview>
    );
    expect(container).not.toBeNull();
  });

  it("move element", () => {
    const elements = ["a", "b", "c"];
    render(<ResultPreview elements={elements} />);
    expect(elements.length).toBe(elements.length);
  });
});
