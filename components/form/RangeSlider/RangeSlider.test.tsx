import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RangeSlider from "./RangeSlider";

describe("RangeSlider Component", () => {
  const defaultProps = {
    value: "50",
    updateValue: jest.fn(),
    minValue: "0",
    maxValue: "100",
  };

  test("renders with correct attributes", () => {
    render(<RangeSlider {...defaultProps} />);

    const rangeInput = screen.getByRole("slider");

    // Verify the range input attributes
    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveAttribute("type", "range");
    expect(rangeInput).toHaveAttribute("min", defaultProps.minValue);
    expect(rangeInput).toHaveAttribute("max", defaultProps.maxValue);
    expect(rangeInput).toHaveAttribute("value", defaultProps.value);
    expect(rangeInput).not.toBeDisabled();
  });

  test("updates value on change", () => {
    render(<RangeSlider {...defaultProps} />);

    const rangeInput = screen.getByRole("slider");

    // Simulate change event on the range input
    fireEvent.change(rangeInput, { target: { value: "75" } });

    // Expect updateValue function to be called with the new value
    expect(defaultProps.updateValue).toHaveBeenCalledTimes(1);
    expect(defaultProps.updateValue).toHaveBeenCalledWith(75);
  });

  test("disables input when disabled prop is true", () => {
    const propsWithDisabled = { ...defaultProps, disabled: true };
    render(<RangeSlider {...propsWithDisabled} />);

    const rangeInput = screen.getByRole("slider");

    expect(rangeInput).toBeDisabled();
  });

  test("applies hidden styles when hidden prop is true", () => {
    const propsWithHidden = { ...defaultProps, hidden: true };
    render(<RangeSlider {...propsWithHidden} />);

    const rangeInput = screen.getByRole("slider");

    expect(rangeInput).toHaveClass("opacity-50");
  });

  // Add more tests for className and other custom styles if needed
});
