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
    <div className={`
      flex items-start max-w-2xl mx-auto mb-8 px-4
      ${props.isStacked ? "justify-start" : "justify-center"}
    `}>
      {props.routes.map((route, idx) => (
        <Link
          key={idx}
          href={route.path}
          className={`
            cursor-pointer pb-2 pt-2 sm:pt-4 px-4 bg bg-primary rounded-b-lg
            ${props.activeRoute === route.path ? "!pt-4 sm:!pt-6 z-20" : "opacity-50 z-10"}
            ${props.isStacked ? "-mx-4" : "mx-2"}
          `}
        >
          <Important
            className="text-background"
          >
            {route.label}
          </Important>
        </Link>
      ))}
    </div>
  );
};
