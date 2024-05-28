type Props = {
    children: React.ReactNode;
    className?: string;
};

export default (props: Props) => {
  return <p className={`text-xs ${props.className || ""}`}>{props.children}</p>;
};
