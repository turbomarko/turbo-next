import SVG from "react-inlinesvg";

import Link from "./Link";
import { links } from "./config";

export default () => {
  return (
    <div className="relative z-10 flex w-full flex-col justify-between bg-footer px-2 py-4 lg:flex-row lg:px-8 lg:py-8">
      <div className="order-2 mx-auto mt-2 flex w-full max-w-md justify-between border-y border-card pt-2 lg:order-1 lg:mx-0 lg:mt-0 lg:w-fit lg:justify-start lg:border-y-0 lg:pt-0">
        {links.map((link, colIndex) => (
          <div className="flex flex-col items-start lg:mr-10" key={colIndex}>
            {link.map((item, rowIndex) => (
              <Link {...item} key={rowIndex} />
            ))}
          </div>
        ))}
      </div>
      <div className="order-1 flex flex-col items-center justify-center lg:order-2">
        <SVG src="/logo.svg" className="mb-2 h-20 w-20" />
      </div>
    </div>
  );
};
