import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState)?.auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      const otpToken = (getState() as RootState)?.auth.otpToken;
      if (otpToken) {
        headers.set("authorization", `Bearer ${otpToken}`);
      }
    }
  }),
  tagTypes: ["transactions", "user"],
  endpoints: () => ({}),
});