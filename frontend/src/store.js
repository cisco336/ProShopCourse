import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./reducers/productReducer";
import cartReducer from './reducers/cartReducer'

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
});
