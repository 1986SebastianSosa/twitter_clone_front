import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const ApiUrl = process.env.REACT_APP_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: ApiUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: "/auth/login",
        method: "POST",
        body: values,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
