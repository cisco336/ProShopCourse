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
            invalidatesTags: ["Orders"],
            transformErrorResponse: (response, meta, arg) => {
                return {
                    status: response.status,
                    message: response.data.detail,
                };
            },
        }),
        getOrderDetails: build.query({
            query: (id) => ({
                url: `/api/orders/${id}`,
            }),
            transformResponse: (response, meta, arg) => {
                return { ...response };
            },
            transformErrorResponse: (response, meta, arg) => {
                return {
                    status: response.status,
                    message: response.data.detail,
                };
            },
        }),
        updateOrderPaid: build.mutation({
            query: (id) => ({
                url: `/api/orders/${id}/pay/`,
            }),
            transformResponse: (response, meta, arg) => {
                return { ...response };
            },
            transformErrorResponse: (response, meta, arg) => {
                return {
                    status: response.status,
                    message: response.data.detail,
                };
            },
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, useUpdateOrderPaidMutation } = orderApi;
