import Link from "next/link";

import { PageRoute } from "@/types";

import { Important } from "@/components/text";

type Props = {
  routes: PageRoute[];
  activeRoute: string;
  isStacked?: boolean;
};

export default (props: Props) => {
  return (
    <div
      role="navigation"
      className={`
        mx-auto mb-8 flex max-w-2xl items-start px-4
        ${props.isStacked ? "justify-start" : "justify-center"}
      `}
    >
      {props.routes.map((route, idx) => (
        <Link
          key={idx}
          href={route.path}
          className={`
            bg cursor-pointer rounded-b-lg bg-primary px-4 pb-2 pt-2 sm:pt-4
            ${props.activeRoute === route.path ? "z-20 !pt-4 sm:!pt-6" : "z-10 opacity-50"}
            ${props.isStacked ? "-mx-4" : "mx-2"}
          `}
        >
          <Important className="text-background">{route.label}</Important>
        </Link>
      ))}
    </div>
  );
};
