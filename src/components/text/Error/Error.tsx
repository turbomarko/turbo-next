import Base from "../Base";

type Props = {
  children: string;
  className?: string;
};

export default (props: Props) => {
  return (
    <Base className={`text-red-600 text-sm ${props.className}`}>{props.children}</Base>
  );
}
