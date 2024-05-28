"use client";

import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";

import { UserResponse } from "@/types";

import { H1, Base, Error } from "@/components/text";
import { Button } from "@/components/form";
import { useLoginMutation } from "@/redux/auth";

import TextInput from "./TextInput";

type Props = {
  finalizeAuth: (isRegister?: boolean) => void;
  isForgotPassword: boolean;
  openForgotPassword: () => void;
};

export default (props: Props) => {
  const [login, { isLoading, error }] = useLoginMutation();
  const fieldErrors = (
    (error as FetchBaseQueryError)?.data as {
      fieldErrors: { [key: string]: string[] };
    }
  )?.fieldErrors;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async () => {
    const result = (await login(formData)) as { data: UserResponse };
    if (result?.data?.user) {
      props.finalizeAuth();
    }
  };

  return (
    <div className="flex min-w-fit flex-col items-center justify-center px-8">
      <H1 className="mb-2">Login</H1>
      <TextInput
        name="email"
        value={formData.email}
        onChange={onChangeForm}
        placeholder="E-Mail"
        fieldErrors={fieldErrors?.email}
      />
      <TextInput
        name="password"
        value={formData.password}
        onChange={onChangeForm}
        type="password"
        placeholder="Password"
        fieldErrors={fieldErrors?.nonFieldErrors}
      />
      <div onClick={() => props.openForgotPassword()}>
        <Base className="my-2 cursor-pointer text-secondary underline underline-offset-2">
          Forgot password
        </Base>
      </div>
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Login
      </Button>
      {fieldErrors?.nonFieldErrors?.map((error: string, index: number) => (
        <Error key={index}>{error}</Error>
      ))}
    </div>
  );
};
