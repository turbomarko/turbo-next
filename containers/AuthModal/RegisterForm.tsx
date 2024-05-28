"use client";

import { useState } from "react";
import Link from "next/link";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import SVG from "react-inlinesvg";

import { UserResponse } from "@/types";

import { Base, H1, Error } from "@/components/text";
import { Button } from "@/components/form";
import { useRegisterMutation, useLoginMutation } from "@/redux/auth";

import TextInput from "./TextInput";

type Props = {
  finalizeAuth: (isRegister?: boolean) => void;
};

export default (props: Props) => {
  const [register, { isLoading: isRegistering, error }] = useRegisterMutation();
  const [login, { isLoading: isLogging }] = useLoginMutation();
  const fieldErrors = (
    (error as FetchBaseQueryError)?.data as {
      fieldErrors: { [key: string]: string[] };
    }
  )?.fieldErrors;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [terms, setTerms] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  };

  const handleSubmit = async () => {
    if (!terms) {
      setTermError(true);
      return;
    }
    const result = (await register(form)) as { data: UserResponse };
    if (result?.data?.user) {
      await login({
        email: form.email,
        password: form.password1,
      });
      props.finalizeAuth(true);
    }
  };

  return (
    <div className="flex min-w-fit flex-col items-center justify-center border-secondary px-4 md:border-l md:px-8">
      <H1 className="mb-2">Sign up</H1>
      <div className="flex w-full justify-around">
        <TextInput
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          placeholder="First name"
          divClassName="!mr-2"
          fieldErrors={fieldErrors?.firstName}
        />
        <TextInput
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          placeholder="Last name"
          fieldErrors={fieldErrors?.lastName}
        />
      </div>
      <TextInput
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="E-Mail"
        fieldErrors={fieldErrors?.email}
      />
      <div className="flex w-full justify-around">
        <TextInput
          name="password1"
          value={form.password1}
          onChange={onChange}
          type="password"
          placeholder="Password"
          divClassName="!mr-2"
          fieldErrors={fieldErrors?.password1}
        />
        <TextInput
          name="password2"
          value={form.password2}
          onChange={onChange}
          type="password"
          placeholder="Repeat password"
          fieldErrors={fieldErrors?.password2}
        />
      </div>
      <label
        className="my-2 flex cursor-pointer items-start !text-secondary"
        onClick={() => {
          setTerms(!terms);
          setTermError(false);
        }}
      >
        <SVG
          src={`/checkbox-${terms ? "on" : "off"}.svg`}
          className="mt-0.5 h-4"
        />
        <Base className="ml-2 cursor-pointer">
          I accept the
          <Link
            href="/docs/terms-and-conditions"
            className="mx-1 underline underline-offset-2"
          >
            Terms and Conditions
          </Link>
          and the
          <Link
            href="/docs/privacy-policy"
            className="mx-1 underline underline-offset-2"
          >
            Privacy policy
          </Link>
        </Base>
      </label>
      {termError && (
        <Error>
          Please, accept the terms and conditions and the privacy policy
        </Error>
      )}
      <Button onClick={handleSubmit} isLoading={isRegistering || isLogging}>
        Sign up
      </Button>
      {fieldErrors?.nonFieldErrors?.map((error: string, index: number) => (
        <Error key={index}>{error}</Error>
      ))}
    </div>
  );
};
