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
        // A mutation endpoint
        // updateTodo: build.mutation({
        //     query: (updatedTodo) => ({
        //         url: `/todos/${updatedTodo.id}`,
        //         method: "POST",
        //         body: updatedTodo,
        //     }),
        // }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
