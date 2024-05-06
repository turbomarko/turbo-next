interface Props {
  value: string;
  updateValue: (value: number) => void;
  minValue: string;
  maxValue: string;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
}

export default (props: Props) => {
  return (
    <input
      type="range"
      min={props.minValue}
      max={props.maxValue}
      onChange={(e) => props.updateValue(parseInt(e.target.value))}
      style={{
        backgroundSize: `${((parseInt(props.value) - parseInt(props.minValue)) * 100) / (parseInt(props.maxValue) - parseInt(props.minValue))}% 100%`,
      }}
      value={props.value}
      disabled={props.disabled}
      className={`
        w-5/6 bg-secondary border-2 border-secondary appearance-none h-2.5 rounded-full cursor-pointer [&::-webkit-slider-thumb]:opacity-0  bg-gradient-to-r from-primary to-primary bg-no-repeat
        ${props.hidden ? "opacity-50" : ""}
        ${props.disabled ? "cursor-default" : ""}
        ${props.className || ""}
      `}
    />
  );
};
