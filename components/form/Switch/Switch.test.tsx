import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from "./Switch";

describe("Switch Component", () => {
  const defaultProps = {
    name: "testSwitch",
    enabled: true,
    setEnabled: jest.fn(),
    label: "Enable Feature",
  };

  test("renders with correct label and initial state", () => {
    render(<Switch {...defaultProps} />);

    const labelElement = screen.getByText(defaultProps.label);
    const switchElement = screen.getByRole("switch");

    // Verify the label and initial checked state
    expect(labelElement).toBeInTheDocument();
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute("aria-checked", "true");
  });

  test("calls setEnabled function on toggle", () => {
    render(<Switch {...defaultProps} />);

    const switchElement = screen.getByRole("switch");

    // Simulate click event on the switch to toggle state
    fireEvent.click(switchElement);

    // Expect setEnabled function to be called with the updated state
    expect(defaultProps.setEnabled).toHaveBeenCalledTimes(1);
    expect(defaultProps.setEnabled).toHaveBeenCalledWith(
      defaultProps.name,
      false,
    );
  });

  test("applies correct background color to switch based on enabled state", () => {
    const { rerender } = render(<Switch {...defaultProps} />);

    const switchElement = screen.getByRole("switch");

    // Verify initial background color based on enabled state
    expect(switchElement).toHaveClass("bg-primary");

    // Simulate click event to toggle switch
    fireEvent.click(switchElement);

    // Re-render the component with the updated state
    rerender(<Switch {...defaultProps} enabled={false} />);

    // Verify background color changes after toggle
    expect(switchElement).toHaveClass("bg-secondary");
  });

  test("applies correct background color to knob based on enabled state", () => {
    const { rerender } = render(<Switch {...defaultProps} />);

    const knobElement = screen
      .getByRole("switch")
      .querySelector("span[aria-hidden='true']");

    // Verify initial background color based on enabled state
    expect(knobElement).toHaveClass("translate-x-5 bg-secondary");

    // Simulate click event to toggle switch
    fireEvent.click(knobElement);

    // Re-render the component with the updated state
    rerender(<Switch {...defaultProps} enabled={false} />);

    // Verify background color changes after toggle
    expect(knobElement).toHaveClass("translate-x-0.5 bg-primary");
  });
});
