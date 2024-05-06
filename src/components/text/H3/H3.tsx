import localFont from 'next/font/local';

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default (props: Props) => {
  return <h3 className={`text-xl ${props.className || ""}`}>{props.children}</h3>;
};
