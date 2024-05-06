"use client";

import { useState } from "react";

import { H1, Base, Error } from "@/components/text";
import { Button } from "@/components/form";
import { useLoginMutation } from "@/redux/auth";

import TextInput from "./TextInput";

type Props = {
  finalizeAuth: (isRegister?: boolean) => void;
  isForgotPassword: boolean;
  openForgotPassword: () => void;
}

export default (props: Props) => {
  const [login, { isLoading, error }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value.trim() })
  }

  const handleSubmit = async () => {
    const result = await login(formData) as any;
    if (result?.data?.user) {
      props.finalizeAuth();
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-w-fit px-8">
      <H1 className="mb-2">Login</H1>
      <TextInput
        name="email"
        value={formData.email}
        onChange={onChangeForm}
        placeholder="E-Mail"
        fieldErrors={(error as any)?.data?.fieldErrors?.email}
      />
      <TextInput
        name="password"
        value={formData.password}
        onChange={onChangeForm}
        type="password"
        placeholder="Password"
        fieldErrors={(error as any)?.data?.fieldErrors?.nonFieldErrors}
      />
      <div
        onClick={() => props.openForgotPassword()}
      >
        <Base className="text-secondary my-2 underline underline-offset-2 cursor-pointer">Forgot password</Base>
      </div>
      <Button onClick={handleSubmit} isLoading={isLoading}>Login</Button>
      {(error as any)?.data?.fieldErrors?.nonFieldErrors?.map((error: string, index: number) => (
        <Error key={index}>{error}</Error>
      ))}
    </div>
  );
}
