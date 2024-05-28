"use client";

import { useState } from "react";

import Icon from "../Icon";
import Modal from "../Modal";

interface Props {
  children: React.ReactElement;
  className?: string;
  modalClassName?: string;
}

export default (props: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(true)}>
      <Icon
        name="QuestionMarkCircleIcon"
        className={`!h-6 !w-6 !text-tertiary cursor-pointer ${props.className || ""}`}
      />
      <Modal
        isOpen={isOpen}
        close={() => setOpen(false)}
        closable
        className={`
          w-full !max-w-xl !pt-8 flex flex-col
          ${props.modalClassName || ""}
        `}
      >
        {props.children}
      </Modal>
    </div>
  );
};
