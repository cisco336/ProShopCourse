import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
    }),
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => "/api/products/",
        }),
        getProductById: build.query({
            query: (id) => `/api/products/${id}`,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
