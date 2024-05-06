type Props = {
    children: React.ReactNode;
    className?: string;
};

export default (props: Props) => {
  return <p className={`text-sm leading-4 ${props.className || ""}`}>{props.children}</p>;
};
