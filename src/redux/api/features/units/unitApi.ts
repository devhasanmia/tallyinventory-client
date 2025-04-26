import { baseApi } from "../../baseApi";

const unitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnits: builder.query({
      query: () => ({
        url: "/unit/getAllUnits?limit=500",
        method: "GET",
      }),
      providesTags: ["Unit"],
    }),
    createUnit: builder.mutation({
      query: (data) => ({
        url: "/unit/create-unit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Unit"],
    })
  }),
});

export const { useGetAllUnitsQuery, useCreateUnitMutation } = unitApi;