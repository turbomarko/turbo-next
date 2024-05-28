import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { setTokenExpirationTime } from "../auth/slice";
import { openAuthModal, openVerifyEmailModal } from "../ui/slice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  // If we want to access endpoints that must return different things based on authenticated status, we refresh the token first
  const differingEndpoints: string[] = [];
  const urlEnd = typeof args === "string" ? args : args.url;
  if (differingEndpoints.includes(urlEnd)) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // try to get a new token
        const refreshResult = await baseQuery(
          {
            url: "/auth/token/refresh/",
            method: "POST",
            body: {},
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          // store the new token expiration time
          await api.dispatch(
            setTokenExpirationTime(
              (refreshResult.data as { refreshExpiration: string })
                .refreshExpiration,
            ),
          );
        }
      } finally {
        release();
      }
    } else {
      // if the mutex is locked, wait for it to unlock and retry the initial query
      return await baseQueryWithReauth(args, api, extraOptions);
    }
  }

  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    (!urlEnd.includes("/auth/") || urlEnd === "/auth/user/delete/")
  ) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // try to get a new token
        const refreshResult = await baseQuery(
          {
            url: "/auth/token/refresh/",
            method: "POST",
            body: {},
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          // store the new token expiration time
          api.dispatch(
            setTokenExpirationTime(
              (refreshResult.data as { refreshExpiration: string })
                .refreshExpiration,
            ),
          );
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // if the refresh token is invalid and the user tries to access a must-auth endpoint, open the auth modal
          const optionalAuthEndpoints: string[] = [];
          if (!optionalAuthEndpoints.includes(urlEnd)) {
            api.dispatch(openAuthModal(""));
          }
        }
      } finally {
        release();
      }
    } else {
      // if the mutex is locked, wait for it to unlock and retry the initial query
      return await baseQueryWithReauth(args, api, extraOptions);
    }
  }
  if (result.error && result.error.status === 403) {
    api.dispatch(openVerifyEmailModal());
  }
  return result;
};

export default baseQueryWithReauth;
