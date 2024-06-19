import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Component from "./Button";

// Mock the LoadingIndicator component
jest.mock("@/components/ui/LoadingIndicator", () => () => (
  <div data-testid="loading-indicator">Loading...</div>
));

describe("Component", () => {
  test("renders LoadingIndicator when isLoading is true", () => {
    render(<Component isLoading={true} />);
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  test("renders button when isLoading is false", () => {
    render(<Component isLoading={false}>Click Me</Component>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("applies secondary variant classes correctly", () => {
    render(<Component variant="secondary">Click Me</Component>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("!bg-footer");
    expect(button).toHaveClass("hover:!bg-tertiary");
  });

  test("applies tertiary variant classes correctly", () => {
    render(<Component variant="tertiary">Click Me</Component>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("!bg-secondary");
    expect(button).toHaveClass("hover:!bg-footer");
  });

  test("applies button-shadow class when shadow is true", () => {
    render(<Component shadow={true}>Click Me</Component>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button-shadow");
  });

  test("applies additional class names from className prop", () => {
    render(<Component className="extra-class">Click Me</Component>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("extra-class");
  });

  test("calls onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Component onClick={handleClick}>Click Me</Component>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders children inside the button", () => {
    render(<Component>Click Me</Component>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Click Me");
  });
});
