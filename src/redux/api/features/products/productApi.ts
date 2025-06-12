import { baseApi } from "../../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/product/get-all-products",
        method: "GET"
      })
    })
  }),
});

export const {useAddProductMutation, useGetAllProductsQuery} = productApi;