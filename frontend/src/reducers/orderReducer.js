import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: "orders",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: (headers, { getState }) => {
            let token = getState()?.user?.userData?.token;
            headers.set("authorization", `Bearer ${token}`);

            return headers;
        },
    }),
    tagTypes: ["Orders"],
    endpoints: (build) => ({
        createOrder: build.mutation({
            query: ({
                orderItems,
                paymentMethod,
                taxPrice,
                shippingPrice,
                shippingAddress,
                totalPrice,
            }) => ({
                url: "/api/orders/add/",
                method: "POST",
                body: {
                    orderItems,
                    paymentMethod,
                    taxPrice,
                    shippingPrice,
                    shippingAddress,
                    totalPrice,
                },
            }),
            transformErrorResponse: (response, meta, arg) => {
                return {
                    status: response.status,
                    message: response.data.detail,
                };
            },
        }),
    }),
});

export const { useCreateOrderMutation } = orderApi;
