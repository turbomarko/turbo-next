import localFont from "next/font/local";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const helveticaBold = localFont({ src: "../fonts/HelveticaNeueBold.otf", variable: "--font-helveticaBold" });

export default (props: Props) => {
  return <span className={`${helveticaBold.className} ${props.className || ""}`}>{props.children}</span>;
};
