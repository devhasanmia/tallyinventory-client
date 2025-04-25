import { baseApi } from "../../baseApi";

const unitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnits: builder.query({
      query: () => ({
        url: "/unit/getAllUnits",
        method: "GET",
      }),
      providesTags: ["Unit"],
    }),
    createUnit: builder.mutation({
      query: (data) => ({
        url: "/unit/createUnit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Unit"],
    })
  }),
});

export const { useGetAllUnitsQuery, useCreateUnitMutation } = unitApi;