import { baseApi } from "../../baseApi";

const unitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnits: builder.query({
      query: () => ({
        url: "/unit/getAllUnits?limit",
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
    }),
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `/unit/deleteUnitById/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Unit"],
    }),
  }),
});

export const { useGetAllUnitsQuery, useCreateUnitMutation, useDeleteUnitMutation } = unitApi;