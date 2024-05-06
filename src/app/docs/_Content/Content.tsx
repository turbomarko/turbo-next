import { Base, H4 } from "@/components/text";

import { Paragraph } from "@/types";

type Props = {
  secionList: Paragraph[];
};

export default (props: Props) => {
  return (
    <>
      {props.secionList.map((section, policyIndex) => (
        <div key={policyIndex} className="my-6">
          <H4>{policyIndex+1}. {section.title}:</H4>
          {section.content.map((paragraph, paragraphIndex) => (
            <Base key={paragraphIndex} className="ml-2">- {paragraph}</Base>
          ))}
        </div>
      ))}
    </>
  )
}
