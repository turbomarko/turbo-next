import Link from "next/link";

import { Note } from "@/components/text";

import type { LinkType } from "./types";
import AuthButton from "./AuthButton";

export default (props: LinkType) => {
  if (props.isAuth) {
    return (
      <AuthButton name={props.name} />
    );
  }

  return (
    <Link href={props.href} className="mb-2 hover:opacity-50">
      <Note className="cursor-pointer whitespace-nowrap">
        {props.name}
      </Note>
    </Link>
  );
};
