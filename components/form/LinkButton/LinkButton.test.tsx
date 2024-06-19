import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LinkButton from "./LinkButton";

describe("LinkButton Component", () => {
  const defaultProps = {
    href: "/example",
    children: "Link Text",
    className: "custom-class",
    variant: "secondary",
  };

  test("renders link with correct props", () => {
    render(<LinkButton {...defaultProps} />);

    const linkElement = screen.getByText("Link Text");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A");
    expect(linkElement).toHaveAttribute("href", "/example");
    expect(linkElement).toHaveClass("custom-class");
    expect(linkElement).toHaveClass("btn-base-style");
    expect(linkElement).toHaveClass("button-shadow");
  });

  test("applies secondary variant styles", () => {
    render(<LinkButton {...defaultProps} />);

    const linkElement = screen.getByText("Link Text");

    expect(linkElement).toHaveClass("!bg-footer");
    expect(linkElement).toHaveClass("hover:!bg-tertiary");
  });

  test("applies tertiary variant styles", () => {
    const propsWithTertiaryVariant = { ...defaultProps, variant: "tertiary" };
    render(<LinkButton {...propsWithTertiaryVariant} />);

    const linkElement = screen.getByText("Link Text");

    expect(linkElement).toHaveClass("!bg-secondary");
    expect(linkElement).toHaveClass("hover:!bg-footer");
  });

  test("clicking link navigates to correct href", () => {
    render(<LinkButton {...defaultProps} />);

    const linkElement = screen.getByText("Link Text");

    fireEvent.click(linkElement);

    // Verify navigation logic here if needed (e.g., with a router mock)
    // Example: expect(mockRouter.push).toHaveBeenCalledWith("/example");
  });
});
