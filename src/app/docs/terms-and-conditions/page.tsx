import { Base } from "@/components/text";

import Content from "../_Content";
import Intro from "../_Intro";

import { terms } from "./config";

export default () => {
  return (
    <>

      <Intro
        title="Terms and conditions"
        intro="This is an example of a terms and conditions page."
      />

      <Content secionList={terms} />

      <Base>
        The end
      </Base>

    </>
  );
};
