"use client";

import { Fragment, ReactElement } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Icon from "../Icon";

interface Props {
  isOpen: boolean;
  close: () => void;
  children: ReactElement | ReactElement[];
  forbidTransform?: boolean;
  closable?: boolean;
  className?: string;
}

export default (props: Props) => {
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="z-100 relative"
        onClose={props.forbidTransform ? () => {} : props.close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-30 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            {props.forbidTransform ? (
              <Dialog.Panel
                className={`relative h-full w-full overflow-hidden rounded-xl bg-background p-5 text-left shadow-xl transition-all sm:my-8 lg:max-w-full ${props.className}`}
              >
                {props.children}
                {props.closable && (
                  <button
                    onClick={props.close}
                    className="absolute right-4 top-4 cursor-pointer text-secondary"
                    aria-label="Close"
                    tabIndex={0}
                  >
                    <Icon name="XMarkIcon" />
                  </button>
                )}
              </Dialog.Panel>
            ) : (
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`relative overflow-hidden rounded-xl bg-background p-2 text-left shadow-xl transition-all sm:my-8 sm:p-5 lg:max-w-full ${props.className}`}
                >
                  {props.children}
                  {props.closable && (
                    <button
                      onClick={props.close}
                      className="absolute right-4 top-4 cursor-pointer text-secondary"
                      aria-label="Close"
                      tabIndex={0}
                    >
                      <Icon name="XMarkIcon" />
                    </button>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            )}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
