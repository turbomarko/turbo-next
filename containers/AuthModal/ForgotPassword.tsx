"use client";

import { useState } from "react";

import { H1, Base, Error } from "@/components/text";
import { Modal } from "@/components/ui";
import { Button } from "@/components/form";
import { useResetPasswordMutation } from "@/redux/auth";

import TextInput from "./TextInput";

type Props = {
  isOpen: boolean;
  close: () => void;
}

export default (props: Props) => {
  const [email, setEmail] = useState("");
  const [resetPassword, { isLoading, error, data }] = useResetPasswordMutation();

  return (
    <Modal
      isOpen={props.isOpen}
      close={props.close}
      closable
      className="flex flex-col items-center text-center text-card !px-10"
    >
      <H1>Forgot password</H1>
      <Base className="mt-4">No worries, we will send you</Base>
      <Base className="mb-4">the reset instructions.</Base>
      <TextInput
        name="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <Error>{(error as any)?.data?.fieldErrors?.email}</Error>
      <Base>{data?.detail}</Base>
      <Button
        onClick={() => resetPassword(email)}
        isLoading={isLoading}
        className="mt-2"
      >
        Send
      </Button>
    </Modal>
  );
}
