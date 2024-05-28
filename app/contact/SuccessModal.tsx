"use client";

import { H1, H3 } from "@/components/text";
import { Modal } from "@/components/ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} close={props.onClose} className="text-center">
      <H1 className="text-primary">We have received your message</H1>
      <H3 className="text-secondary">We will get back to you ASAP.</H3>
    </Modal>
  );
};
