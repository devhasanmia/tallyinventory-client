import { baseApi } from "../../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getAllCategories: builder.query({
      query: () => ({
        url: "/category/getAllCategories",
        method: "GET",
      }),
    }),
  }),
});

export const {useGetAllCategoriesQuery} = productApi;