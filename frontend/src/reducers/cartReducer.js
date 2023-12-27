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
                state.cartItems.push(action.payload);
            } else {
                state.cartItems = state.cartItems.map(item => item._id === action.payload._id ? action.payload : item);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        cartRemoveItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload;
        // },
    },
});

// Action creators are generated for each case reducer function
export const { cartAddItem, cartRemoveItem } = cartSlice.actions;

export default cartSlice.reducer;
