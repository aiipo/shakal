import React from "react";
import ResultPreview from "./result-preview";
import { render, fireEvent, screen, getByText } from "@testing-library/react";

describe("<ResultPreview/>", () => {

  it("should contains 'test' in ref is not null", () => {
    const ref = "test"
    const { container } = render(
        <ResultPreview>
          <ul ref={ref}/>
        </ResultPreview>
    );
    expect(container).not.toBeNull();
  });

  it("should contains 'result' in className", () => {
    const className = "result";
    render(<ResultPreview className={className} />);
    expect(screen.queryByText(className)).not.toBeInTheDocument();
  });

  it("move element", () => {
    const elements = ["a", "b", "c"];
    render(<ResultPreview elements={elements} />);
    expect(elements.length).toBe(3);
  });
});
