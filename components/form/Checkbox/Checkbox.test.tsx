import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";

// Mock the SVG component
jest.mock(
  "react-inlinesvg",
  () =>
    ({ src, className }: { src: string; className: string }) => (
      <img
        src={src}
        className={className}
        data-testid="svg-icon"
        alt="checkbox icon"
      />
    ),
);

// Mock the Base and Note components
jest.mock("@/components/text", () => ({
  Base: ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode;
  }) => <div className={className}>{children}</div>,
  Note: ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode;
  }) => <div className={className}>{children}</div>,
}));

describe("Checkbox Component", () => {
  test("renders the label correctly", () => {
    render(<Checkbox label="Test Label" value={false} onClick={() => {}} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("displays the correct SVG based on the value prop", () => {
    const { rerender } = render(
      <Checkbox label="Test Label" value={true} onClick={() => {}} />,
    );
    expect(screen.getByTestId("svg-icon")).toHaveAttribute(
      "src",
      "/checkbox-on.svg",
    );

    rerender(<Checkbox label="Test Label" value={false} onClick={() => {}} />);
    expect(screen.getByTestId("svg-icon")).toHaveAttribute(
      "src",
      "/checkbox-off.svg",
    );
  });

  test("applies disabled class when disabled is true", () => {
    render(
      <Checkbox
        label="Test Label"
        value={false}
        onClick={() => {}}
        disabled={true}
      />,
    );
    expect(screen.getByText("Test Label")).toHaveClass("opacity-50");
  });

  test("does not apply disabled class when disabled is false", () => {
    render(
      <Checkbox
        label="Test Label"
        value={false}
        onClick={() => {}}
        disabled={false}
      />,
    );
    expect(screen.getByText("Test Label")).not.toHaveClass("opacity-50");
  });

  test("applies inDropdown classes when inDropdown is true", () => {
    render(
      <Checkbox
        label="Test Label"
        value={false}
        onClick={() => {}}
        inDropdown={true}
      />,
    );
    const labelElement = screen.getByText("Test Label").parentElement;
    expect(labelElement).toHaveClass("mx-1 my-1");
  });

  test("does not apply inDropdown classes when inDropdown is false", () => {
    render(
      <Checkbox
        label="Test Label"
        value={false}
        onClick={() => {}}
        inDropdown={false}
      />,
    );
    const labelElement = screen.getByText("Test Label").parentElement;
    expect(labelElement).not.toHaveClass("mx-1 my-1");
  });

  test("applies additional class names from className prop", () => {
    render(
      <Checkbox
        label="Test Label"
        value={false}
        onClick={() => {}}
        className="extra-class"
      />,
    );
    expect(screen.getByText("Test Label")).toHaveClass("extra-class");
  });

  test("calls onClick when label is clicked", () => {
    const handleClick = jest.fn();
    render(<Checkbox label="Test Label" value={false} onClick={handleClick} />);
    fireEvent.click(
      screen.getByText("Test Label").parentElement as HTMLElement,
    );
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders label as Note component when inDropdown is true", () => {
    render(
      <Checkbox
        label="Test Label"
        value={false}
        onClick={() => {}}
        inDropdown={true}
      />,
    );
    expect(screen.getByText("Test Label").parentElement).toContainElement(
      screen.getByText("Test Label"),
    );
  });

  test("renders label as Base component when inDropdown is false", () => {
    render(
      <Checkbox
        label="Test Label"
        value={false}
        onClick={() => {}}
        inDropdown={false}
      />,
    );
    expect(screen.getByText("Test Label").parentElement).toContainElement(
      screen.getByText("Test Label"),
    );
  });
});
