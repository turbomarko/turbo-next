import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Info from "./Info";

jest.mock("../Icon", () => ({
  __esModule: true,
  default: ({ name, className }: { name: string; className?: string }) => (
    <svg className={`icon ${className}`} data-icon-name={name} />
  ),
}));

jest.mock("../Modal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    close,
    children,
    className,
  }: {
    isOpen: boolean;
    close: () => void;
    children: React.ReactNode;
    className?: string;
  }) => {
    return isOpen ? (
      <div className={`modal ${className}`}>
        <button onClick={close}>Close</button>
        {children}
      </div>
    ) : null;
  },
}));

describe("Info Component", () => {
  test("renders the Icon component correctly", () => {
    const { container } = render(
      <Info>
        <p>Info content</p>
      </Info>,
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-icon-name", "QuestionMarkCircleIcon");
    expect(icon).toHaveClass("!h-6 !w-6 !text-tertiary cursor-pointer");
  });

  test("opens the Modal when Icon is clicked", () => {
    const { container, getByText } = render(
      <Info>
        <p>Info content</p>
      </Info>,
    );

    const icon = container.querySelector("svg");
    if (icon) {
      fireEvent.click(icon);
    }

    expect(getByText("Info content")).toBeInTheDocument();
  });

  test("applies custom class names to Icon and Modal", () => {
    const { container, getByText } = render(
      <Info className="custom-icon-class" modalClassName="custom-modal-class">
        <p>Info content</p>
      </Info>,
    );

    const icon = container.querySelector("svg");
    expect(icon).toHaveClass("custom-icon-class");

    if (icon) {
      fireEvent.click(icon);
    }

    const modal = getByText("Info content").parentElement;
    expect(modal).toHaveClass("custom-modal-class");
  });
});
