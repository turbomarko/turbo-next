import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Radio from "./Radio"; // Update with the correct path to your Radio component

describe("Radio Component", () => {
  const options = [
    { value: "option1", label: "Option 1", note: "" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const defaultProps = {
    name: "test-radio",
    value: "option1",
    options,
    onChange: jest.fn(),
  };

  test("renders radio options correctly", () => {
    render(<Radio {...defaultProps} />);

    // Verify all radio options are rendered
    options.forEach((option) => {
      const radioInput = screen.getByRole("radio", { name: option.label });
      expect(radioInput).toBeInTheDocument();
      expect(radioInput).toHaveAttribute("value", option.value);
    });

    // Verify that the first option is checked by default
    const firstOption = screen.getByRole("radio", { name: "Option 1" });
    expect(firstOption).toBeChecked();
  });

  test("handles onChange event", () => {
    render(<Radio {...defaultProps} />);

    // Simulate change event on the second option
    const secondOption = screen.getByRole("radio", { name: "Option 2" });
    fireEvent.click(secondOption);

    // Expect onChange function to be called with the correct value
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
    expect(defaultProps.onChange.mock.calls[0][0].target.value).toBe("option2");
  });

  test("applies alternative styles when isAlternative prop is true", () => {
    const propsWithAlternative = { ...defaultProps, isAlternative: true };
    render(<Radio {...propsWithAlternative} />);

    // Verify alternative styles are applied to radio inputs
    options.forEach((option) => {
      const radioInput = screen.getByRole("radio", { name: option.label });
      expect(radioInput).toHaveClass("border-primary");
      expect(radioInput).toHaveClass("checked:border-primary");
    });
  });
});
