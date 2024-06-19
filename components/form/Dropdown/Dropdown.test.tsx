import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "./Dropdown";

// Mock the Icon component
jest.mock(
  "@/components/ui/Icon",
  () =>
    ({ name, className }: { name: string; className: string }) => (
      <svg data-testid="icon" className={className}>
        <title>{name}</title>
      </svg>
    ),
);

describe("Dropdown Component", () => {
  const defaultProps = {
    name: "test-dropdown",
    value: "option1",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    onChange: jest.fn(),
    isSearchable: true,
    textColor: "#000",
    width: "100%",
    placeholder: "Select an option",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the dropdown with initial value", () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("renders the placeholder when no value is selected", () => {
    const propsWithoutValue = { ...defaultProps, value: "" };
    render(<Dropdown {...propsWithoutValue} />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  test("calls onChange when an option is selected", async () => {
    render(<Dropdown {...defaultProps} />);

    // Open the dropdown
    fireEvent.mouseDown(screen.getByRole("combobox"));

    // Select an option
    fireEvent.click(screen.getByText("Option 2"));

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      "test-dropdown",
      "option2",
    );
  });

  test("renders the custom dropdown indicator", () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByTitle("ChevronDownIcon")).toBeInTheDocument();

    // Open the dropdown
    fireEvent.mouseDown(screen.getByRole("combobox"));

    expect(screen.getByTitle("ChevronUpIcon")).toBeInTheDocument();
  });

  test("renders searchable input", async () => {
    render(<Dropdown {...defaultProps} />);

    // Open the dropdown
    fireEvent.mouseDown(screen.getByRole("combobox"));

    // Find the input element rendered by react-select
    const input = await screen.findByRole("combobox", { hidden: true });

    // Ensure the input is in the document
    expect(input).not.toBeNull();

    // Type in the input
    fireEvent.change(input, { target: { value: "Option 2" } });

    await waitFor(() => {
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  test("applies custom styles", () => {
    render(<Dropdown {...defaultProps} />);

    // Find the react-select container by its role
    const container = screen.getByRole("combobox");

    // Assert the width style
    expect(container).toHaveStyle(`width: ${defaultProps.width}`);
  });
});
