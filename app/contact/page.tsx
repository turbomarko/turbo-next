import { H1 } from "@/components/text";

import Form from "./Form";

export default () => {
  return (
    <div className="w-full">
      <div className="w-full max-w-lg mx-auto mt-8 text-center px-2">
        <H1 className="text-primary">Contact us</H1>
        <Form />
      </div>
    </div>
  );
};
