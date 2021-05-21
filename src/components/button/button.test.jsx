import React from "react";
import Button from "./button";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";

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

  it("disabled contains property", () => {
    const func = jest.fn();
    render(<Button onClick={func} disabled={true} />);
    fireEvent.click(screen.getByRole("button"));
    expect(func).not.toBeCalled();
  });

  it("type not null", () => {
    const type = "button";
    render(<Button type={type} />);
    expect(type).not.toBeNull();
    expect(type).toContain("button");
  });

  it("should be different types of buttons", () => {
    expect("submit").toMatch(/submit/);
    expect("button").toMatch(/button/);
    expect("reset").toMatch(/reset/);
  });

  it("should contains 'word' in className", () => {
    const className = "word";
    render(<Button className={className} />);
    expect(screen.getByRole(className)).not.toBeNull();
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

  it("the function should be called when the button is clicked passed to onClick", () => {
    const func = jest.fn();
    render(<Button onClick={func} />);
    fireEvent.click(screen.getByRole("button"));
    expect(func.mock.calls.length).toBe(1);
  });
});
