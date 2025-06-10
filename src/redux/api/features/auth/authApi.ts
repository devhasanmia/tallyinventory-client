import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/user/auth/login",
                method: "POST",
                body: data
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: "/user/auth/verify-otp",
                method: "POST",
                body: data
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: "/user/auth/get-user",
                method: "GET",
            }),
        }),

    }),
});

export const { useLoginMutation, useVerifyOtpMutation, useGetUserQuery} = authApi;