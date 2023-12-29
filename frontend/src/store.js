import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./reducers/productReducer";
import cartReducer from './reducers/cartReducer';
import { userApi, userSlice } from './reducers/userReducer';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(productApi.middleware),
});
