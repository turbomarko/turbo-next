import { H1 } from "@/components/text";

import Form from "./Form";

export default () => {
  return (
    <div className="w-full">
      <div className="mx-auto mt-8 w-full max-w-lg px-2 text-center">
        <H1 className="text-primary">Contact us</H1>
        <Form />
      </div>
    </div>
  );
};
