import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQueryWithReauth";

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default api;
