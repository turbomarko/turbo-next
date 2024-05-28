import { H1, Base } from "@/components/text";

type Props = {
  title: string;
  intro: string;
};

export default (props: Props) => {
  return (
    <>
      <H1 className="text-center">{props.title}</H1>
      <Base className="text-center text-primary mt-6">{props.intro}</Base>
    </>
  );
};
