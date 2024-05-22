"use client";

import { useEffect } from "react";

import { H1, Base } from "@/components/text";
import { Modal, LoadingIndicator } from "@/components/ui";
import { LinkButton } from "@/components/form";
import { useVerifyEmailMutation } from "@/redux/auth";

type Props = {
  code: string;
}

export default (props: Props) => {
  const [verify, { isLoading, data, error }] = useVerifyEmailMutation();
  useEffect(() => {
    if (props.code) verify(props.code.replace(/%3A/g, ":"));
  }, [props.code, verify]);

  return (
    <Modal
      isOpen={true}
      close={() => {}}
      className="flex flex-col items-center text-center text-card !px-10"
    >
      {isLoading ? (
        <>
          <H1>Verifying e-mail address</H1>
          <LoadingIndicator />
        </>
      ) : (
        <>
          <H1>{(error as any)?.data?.error}</H1>
          {data?.detail ? (
            <>
              <H1>Success!</H1>
              <Base className="mt-4">E-mail verification complete.</Base>
              <div className="flex justify-center items-center mt-6">
                <LinkButton
                  href="/"
                  className="mr-4"
                >
                  Home
                </LinkButton>
              </div>
            </>
          ) : null}
        </>
      )}
    </Modal>
  );
}
