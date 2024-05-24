import localFont from "next/font/local";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const marige = localFont({ src: "../fonts/marigedemoregular.otf", variable: "--font-marige" });

export default (props: Props) => {
  return <h1 className={`text-4xl ${marige.className} ${props.className || ""}`}>{props.children}</h1>;
};
