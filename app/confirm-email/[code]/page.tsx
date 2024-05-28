import Modal from "./Modal";

type Props = {
  params: {
    code: string;
  }
}

export default (props: Props) => {
  return (
    <div className="w-screen h-screen">
      <Modal
        code={props.params.code}
      />
    </div>
  );
};
