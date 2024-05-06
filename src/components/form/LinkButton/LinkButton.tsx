import Link from "next/link";

import "../Button/styles.css";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "secondary" | "tertiary";
}

export default (props: Props) => {
  return (
    <Link
      href={props.href}
      className={`
        btn-base-style button-shadow
        ${props.variant === "secondary" ? "!bg-footer hover:!bg-tertiary" : ""}
        ${props.variant === "tertiary" ? "!bg-secondary hover:!bg-footer" : ""}
        ${props.className || ""}
      `}
    >
      {props.children}
    </Link>
  );
};
