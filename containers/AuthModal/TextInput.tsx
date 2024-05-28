import { TextInput, TextInputProps } from "@/components/form";

export default (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      inputClassName={`!rounded-2xl !my-1 !px-4 ${props.inputClassName}`}
    />
  );
};
