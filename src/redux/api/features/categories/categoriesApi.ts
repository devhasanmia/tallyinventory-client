import { baseApi } from "../../baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addCategory: builder.mutation({
    //   query: (data) => ({
    //     url: "/category/create-customer",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
     getAllCategory: builder.query({
      query: () => ({
        url: "/category/getAllCategories",
        method: "GET",
      }),
    }),
   
  }),
});

export const {useGetAllCategoryQuery} = categoriesApi;