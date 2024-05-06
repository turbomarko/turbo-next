import SVG from 'react-inlinesvg';

import { Base, Note } from "@/components/text";

type Props = {
  label: string;
  value: boolean;
  onClick: () => void;
  disabled?: boolean;
  inDropdown?: boolean;
  className?: string;
};

export default (props: Props) => {
  const textClass = `ml-2 cursor-pointer ${props.disabled ? "opacity-50" : ""} ${props.className || ""}`;
  return (
    <label
      className={`flex items-start cursor-pointer ${props.inDropdown ? "mx-1 my-1" : ""}`}
      onClick={props.onClick}
    >
      <SVG src={`/checkbox-${props.value ? "on" : "off"}.svg`} className="h-4 mt-0.5" />
      {props.inDropdown ? (
        <Note className={textClass}>{props.label}</Note>
      ) : (
        <Base className={textClass}>{props.label}</Base>
      )}
    </label>
  );
};
