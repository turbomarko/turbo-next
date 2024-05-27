"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";


import { H1, Base, Error } from "@/components/text";
import { Modal } from "@/components/ui";
import { Button } from "@/components/form";
import { useResetPasswordConfirmMutation } from "@/redux/auth";

import TextInput from "@/containers/AuthModal/TextInput";

export default () => {
  const [formData, setFormData] = useState({
    newPassword1: "",
    newPassword2: "",
  });
  const [resetPasswordConfirm, { isLoading, error, data }] = useResetPasswordConfirmMutation();
  const pathname = usePathname();
  const router = useRouter();

  const fieldErrors = ((error as FetchBaseQueryError)?.data as ({fieldErrors: {[key: string]: string}}))?.fieldErrors;

  useEffect(() => {
    if (data?.detail) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <Modal
      isOpen={true}
      close={() => {}}
      className="flex flex-col items-center text-center text-card !px-10"
    >
      <H1>Reset password</H1>
      <Base className="mt-4">Enter your new password.</Base>
      <TextInput
        name="newPassword1"
        value={formData.newPassword1}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setFormData({ ...formData, newPassword1: e.target.value })}
        type="password"
        placeholder="New password"
      />
      <TextInput
        name="newPassword2"
        value={formData.newPassword2}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setFormData({ ...formData, newPassword2: e.target.value })}
        type="password"
        placeholder="Confirm new password"
      />
      <Error>{fieldErrors?.newPassword1}</Error>
      <Error>{fieldErrors?.newPassword2}</Error>
      <Error>{fieldErrors?.token ? "The reset e-mail has expired. Please, request a new one." : ""}</Error>
      <Button
        onClick={() => resetPasswordConfirm({
          ...formData,
          uid: pathname.split("/")[3],
          token: pathname.split("/")[4],
        })}
        isLoading={isLoading}
        className="mt-2"
      >
        Reset
      </Button>
    </Modal>
  );
};
