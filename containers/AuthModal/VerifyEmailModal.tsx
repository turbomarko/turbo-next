"use client";

import { useState } from "react";

import { Button } from "@/components/form";
import { Modal } from "@/components/ui";
import { H1, Base } from "@/components/text";
import { closeVerifyEmailModal } from "@/redux/ui";
import { useResendVerifyEmailMutation } from "@/redux/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default () => {
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useAppDispatch();
  const { isVerifyEmailModalOpen } = useAppSelector((state) => state.ui);
  const [resendVerifyEmail] = useResendVerifyEmailMutation();

  const handleResendVerifyEmail = async () => {
    const response = await resendVerifyEmail("test@example.com").unwrap();
    if (response?.detail) {
      setEmailSent(true);
    }
  }

  return (
    <Modal
      close={() => dispatch(closeVerifyEmailModal())}
      isOpen={isVerifyEmailModalOpen}
      className="text-center"
    >
      <H1>Verify your e-mail</H1>
      <Base>
        You need to verify your e-mail before you can continue.
      </Base>
      {emailSent ? (
        <Base className="mt-4">
          We've sent you an e-mail with a link to verify your e-mail address.
        </Base>
      ) : (
        <div className="flex justify-center items-center mt-8">
          <Button
            onClick={() => dispatch(closeVerifyEmailModal())}
            variant="tertiary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleResendVerifyEmail()}
            className="ml-4"
          >
            Resend e-mail
          </Button>
        </div>
      )}
    </Modal>
  );
}
