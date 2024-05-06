"use client";

import { useState} from "react";

import { Button } from "@/components/form";
import { useSendContactMessageMutation } from "@/redux/contacts";

import TextInput from "./TextInput";
import SuccessModal from "./SuccessModal";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export default () => {
  const [form, setForm] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  const updateForm = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    const response = await sendContactMessage(form).unwrap();
    if (response.id) {
      setIsOpen(true);
      setForm(initialState);
    }
  };

  return (
    <>
      <div className="w-full flex mt-10">
        <TextInput
          name="firstName"
          placeholder="First name"
          value={form.firstName}
          onChange={(e) => updateForm("firstName", e.target.value)}
          divClassName="mr-4"
        />
        <TextInput
          name="lastName"
          placeholder="Last name"
          value={form.lastName}
          onChange={(e) => updateForm("lastName", e.target.value)}
        />
      </div>
      <TextInput
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => updateForm("email", e.target.value)}
      />
      <TextInput
        name="message"
        placeholder="Type here..."
        value={form.message}
        onChange={(e) => updateForm("message", e.target.value)}
        textArea
        divClassName="mt-2"
      />
      <div className="flex justify-end mt-4 mb-10">
        <Button
          onClick={submit}
          className="!mr-0"
          isLoading={isLoading}
        >
          Send
        </Button>
      </div>
      <SuccessModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
