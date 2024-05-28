"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import SVG from 'react-inlinesvg';

import { H1 } from '@/components/text';
import { Modal } from "@/components/ui";
import { setTokenExpirationTime } from "@/redux/auth";
import { closeAuthModal, openAuthModal } from "@/redux/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPassword from "./ForgotPassword";

export default () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthModalOpen, nextRoute } = useAppSelector((state) => state.ui);
  const [isForgotPassword, setForgotPassword] = useState(false);

  const finalizeAuth = (isRegister=false) => {
    dispatch(closeAuthModal());
    const tokenExpirationTime = (new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)).toISOString();
    dispatch(setTokenExpirationTime(tokenExpirationTime));
    if (isRegister) {
      router.push("/welcome");
    } else if (nextRoute) {
      router.push(nextRoute);
    }
  }

  return (
    <>
      <Modal close={() => dispatch(closeAuthModal())} isOpen={isAuthModalOpen} closable>
        <div className="flex flex-col justify-center items-center">
          <SVG src="/logo.svg" className="m-auto h-40 w-40 mt-8 mb-16" />
          <div className="flex flex-col md:!flex-row justify-center items-center md:!items-start">
            {/* Login */}
            <LoginForm
              finalizeAuth={finalizeAuth}
              isForgotPassword={isForgotPassword}
              openForgotPassword={() => {
                setForgotPassword(true);
                dispatch(closeAuthModal());
              }}
            />
            <div className="block md:hidden w-full mx-4 my-8 pt-6 pb-4 border-y border-secondary" >
              <H1 className="text-card text-center">OR</H1>
            </div>
            {/* Register */}
            <RegisterForm finalizeAuth={finalizeAuth} />
          </div>
        </div>
      </Modal>
      <ForgotPassword
          isOpen={isForgotPassword}
          close={() => {
            setForgotPassword(false);
            dispatch(openAuthModal(nextRoute));
          }}
        />
    </>
  );
}
