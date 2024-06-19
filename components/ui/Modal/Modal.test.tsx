import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

jest.mock("../Icon", () => ({
  __esModule: true,
  default: ({ name, className }: { name: string; className?: string }) => (
    <svg className={`icon ${className}`} data-icon-name={name} />
  ),
}));

describe("Modal Component", () => {
  test("renders children when open", () => {
    const { getByText } = render(
      <Modal isOpen={true} close={jest.fn()}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(getByText("Modal content")).toBeInTheDocument();
  });

  test("does not render children when closed", () => {
    const { queryByText } = render(
      <Modal isOpen={false} close={jest.fn()}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(queryByText("Modal content")).not.toBeInTheDocument();
  });

  test("calls close function when closable and close icon is clicked", () => {
    const closeMock = jest.fn();
    const { getByLabelText } = render(
      <Modal isOpen={true} close={closeMock} closable={true}>
        <p>Modal content</p>
      </Modal>,
    );

    fireEvent.click(getByLabelText("Close"));
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test("does not call close function when closable is false", () => {
    const closeMock = jest.fn();
    const { queryByLabelText } = render(
      <Modal isOpen={true} close={closeMock} closable={false}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(queryByLabelText("Close")).not.toBeInTheDocument();
  });

  test("applies custom class name to modal panel", () => {
    const { getByText } = render(
      <Modal isOpen={true} close={jest.fn()} className="custom-class">
        <p>Modal content</p>
        <button>Focusable Button</button>
      </Modal>,
    );

    const modalPanel = getByText("Modal content").parentElement;
    expect(modalPanel).toHaveClass("custom-class");
    expect(getByText("Focusable Button")).toBeInTheDocument();
  });
});
