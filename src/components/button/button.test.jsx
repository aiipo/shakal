import React from "react";
import Button from "./button";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

describe("<Button/>", () => {
  it("should be clicked", () => {
    const func = jest.fn();
    render(<Button onClick={func} />);
    fireEvent.click(screen.getByRole("button"));
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("should contains children in the document", () => {
    const child = "word";
    render(<Button>{child}</Button>);
    expect(screen.getByText(child)).toBeInTheDocument();
  });

  it("should set children", () => {
    const child = "children";
    render(<Button>{child}</Button>);
    try {
      screen.getByText(child);
    } catch (e) {
      expect(e.message).toContain(
        `Unable to find an element with the text: ${child}`
      );
    }
    cleanup();
    render(<Button>{child}</Button>);
    expect(screen.getByText(child)).not.toBe(null);
  });

  it("disabled contains property", () => {
    const func = jest.fn();
    render(<Button onClick={func} disabled={true} />);
    fireEvent.click(screen.getByRole("button"));
    expect(func).not.toBeCalled();
  });

  it("should be different types of buttons", () => {
    expect("submit").toMatch(/submit/);
    expect("button").toMatch(/button/);
    expect("reset").toMatch(/reset/);
  });

  it("should contains 'word' in className", () => {
    const className = "word";
    const { container } = render(<Button className={className} />);
    expect(container.firstChild).toHaveClass(className);
  });

  it("should be focus", () => {
    const className = "word";
    render(<Button className={className} />);
    expect(screen.getByRole("button")).not.toHaveFocus();
    screen.getByRole("button").focus();
    expect(screen.getByRole("button")).toHaveFocus(1);
  });

  it("button is a link", () => {
    const href = "it";
    const { container } = render(
      <Router>
        <Button href={href} />
      </Router>
    );
    expect(container.firstChild).toHaveAttribute("href");
  });
});
