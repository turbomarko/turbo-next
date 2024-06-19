import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FloatingNav from "./FloatingNav";
import { PageRoute } from "@/types";

const routes: PageRoute[] = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

describe("FloatingNav Component", () => {
  const defaultProps = {
    routes,
    activeRoute: "/home",
  };

  test("renders the correct number of links", () => {
    render(<FloatingNav {...defaultProps} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(routes.length);
  });

  test("applies active class to the link that matches activeRoute", () => {
    render(<FloatingNav {...defaultProps} />);
    const activeLink = screen.getByText("Home").closest("a");
    expect(activeLink).toHaveClass("!pt-4 sm:!pt-6 z-20");
  });

  test("applies the correct class when isStacked prop is true", () => {
    render(<FloatingNav {...defaultProps} isStacked />);
    const container = screen.getByRole("navigation");
    expect(container).toHaveClass("justify-start");
  });

  test("applies the correct class when isStacked prop is false", () => {
    render(<FloatingNav {...defaultProps} isStacked={false} />);
    const container = screen.getByRole("navigation");
    expect(container).toHaveClass("justify-center");
  });

  test("applies the correct classes to inactive links", () => {
    render(<FloatingNav {...defaultProps} />);
    const inactiveLinks = screen
      .getAllByRole("link")
      .filter((link) => link.textContent !== "Home");
    inactiveLinks.forEach((link) => {
      expect(link).toHaveClass("opacity-50 z-10");
    });
  });
});
