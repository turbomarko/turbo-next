type Props = {
    children: React.ReactNode;
    className?: string;
};

export default (props: Props) => {
  return <p className={`text-lg leading-5 ${props.className || ""}`}>{props.children}</p>;
};
