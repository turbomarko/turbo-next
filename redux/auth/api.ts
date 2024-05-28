import baseApi from "../api";
import type {
  UserResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordConfirmRequest
} from "@/types";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<UserResponse, void>({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
        body: {},
      }),
    }),
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/registration/",
        method: "POST",
        body: userData,
      }),
    }),
    resetPassword: builder.mutation<{detail: string}, string>({
      query: (email) => ({
        url: "/auth/password/reset/",
        method: "POST",
        body: {email},
      }),
    }),
    resetPasswordConfirm: builder.mutation<{detail: string}, ResetPasswordConfirmRequest>({
      query: (credentials) => ({
        url: "/auth/password/reset/confirm/",
        method: "POST",
        body: credentials,
      })
    }),
    verifyEmail: builder.mutation<{detail: string}, string>({
      query: (key) => ({
        url: "/auth/registration/verify-email/",
        method: "POST",
        body: {key},
      })
    }),
    resendVerifyEmail: builder.mutation<{detail: string}, string>({
      query: (email) => ({
        url: "/auth/registration/resend-email/",
        method: "POST",
        body: {email},
      })
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
} = api;
