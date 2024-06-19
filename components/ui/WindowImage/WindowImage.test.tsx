import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import WindowImage from "./WindowImage";

describe("WindowImage Component", () => {
  test("renders image with correct URL and optional children", () => {
    const imageUrl = "https://example.com/image.jpg";
    const { container, queryByText } = render(
      <WindowImage
        image={imageUrl}
        className="window-image-clip custom-class relative z-10 flex h-[346px] w-[352px] flex-col items-center overflow-hidden bg-cover bg-center"
      >
        <p>Optional children content</p>
      </WindowImage>,
    );

    const imageContainer = container.querySelector(".window-image-clip");
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveStyle(`background-image: url(${imageUrl})`);
    expect(imageContainer).toHaveClass("custom-class");

    const optionalChild = queryByText("Optional children content");
    expect(optionalChild).toBeInTheDocument();
  });
});
