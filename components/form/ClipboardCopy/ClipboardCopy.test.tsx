import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ClipboardCopy from "./ClipboardCopy";

// Mock the Icon component
jest.mock("@/components/ui/Icon", () => ({ name }: { name: string }) => (
  <svg data-testid="icon">
    <title>{name}</title>
  </svg>
));

// Mock the Base component
jest.mock("@/components/text", () => ({
  Base: ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode;
  }) => <div className={className}>{children}</div>,
}));

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("ClipboardCopy Component", () => {
  const defaultProps = {
    text: "Copy me",
    copiedText: "Copied!",
    toCopy: "Text to copy",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the initial text correctly", () => {
    render(<ClipboardCopy {...defaultProps} />);
    expect(screen.getByText("Copy me")).toBeInTheDocument();
  });

  test("renders the icon correctly", () => {
    render(<ClipboardCopy {...defaultProps} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTitle("DocumentDuplicateIcon")).toBeInTheDocument();
  });

  test("calls the clipboard API when clicked", async () => {
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    render(<ClipboardCopy {...defaultProps} />);
    await act(async () => {
      fireEvent.click(screen.getByText("Copy me"));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Text to copy");
  });

  test("displays the copied text after copying", async () => {
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValueOnce(
      undefined,
    );

    render(<ClipboardCopy {...defaultProps} />);
    await act(async () => {
      fireEvent.click(screen.getByText("Copy me"));
    });

    // Wait for the state update
    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });
  });

  test("handles clipboard write failure gracefully", async () => {
    const originalAlert = window.alert;
    window.alert = jest.fn();

    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(
      new Error("Copy failed!"),
    );

    render(<ClipboardCopy {...defaultProps} />);
    await act(async () => {
      fireEvent.click(screen.getByText("Copy me"));
    });

    // Wait for the promise rejection
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Copy failed! Error: Copy failed!",
      );
    });

    window.alert = originalAlert;
  });
});
