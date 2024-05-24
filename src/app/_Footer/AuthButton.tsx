"use client";

import { Note } from "@/components/text";
import { openAuthModal } from "@/redux/ui";
import { useAppDispatch } from "@/redux/hooks";

type Props = {
  name: string;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openAuthModal("/welcome"));
  };

  return (
    <div onClick={handleClick} className="mb-2 hover:opacity-50">
      <Note className="cursor-pointer">
        {props.name}
      </Note>
    </div>
  );
};
