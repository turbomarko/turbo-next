import { ContactMessage } from "@/types";

import baseApi from '../api';

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<ContactMessage, ContactMessage>({
      query: (body) => ({
        url: "/contacts/",
        method: "POST",
        body,
      }),
    }),
    subscribeToNewsletter: builder.mutation<{email: string, id: number}, string>({
      query: (email) => ({
        url: "/contacts/newsletter/",
        method: "POST",
        body: { email },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSendContactMessageMutation,
  useSubscribeToNewsletterMutation,
} = api;
