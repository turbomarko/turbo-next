"use client";

import { Icon } from "@/components/ui";
import { toggleMenu } from "@/redux/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default () => {
  const dispatch = useAppDispatch();
  const { isMenuOpen } = useAppSelector((state) => state.ui);
  const handleClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <div
      className="cursor-pointer px-2 lg:hidden"
      onClick={handleClick}
    >
      <Icon name={isMenuOpen ? "XMarkIcon" : "Bars3Icon"} className="!h-10 !w-10 text-primary" />
    </div>
  );
};
