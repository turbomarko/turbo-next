import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon from "./Icon";
import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

describe("Icon Component", () => {
  test("renders an outline icon by default", () => {
    const iconName = "AcademicCapIcon" as keyof typeof OutlineIcons;
    const { container } = render(<Icon name={iconName} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveClass("h-5 w-5 flex-shrink-0");
  });

  test("renders a solid icon when solid prop is true", () => {
    const iconName = "AcademicCapIcon" as keyof typeof SolidIcons;
    const { container } = render(<Icon name={iconName} solid />);

    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveClass("h-5 w-5 flex-shrink-0");
  });

  test("applies additional class names", () => {
    const iconName = "AcademicCapIcon" as keyof typeof OutlineIcons;
    const additionalClass = "text-red-500";
    const { container } = render(
      <Icon name={iconName} className={additionalClass} />,
    );

    expect(container.querySelector("svg")).toHaveClass("text-red-500");
  });
});
