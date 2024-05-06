"use client";

import { Switch } from "@headlessui/react";

import { Base } from "@/components/text";

type Props = {
  name: string;
  enabled: boolean;
  setEnabled: (name: string, enabled: boolean) => void;
  label: string;
  className?: string;
};

export default (props: Props) => {

  return (
    <div className="w-48 flex items-center justify-between my-1">
      <Base className="mr-2">{props.label}</Base>
      <Switch
        checked={props.enabled}
        onChange={() => props.setEnabled(props.name, !props.enabled)}
        className={`
          ${props.enabled ? "bg-primary" : "bg-secondary"}
          relative inline-flex h-[21px] w-[43px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75
        `}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`
            ${props.enabled ? "translate-x-5 bg-secondary" : "translate-x-0.5 bg-primary"}
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full shadow-lg ring-0 transition duration-150 ease-in-out
          `}
        />
      </Switch>
    </div>
  );
}
