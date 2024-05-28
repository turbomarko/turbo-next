import SVG from "react-inlinesvg";

import { H1 } from "@/components/text";

import BackButton from "./BackButton";

type Props = {
  code: string;
  title: string;
};

export default (props: Props) => {
  return (
    <main className="h-screen w-full bg-[url('/error-cover.jpeg')] bg-cover bg-center">
      <div className="mx-auto flex flex-col items-center pt-56">
        <H1 className="text-center !text-8xl text-card">Error {props.code}</H1>
        <H1 className="text-center">{props.title}</H1>
        <BackButton />
        <SVG src="/logo.svg" className="h-48 w-48" />
      </div>
    </main>
  );
};
