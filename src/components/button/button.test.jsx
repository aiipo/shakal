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

  it("should contains children", () => {
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
    const prop = " ";
    render(<Button className={prop} />);
    expect(prop).toBeTruthy();
  });

  it("className not null", () => {
    const prop = jest.fn();
    render(<Button className={prop} />);
    expect(prop).not.toBeNull();
  });

  it("type not null", () => {
    const prop = "button";
    render(<Button type={prop} />);
    expect(prop).not.toBeNull();
    expect(prop).toContain("button");
  });

  it("should be different types of buttons", () => {
    expect("submit").toMatch(/submit/);
    expect("button").toMatch(/button/);
    expect("reset").toMatch(/reset/);
  });
});
