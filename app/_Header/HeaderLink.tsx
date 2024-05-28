"use client";

import { useRouter } from "next/navigation";

import { Base, Important } from "@/components/text";
import { openAuthModal } from "@/redux/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type Props = {
  destination: string;
  name: string;
  authRequired?: boolean;
};

export default (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tokenExpirationTime = useAppSelector(
    (state) => state.auth.tokenExpirationTime,
  );

  const handleClick = () => {
    if (
      props.authRequired &&
      (!tokenExpirationTime || tokenExpirationTime < Date.now().toString())
    ) {
      dispatch(openAuthModal(props.destination));
    } else {
      router.push(props.destination);
    }
  };

  return (
    <div className="mx-10" onClick={handleClick}>
      <Base className="cursor-pointer text-primary hover:text-secondary">
        <Important>{props.name}</Important>
      </Base>
    </div>
  );
};
