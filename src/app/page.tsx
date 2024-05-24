import SVG from 'react-inlinesvg';

import { H1 } from "@/components/text";

export default () => {
  return (
    <main className="h-full w-full bg-white">
      {/* Cover and title */}
      <div className="py-28 sm:py-48">
        <SVG src="/logo.svg" className="mx-auto h-40 w-40 sm:w-32" />
        <H1 className="text-card text-center my-6">This is a subtitle</H1>
      </div>
    </main>
  );
};
