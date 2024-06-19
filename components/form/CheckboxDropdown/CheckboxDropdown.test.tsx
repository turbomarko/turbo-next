import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckboxDropdown from "./CheckboxDropdown";
import { MultipleDropdownOption } from "@/types";

// Mock the Icon component
jest.mock(
  "@/components/ui/Icon",
  () =>
    ({ name, className }: { name: string; className: string }) => (
      <svg className={className} data-testid="icon">
        <title>{name}</title>
      </svg>
    ),
);

// Mock the Checkbox component
jest.mock(
  "../Checkbox",
  () =>
    ({
      label,
      value,
      onClick,
      inDropdown,
    }: {
      label: string;
      value: boolean;
      onClick: () => void;
      inDropdown: boolean;
    }) => (
      <div
        data-testid="checkbox"
        onClick={onClick}
        className={inDropdown ? "in-dropdown" : ""}
      >
        <input type="checkbox" checked={value} readOnly />
        <label>{label}</label>
      </div>
    ),
);

describe("CheckboxDropdown Component", () => {
  const mockUpdateForm = jest.fn();
  const defaultProps = {
    title: "Test Title",
    field: "testField",
    options: [
      { id: 1, description: "Option 1" },
      { id: 2, description: "Option 2" },
    ] as MultipleDropdownOption[],
    selections: [1],
    updateForm: mockUpdateForm,
  };

  beforeEach(() => {
    mockUpdateForm.mockClear();
  });

  test("renders the title correctly", () => {
    render(<CheckboxDropdown {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("renders the correct number of options", () => {
    render(<CheckboxDropdown {...defaultProps} />);
    fireEvent.click(screen.getByRole("button")); // Open the dropdown menu
    expect(screen.getAllByTestId("checkbox")).toHaveLength(2);
  });

  test("renders the icon with the correct rotation when menu is open", () => {
    render(<CheckboxDropdown {...defaultProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("icon")).toHaveClass("rotate-90");
  });

  test("renders the icon with the correct rotation when menu is closed", () => {
    render(<CheckboxDropdown {...defaultProps} />);
    expect(screen.getByTestId("icon")).toHaveClass("-rotate-90");
  });

  test("calls updateForm with the correct arguments when an option is clicked", () => {
    render(<CheckboxDropdown {...defaultProps} />);
    fireEvent.click(screen.getByRole("button")); // Open the dropdown menu
    fireEvent.click(screen.getAllByTestId("checkbox")[1]);
    expect(mockUpdateForm).toHaveBeenCalledWith("testField", [1, 2]);
  });

  test("removes an option from selections when clicked if it is already selected", () => {
    render(<CheckboxDropdown {...defaultProps} selections={[1, 2]} />);
    fireEvent.click(screen.getByRole("button")); // Open the dropdown menu
    fireEvent.click(screen.getAllByTestId("checkbox")[1]);
    expect(mockUpdateForm).toHaveBeenCalledWith("testField", [1]);
  });

  test("adds an option to selections when clicked if it is not selected", () => {
    render(<CheckboxDropdown {...defaultProps} selections={[1]} />);
    fireEvent.click(screen.getByRole("button")); // Open the dropdown menu
    fireEvent.click(screen.getAllByTestId("checkbox")[1]);
    expect(mockUpdateForm).toHaveBeenCalledWith("testField", [1, 2]);
  });

  test("applies the correct class to the Checkbox component when inDropdown is true", () => {
    render(<CheckboxDropdown {...defaultProps} />);
    fireEvent.click(screen.getByRole("button")); // Open the dropdown menu
    expect(screen.getAllByTestId("checkbox")[0]).toHaveClass("in-dropdown");
  });
});
