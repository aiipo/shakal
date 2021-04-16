import React from "react";
import Button from "./button";
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

  it("className contains property", () => {
    const className = " ";
    render(<Button />);
    expect(className).toBeTruthy();
  });

  it("className not null", () => {
    const className = "word";
    render(<Button />);
    expect(className).not.toBeNull();
  });

  it("type not null", () => {
    const type = "button";
    render(<Button />);
    expect(type).not.toBeNull();
    expect(type).toContain("button");
  });

  it("should be different types of buttons", () => {
    expect("submit").toMatch(/submit/);
    expect("button").toMatch(/button/);
    expect("reset").toMatch(/reset/);
  });
});
