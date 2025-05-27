import { baseApi } from "../../baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => ({
        url: "/customer/create-customer",
        method: "POST",
        body: data,
      }),
    }),
     getAllCustomers: builder.query({
      query: () => ({
        url: "/customer/getAllCustomers",
        method: "GET",
      }),
    }),
   
  }),
});

export const {useAddCustomerMutation, useGetAllCustomersQuery} = customerApi;