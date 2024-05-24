import localFont from "next/font/local";

import { Error } from "@/components/text";

export interface Props {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  type?: string;
  divClassName?: string;
  inputClassName?: string;
  fieldErrors?: string[];
  disabled?: boolean;
  textArea?: boolean;
  isBold?: boolean;
  maxLength?: number;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal";
}

const helveticaBold = localFont({ src: "../../text/fonts/HelveticaNeueBold.otf", variable: "--font-helveticaBold" });

export default (props: Props) => {
  const divClassName = `w-full my-1 ${props.divClassName}`;
  const inputClassName = `
    flex flex-col rounded-lg py-1 px-2 text-secondary placeholder-opacity-50 placeholder-secondary bg-card min-w-60 w-full focus:outline-none
    ${props.fieldErrors?.length ? "!bg-red-600 !text-white !placeholder-white" : ""}
    ${props.isBold ? helveticaBold.className : ""}
    ${props.inputClassName}
  `;
  if (props.textArea) {
    return (
      <div className={divClassName}>
        <textarea
          className={`${inputClassName} resize-none h-40`}
          id={props.name}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={!!props.disabled}
          rows={5}
          maxLength={props.maxLength || 255}
        />
        <Error>{props.fieldErrors?.join(" ") || ""}</Error>
      </div>
    );
  }
  return (
    <div className={divClassName}>
      <input
        className={inputClassName}
        id={props.name}
        type={props.type || "text"}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        disabled={!!props.disabled}
        maxLength={props.maxLength || 255}
        onKeyPress={props.onKeyPress}
        inputMode={props.inputMode}
      />
      <Error>{props.fieldErrors?.join(" ") || ""}</Error>
    </div>
  );
};
