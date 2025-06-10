import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.token || state.auth?.otpToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),
  tagTypes: ["transactions", "user"],
  endpoints: () => ({}),
});
