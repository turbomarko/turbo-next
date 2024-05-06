"use client";

import React, { useState } from "react";

import { Base } from "@/components/text";
import Icon from "@/components/ui/Icon";

type Props = {
  text: string;
  copiedText: string;
  toCopy: string;
}

export default (props: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    if (navigator && navigator.clipboard) navigator.clipboard.writeText(text)
      .then(() => { setIsCopied(true) })
      .catch((error) => { alert(`Copy failed! ${error}`) });
  }

  return (
    <div
      onClick={() => copyToClipboard(props.toCopy)}
      className="w-44 sm:w-60 flex justify-between px-4 py-2 rounded-full bg-white items-center text-primary cursor-pointer"
    >
      <Base className="overflow-x-auto whitespace-nowrap cursor-pointer">{isCopied ? props.copiedText : props.text}</Base>
      <Icon name="DocumentDuplicateIcon" />
    </div>
  );
}
