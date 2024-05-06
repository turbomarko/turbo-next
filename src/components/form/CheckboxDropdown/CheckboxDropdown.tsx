"use client";

import { Menu } from "@headlessui/react";

import { Interest } from "@/types";

import Icon from "@/components/ui/Icon";

import Checkbox from "../Checkbox";

type Props = {
  title: string;
  field: string;
  options: Interest[];
  selections: number[];
  updateForm: (field: string, value: any) => void;
};

export default (props: Props) => {

  const setSelections = (option: Interest) => {
    if (props.selections.includes(option.id)) {
      props.updateForm(props.field, props.selections.filter((value) => value !== option.id));
    } else {
      props.updateForm(props.field, [...props.selections, option.id]);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full mb-3 text-secondary">
      <div>
        <Menu.Button
          className="flex items-center w-full justify-between rounded-full bg-card pr-3 pl-3.5 py-1"
        >
          {({ open }) => (
            <>
              {props.title}
              <Icon
                className={`text-secondary ${open ? "rotate-90" : "-rotate-90"}`}
                name="ChevronLeftIcon"
              />
            </>
          )}
        </Menu.Button>
      </div>
      <Menu.Items className="absolute max-h-60 overflow-y-scroll right-0 z-10 mt-0.5 w-full origin-top-right rounded-lg bg-card shadow-lg">
        <div className="py-1">
          {props.options.map(option => (
            <Checkbox
              key={option.description}
              label={option.description}
              value={props.selections.includes(option.id)}
              onClick={() => {setSelections(option)}}
              inDropdown
            />
          ))}
        </div>
      </Menu.Items>
    </Menu>
  )
}
