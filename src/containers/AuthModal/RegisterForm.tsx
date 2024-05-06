"use client";

import { useState } from "react";
import Link from "next/link";
import SVG from 'react-inlinesvg';

import { Base, H1, Error } from "@/components/text";
import { Button } from "@/components/form";
import { useRegisterMutation, useLoginMutation } from "@/redux/auth";

import TextInput from "./TextInput";

type Props = {
  finalizeAuth: (isRegister?: boolean) => void;
}

export default (props: Props) => {
  const [register, { isLoading: isRegistering, error }] = useRegisterMutation();
  const [login, { isLoading: isLogging }] = useLoginMutation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [terms, setTerms] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value.trim() })
  }

  const handleSubmit = async () => {
    if (!terms) {
      setTermError(true);
      return;
    }
    const result = await register(form) as any;
    if (result?.data?.user) {
      await login({
        email: form.email,
        password: form.password1,
      });
      props.finalizeAuth(true);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-w-fit px-4 md:px-8 md:border-l border-secondary">
      <H1 className="mb-2">Sign up</H1>
      <div className="w-full flex justify-around">
        <TextInput
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          placeholder="First name"
          divClassName="!mr-2"
          fieldErrors={(error as any)?.data?.fieldErrors?.firstName}
          />
        <TextInput
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          placeholder="Last name"
          fieldErrors={(error as any)?.data?.fieldErrors?.lastName}
        />
      </div>
      <TextInput
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="E-Mail"
        fieldErrors={(error as any)?.data?.fieldErrors?.email}
      />
      <div className="w-full flex justify-around">
        <TextInput
          name="password1"
          value={form.password1}
          onChange={onChange}
          type="password"
          placeholder="Password"
          divClassName="!mr-2"
          fieldErrors={(error as any)?.data?.fieldErrors?.password1}
        />
        <TextInput
          name="password2"
          value={form.password2}
          onChange={onChange}
          type="password"
          placeholder="Repeat password"
          fieldErrors={(error as any)?.data?.fieldErrors?.password2}
        />
      </div>
      <label
        className="flex items-start cursor-pointer my-2 !text-secondary"
        onClick={() => {
          setTerms(!terms);
          setTermError(false);
        }}
      >
        <SVG src={`/checkbox-${terms ? "on" : "off"}.svg`} className="h-4 mt-0.5" />
        <Base className="ml-2 cursor-pointer">
          I accept the
          <Link href="/docs/terms-and-conditions" className="mx-1 underline underline-offset-2">Terms and Conditions</Link>
          and the
          <Link href="/docs/privacy-policy" className="mx-1 underline underline-offset-2">Privacy policy</Link>
        </Base>
      </label>
      {termError && <Error>Please, accept the terms and conditions and the privacy policy</Error>}
      <Button onClick={handleSubmit} isLoading={isRegistering || isLogging}>Sign up</Button>
      {(error as any)?.data?.fieldErrors?.nonFieldErrors?.map((error: string, index: number) => (
        <Error key={index}>{error}</Error>
      ))}
    </div>
  );
}
