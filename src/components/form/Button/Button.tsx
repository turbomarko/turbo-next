"use client";

import LoadingIndicator from "@/components/ui/LoadingIndicator";

import "./styles.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  selected?: boolean;
  shadow?: boolean;
  variant?: "secondary" | "tertiary";
}

export default (props: Props) => {
  if (props.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <button
      className={`
        btn-base-style
        ${props.variant === "secondary" ? "!bg-footer hover:!bg-tertiary" : ""}
        ${props.variant === "tertiary" ? "!bg-secondary hover:!bg-footer" : ""}
        ${props.shadow ? "button-shadow" : ""}
        ${props.className || ""}
      `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
