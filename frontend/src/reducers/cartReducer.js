import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingAddress: localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartAddItem: (state, {payload}) => {
            let exist =
                state?.cartItems?.length > 0 &&
                state.cartItems.find(
                    (item) => item._id === payload._id,
                ) !== undefined;
            if (!exist) {
                return {
                    ...state,
                    cartItems: state.cartItems === null ? [{...payload}] : state.cartItems.push({...payload}),
                };
            } else {
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(state.cartItems),
                );
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item._id === payload._id ? payload : item,
                    ),
                };
            }
        },
        cartRemoveItem: (state, { payload }) => {
            localStorage.setItem("cartItems", JSON.stringify(payload));
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item._id !== payload,
                ),
            };
        },
        clearCart: (state) => {
            localStorage.setItem("cartItems", null);
            return {
                ...state,
                cartItems: []
            }
        },
        saveShippingAddress: (state, { payload }) => {
            localStorage.setItem("shippingAddress", JSON.stringify(payload));
            return {
                ...state,
                shippingAddress: payload,
            };
        },
        savePaymentMethod: (state, { payload }) => ({
            ...state,
            paymentMethod: payload,
        }),
    },
});

export const {
    cartAddItem,
    cartRemoveItem,
    saveShippingAddress,
    savePaymentMethod,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
