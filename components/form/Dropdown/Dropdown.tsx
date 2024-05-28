"use client";

import Select, { components, CSSObjectWithLabel } from "react-select";

import Icon from "@/components/ui/Icon";

type Option = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  value: string;
  options: Option[];
  onChange: (name: string, choice: string) => void;
  isSearchable?: boolean;
  defaultValue?: string;
  textColor?: string;
  width?: string;
  placeholder?: string;
};

const defaultTextColor = "#9B645B";
const backgroundColor = "#E7DFD6";
const hoverColor = "#CBAE9E";

export const dropdownStyles = (textColor = defaultTextColor, width = "100%") => {
  return {
    input: (base: CSSObjectWithLabel) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0,
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      color: textColor,
    }),
    multiValue: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: defaultTextColor,
      borderRadius: 8,
    }),
    multiValueLabel: (base: CSSObjectWithLabel) => ({
      ...base,
      color: backgroundColor,
      paddingTop: 2,
      paddingBottom: 3,
    }),
    multiValueRemove: (base: CSSObjectWithLabel) => ({
      ...base,
      color: backgroundColor,
      borderRadius: 8,
      "&:hover": {
        // Overwrittes the different states of border
        color: defaultTextColor,
        backgroundColor: hoverColor,
      }
    }),
    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0,
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      color: textColor,
    }),
    dropdownIndicator: (base: CSSObjectWithLabel) => ({
      ...base,
      color: textColor,
      marginRight: 0,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (base: CSSObjectWithLabel, state: any) => ({
      ...base,
      width: "100%",
      background: backgroundColor,
      bavkgroundOpacity: 0,
      minHeight: 20,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: 8,
      borderWidth: 0,
      color: textColor,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "red" : "blue"
      }
    }),
    indicatorSeparator: () => ({ display: "none" }),
    indicatorsContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      height: 33,
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      marginTop: 2,
      background: backgroundColor,
      borderRadius: 8,
      overflow: "hidden"
    }),
    menuPortal: (base: CSSObjectWithLabel) => ({
      ...base,
      zIndex: 9999,
    }),
    menuList: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: 0,
    }),
    option: (base: CSSObjectWithLabel) => ({
      ...base,
      background: backgroundColor,
      "&:hover": {
        background: "#4F141E",
        color: "#E7DFD6"
      },
      color: textColor,
    }),
    container: (base: CSSObjectWithLabel) => ({
      ...base,
      width: width,
    }),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Icon name={props.selectProps.menuIsOpen ? "ChevronUpIcon" : "ChevronDownIcon"} className="text-secondary" />
      </components.DropdownIndicator>
    )
  );
};

export default (props: Props) => {
  return (
    <Select
      components={{ DropdownIndicator }}
      options={props.options}
      value={props.options.find((choice) => choice.value === props.value)}
      onChange={(choice) => props.onChange(props.name, choice!.value)}
      isSearchable={props.isSearchable}
      styles={dropdownStyles(props.textColor, props.width)}
      defaultValue={props.options.find((choice) => choice.value === props.value)}
      placeholder={props.placeholder}
      menuPortalTarget={document.body}
    />
  );
};
