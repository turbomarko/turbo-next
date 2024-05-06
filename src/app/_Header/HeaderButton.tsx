"use client";

import { useRouter } from "next/navigation";

import { Icon, IconName } from "@/components/ui";
import { openAuthModal } from "@/redux/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type Props = {
  destination: string;
  icon: string | IconName;
  authRequired?: boolean;
  isImg?: boolean;
}

export default (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tokenExpirationTime = useAppSelector((state) => state.auth.tokenExpirationTime);

  const handleClick = () => {
    if (props.authRequired && (!tokenExpirationTime || tokenExpirationTime < Date.now().toString())) {
      dispatch(openAuthModal(props.destination));
    } else {
      router.push(props.destination);
    }
  }

  return (
    <div
      className="cursor-pointer px-2"
      onClick={handleClick}
    >
      {props.isImg ? (
        <img src={`/${props.icon}.svg`} alt={props.icon} className="h-9" />
      ) : (
        <Icon name={props.icon as IconName} className="!h-10 !w-10 text-primary" />
      )}
    </div>
  );
}
