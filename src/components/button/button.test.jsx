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
    expect(screen.getByText(child)).toBeTruthy();
  });

  it("disabled contains property", () => {
    const prop = jest.fn();
    render(<Button disabled={prop} />);
    expect(prop).toBeTruthy();
  });

  //   it("type property", () => {});

  it("className contains property", () => {
    const prop = jest.fn();
    render(<Button className={prop} />);
    expect(prop).toBeTruthy();
  });
});

describe("Property not null", () => {
  it("should be have property", () => {
    const attr = {
      children: "JS is best",
      className: "Example",
      type: "button",
      onClick: () => {},
      disabled: true,
    };
    expect(attr).toHaveProperty("type", "button");
  });

  it("children not null", () => {
    const child = "Word";
    render(<Button>{child}</Button>);
    expect(screen.getByText(child)).not.toBeNull();
  });

  it("className not null", () => {
    const prop = jest.fn();
    render(<Button className={prop} />);
    expect(prop).not.toBeNull();
  });

  it("type not null", () => {
    const prop = jest.fn();
    render(<Button type={prop} />);
    expect(prop).not.toBeNull();
  });

  it("onClick not null", () => {
    const prop = jest.fn();
    render(<Button onClick={prop} />);
    expect(prop).not.toBeNull();
  });

  it("disabled not null", () => {
    const prop = jest.fn();
    render(<Button disabled={prop} />);
    expect(prop).not.toBeNull();
  });
});
