import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

type OutlineIconName = keyof typeof OutlineIcons;
type SolidIconName = keyof typeof SolidIcons;

export type IconName = OutlineIconName | SolidIconName;

interface Props {
  name: IconName;
  solid?: boolean;
  className?: string;
}

export default (props: Props) => {
  const DynamicIcon = props.solid ? SolidIcons[props.name] : OutlineIcons[props.name];

  return (
    <DynamicIcon
      className={`
        flex-shrink-0 h-5 w-5
        ${props.className}
      `}
      aria-hidden="true"
    />
  );
};
