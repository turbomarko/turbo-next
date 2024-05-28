import baseApi from "../api";
import type { User, ChangePasswordRequest } from "@/types";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/auth/user/",
      }),
    }),
    updateUser: builder.mutation<User, string>({
      query: (email) => ({
        url: "/auth/user/",
        method: "PATCH",
        body: { email },
      }),
    }),
    deleteUser: builder.mutation<User, void>({
      query: () => ({
        url: "/auth/user/delete/",
        method: "DELETE",
      }),
    }),
    changePassword: builder.mutation<null, ChangePasswordRequest>({
      query: (credentials) => ({
        url: "/auth/password/change/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
} = api;
