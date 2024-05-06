import Content from "../_Content";
import Intro from "../_Intro";

import { policies } from "./config";

export default () => {
  return (
    <>

      <Intro
        title="Privacy Policy"
        intro="This is some intro text for the privacy policy page. It should be a brief overview of what the user can expect to find in the document."
      />

      <Content secionList={policies} />

    </>
  )
}
