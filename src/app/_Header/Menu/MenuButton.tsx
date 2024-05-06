"use client";

import { useRouter } from "next/navigation";

import { H1 } from "@/components/text";
import { openAuthModal, toggleMenu } from "@/redux/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type Props = {
  destination: string;
  name: string;
  authRequired?: boolean;
}

export default (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tokenExpirationTime = useAppSelector((state) => state.auth.tokenExpirationTime);

  const handleClick = () => {
    dispatch(toggleMenu());
    if (props.authRequired && (!tokenExpirationTime || tokenExpirationTime < Date.now().toString())) {
      dispatch(openAuthModal(props.destination));
    } else {
      router.push(props.destination);
    }
  }

  return (
    <div
      className="cursor-pointer mx-auto py-4"
      onClick={handleClick}
    >
      <H1 className="cursor-pointer text-center text-primary hover:text-secondary">{props.name}</H1>
    </div>
  );
}
