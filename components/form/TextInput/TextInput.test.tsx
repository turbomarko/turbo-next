import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput, { Props } from "./TextInput";

describe("TextInput Component", () => {
  const defaultProps: Props = {
    name: "testInput",
    value: "",
    onChange: jest.fn(),
    placeholder: "Enter text...",
    fieldErrors: [],
  };

  test("renders input with correct attributes", () => {
    render(<TextInput {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder!);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", defaultProps.name);
    expect(inputElement).toHaveValue(defaultProps.value);
    expect(inputElement).toHaveAttribute("type", "text");
  });

  test("renders textarea when textArea prop is true", () => {
    render(<TextInput {...defaultProps} textArea />);

    const textareaElement = screen.getByPlaceholderText(
      defaultProps.placeholder!,
    );

    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).toHaveAttribute("name", defaultProps.name);
    expect(textareaElement).toHaveValue(defaultProps.value);
  });

  test("calls onChange function on input change", () => {
    render(<TextInput {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder!);

    fireEvent.change(inputElement, { target: { value: "New Value" } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  test("renders field errors", () => {
    const errorProps = {
      ...defaultProps,
      fieldErrors: ["Error 1", "Error 2"],
    };

    render(<TextInput {...errorProps} />);

    const errorElement = screen.getByText("Error 1 Error 2");

    expect(errorElement).toBeInTheDocument();
  });

  test("applies custom class names", () => {
    const customProps = {
      ...defaultProps,
      divClassName: "custom-div-class",
      inputClassName: "custom-input-class",
    };

    render(<TextInput {...customProps} />);

    const divElement = screen.getByPlaceholderText(
      defaultProps.placeholder!,
    ).parentElement;

    expect(divElement).toHaveClass("custom-div-class");
    expect(divElement?.firstChild).toHaveClass("custom-input-class");
  });

  test("disables the input when disabled prop is true", () => {
    render(<TextInput {...defaultProps} disabled />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder!);

    expect(inputElement).toBeDisabled();
  });

  test("applies maxLength attribute correctly", () => {
    render(<TextInput {...defaultProps} maxLength={100} />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder!);

    expect(inputElement).toHaveAttribute("maxLength", "100");
  });

  test("handles inputMode attribute correctly", () => {
    render(<TextInput {...defaultProps} inputMode="numeric" />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder!);

    expect(inputElement).toHaveAttribute("inputMode", "numeric");
  });
});
