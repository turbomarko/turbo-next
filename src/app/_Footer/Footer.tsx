import SVG from 'react-inlinesvg';

import Link from "./Link";
import { links } from "./config";

export default () => {
  return (
    <div className="w-full bg-footer flex flex-col lg:flex-row justify-between px-2 py-4 lg:px-8 lg:py-8 relative z-10">
      <div className="flex justify-between max-w-md w-full lg:w-fit mx-auto lg:mx-0 lg:justify-start order-2 lg:order-1 border-y border-card pt-2 mt-2 lg:border-y-0 lg:mt-0 lg:pt-0">
        {links.map((link, colIndex) => (
          <div className="flex flex-col items-start lg:mr-10" key={colIndex}>
            {link.map((item, rowIndex) => (
                <Link {...item} key={rowIndex} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center order-1 lg:order-2">
        <SVG src="/logo.svg" className="w-20 h-20 mb-2" />
      </div>
    </div>
  );
};
