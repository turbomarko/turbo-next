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
      <Dialog as="div" className="relative z-100" onClose={props.forbidTransform ? () => {} : props.close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity z-30" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            { props.forbidTransform ? (
              <Dialog.Panel className={`relative w-full h-full overflow-hidden rounded-xl bg-background text-left shadow-xl transition-all sm:my-8 lg:max-w-full p-5 ${props.className}`}>
                {props.children}
                {props.closable && (
                  <div
                    onClick={props.close}
                    className="absolute top-4 right-4 cursor-pointer text-secondary"
                  >
                    <Icon name="XMarkIcon"/>
                  </div>
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
              <Dialog.Panel className={`relative overflow-hidden rounded-xl bg-background text-left shadow-xl transition-all sm:my-8 lg:max-w-full p-2 sm:p-5 ${props.className}`}>
                {props.children}
                {props.closable && (
                  <div
                    onClick={props.close}
                    className="absolute top-4 right-4 cursor-pointer text-secondary"
                  >
                    <Icon name="XMarkIcon"/>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
            )}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
