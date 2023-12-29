import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartAddItem: (state, action) => {
            let exist = state.cartItems.length > 0 && state.cartItems.find(item => item._id === action.payload._id) !== undefined;
            if (!exist) {
                return {
                    ...state,
                    cartItems: [...state.cartItems, {...action.payload}]
                }
            } else {
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(state.cartItems)
                );
                return {
                    ...state, 
                    cartItems: state.cartItems.map(item => item._id === action.payload._id ? action.payload : item)
                };
            }
        },
        cartRemoveItem: (state, action) => {
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            return {
                ...state,
                cartItems : state.cartItems.filter(item => item._id !== action.payload)
            };
        },
    },
});

export const { cartAddItem, cartRemoveItem } = cartSlice.actions;

export default cartSlice.reducer;
