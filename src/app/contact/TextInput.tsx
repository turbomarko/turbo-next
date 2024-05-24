import { TextInput, TextInputProps } from "@/components/form";

export default (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      inputClassName={`!rounded-2xl !px-4 ${props.inputClassName}`}
    />
  );
};